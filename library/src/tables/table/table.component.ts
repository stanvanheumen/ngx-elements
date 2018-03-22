import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren, EventEmitter,
    Input,
    OnDestroy, Output,
    QueryList
} from '@angular/core';
import {Pager, TableDataSource, TablePage, TableTrigger} from '../tables.interfaces';
import {delay, first, map, publish, refCount, switchMap, tap} from 'rxjs/operators';
import {NgxTableColumnComponent} from '../table-column/table-column.component';
import {NgxCardEvent} from '../../cards/card/card.component';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Component({
    selector: 'ngx-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class NgxTableComponent implements OnDestroy, AfterContentInit {

    // Card properties.
    @Input() rightButtonBar: NgxCardEvent[] = [];
    @Input() grouped = false;
    @Input() title: string | null;

    // Pager properties.
    @Input() pageSize = 25;
    @Input() pageNumber = 1;

    // Table properties.
    @Input() offset = '302px';
    @Input() identifier: string = null;
    @Input() dataSource: TableDataSource;
    @Input() ofPlaceholder = 'of';
    @Input() searchPlaceholder = 'Search';
    @Input() emptyPlaceholder = 'No records were found.';
    @Input() perPagePlaceholder = 'Items per page:';
    @Input() selectedButtonBar: NgxCardEvent[] = [];

    // Table events.
    @Output() onRowClicked = new EventEmitter<any>();
    @Output() onButtonClicked = new EventEmitter<NgxCardEvent>();

    // Table column elements.
    @ContentChildren(NgxTableColumnComponent) columns: QueryList<NgxTableColumnComponent>;

    // Observable data.
    columns$: BehaviorSubject<NgxTableColumnComponent[]>;
    trigger$: BehaviorSubject<TableTrigger>;
    data$: Observable<TablePage<any>>;
    page$: Observable<Pager>;

    // The query string.
    query = '';

    // The caches.
    scrollLeftCache = 0;
    selectedCache = {};
    selectedPagesCache = {};

    // Paging data.
    currentPage: number = -1;
    currentPageKeys: string[] = [];

    // Track by functions.
    trackByItemIdentifier = (index: number, item: any) => {
        return item[this.identifier];
    };

    trackByColumnIdentifier = (index: number) => {
        return index;
    };

    // Styling classes functions.
    getTableHeaderCellClasses = (column: NgxTableColumnComponent) => {
        const classes = ['ngx-table-header__item'];
        classes.push(column.classes);
        if (column.sort !== undefined && column.sort !== false) {
            classes.push('can-sort');
        }
        return classes.join(' ');
    };

    getTableHeaderCellWidth(width: string, totalColumns) {
        return width !== '0px' ? width : (100 / (totalColumns + (this.hasCheckbox ? 1 : 0))) + '%';
    }

    get canClick() {
        return this.onRowClicked.observers.length > 0;
    }

    get buttonBar() {
        let isActive = false;
        Object.keys(this.selectedCache).forEach(key => {
            if (this.selectedCache[key]) {
                isActive = true;
            }
        });
        return isActive
            ? this.selectedButtonBar
            : this.rightButtonBar;
    }

    get hasCheckbox() {
        return this.selectedButtonBar.length > 0;
    }

    private _subscriptions: Subscription[] = [];

    ngAfterContentInit() {
        // Watch the columns.
        this.watchColumns();

        // Setup the trigger.
        this.setupTrigger();

        // Setup the data.
        this.setupData();

        // Setup the pager.
        this.setupPager();
    }

    ngOnDestroy() {
        this._subscriptions.forEach(
            subscription => subscription.unsubscribe()
        );
    }

    onPageEvent(pager: Pager) {
        if (!pager) {
            return;
        }
        const currentValue = this.trigger$.getValue();
        const newTrigger: TableTrigger = {...currentValue, pager: pager};
        this.trigger$.next(newTrigger);
    }

    onSearch(query: string) {
        if (query === null) {
            query = '';
        }
        const currentValue = this.trigger$.getValue();
        const newTrigger: TableTrigger = {...currentValue, query: query};
        this.trigger$.next(newTrigger);
    }

    onScroll(event: Event) {
        // Check if the event and target exist.
        if (!event || !event.target) {
            return;
        }

        // Validate if the cache has changed.
        const scrollLeft = event.target['scrollLeft'];
        if (this.scrollLeftCache === scrollLeft) {
            return;
        }

        // Save the cache.
        this.scrollLeftCache = scrollLeft;
    }

    onColumnClick(column: NgxTableColumnComponent) {
        if (!column.sort) {
            return;
        }

        const currentValue = this.columns$.getValue();

        const newValue = currentValue.map(item => {
            item.sort = item === column
                ? (column.sort === true || column.sort === 'asc') ? 'desc' : 'asc'
                : false;

            return item;
        });

        this.columns$.next(newValue);
    }

    onSelectedRowChange() {
        this.recalculateSelectedPage(this.currentPage);
    }

    onSelectedPageChange(newValue: boolean) {
        const newKeys = {};
        this.currentPageKeys.forEach(key => newKeys[key] = newValue);
        this.selectedCache = {...this.selectedCache, ...newKeys};
    }

    onCardButtonClicked(event: NgxCardEvent) {
        if (this.selectedButtonBar.indexOf(event) > -1) {
            this.selectedCache = {};
            this.selectedPagesCache = {};
            return;
        }

        this.onButtonClicked.emit(event);
    }

    private recalculateSelectedPage(pageNumber: number) {
        let isSelected: boolean = true;
        this.currentPageKeys.forEach(key => {
            if (!this.selectedCache[key]) {
                isSelected = false;
            }
        });

        const newData = {[pageNumber]: isSelected};
        this.selectedPagesCache = {...this.selectedPagesCache, ...newData};
    }

    private watchColumns() {
        // Save the columns as an array.
        this.columns$ = new BehaviorSubject<NgxTableColumnComponent[]>(this.columns.toArray());

        // Subscribe to the changes.
        this._subscriptions.push(
            this.columns.changes.subscribe(data => this.columns$.next(data))
        );
    }

    private setupTrigger() {
        // Create an initial pager.
        const initialPager = {pageNumber: this.pageNumber, pageSize: this.pageSize};

        // Create the trigger.
        this.trigger$ = new BehaviorSubject<TableTrigger>({
            pager: initialPager,
            sort: {},
            queryFields: [],
            query: ''
        });
    }

    private setupData() {
        // Create the stream that will supply the data.
        this.data$ = combineLatest(this.trigger$, this.columns$).pipe(
            switchMap(([trigger, columns]) => this.makeRequest(trigger, columns)),
            publish(),
            refCount(),
            tap(data => this.recalculateColumns(data))
        );
    }

    private setupPager() {
        // Create a stream so that the pager knows which page we are on.
        this.page$ = this.data$.pipe(
            map(({pageSize, pageNumber, totalItems}) => {
                this.currentPage = pageNumber;
                this.recalculateSelectedPage(this.currentPage);
                return {
                    pageSize,
                    pageNumber,
                    totalItems
                };
            })
        );
    }

    private recalculateColumns(page: TablePage<any>) {
        // Get the current page keys.
        this.currentPageKeys = page.data.map(item => item[this.identifier]);

        // Update the columns width after a 10 millisecond delay.
        of(null).pipe(delay(10), first()).subscribe(() =>
            this.columns.forEach(column => column.setWidth())
        );
    }

    private makeRequest(trigger: TableTrigger, columns: NgxTableColumnComponent[]) {
        // Get the sort object and query fields.
        const sort = trigger.sort;
        const queryFields: string[] = [];

        // Loop through each column to get the sort and query fields.
        columns.forEach(column => {
            if (column.sort) {
                sort[column.property] = column.sort === true ? 'asc' : column.sort;
            }
            if (column.search) {
                queryFields.push(column.property);
            }
        });

        // Request the dataSource for an observable page.
        return this.dataSource.onEvent({pager: trigger.pager, queryFields, sort, query: trigger.query});
    }

}
