import {
    ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Input, OnInit, TemplateRef
} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
    selector: 'ngx-table-column',
    templateUrl: './table-column.component.html',
    styleUrls: ['./table-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class NgxTableColumnComponent implements OnInit {

    // String inputs.
    @Input() name: string | null;
    @Input() property: string | null;

    // Boolean inputs.
    @Input() search = false;
    @Input() sort: boolean | 'asc' | 'desc' = false;

    // Template inputs.
    @Input() templateRef: TemplateRef<any>;

    // The classes.
    @HostBinding('class') @Input('class') classes;

    // The width of the actual visible cell.
    width$ = new BehaviorSubject<string>('0px');

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        if (this.search !== undefined && !this.property) {
            throw new Error('Search can only be \'true\' when the \'property\' has been set.');
        }

        if (this.sort !== undefined && !this.property) {
            throw new Error('Sort can only be \'true\' when the \'property\' has been set.');
        }
    }

    @HostListener('window:resize', ['$event'])
    setWidth() {
        const width = this.element && this.element.nativeElement ? this.element.nativeElement.offsetWidth : 0;

        this.width$.next(
            width + 'px'
        );
    }

}
