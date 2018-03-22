import {ChangeDetectionStrategy, Component, Host, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import {trigger, animate, style, transition, state} from '@angular/animations';
import {NgxDashboardComponent} from '../dashboard/dashboard.component';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {StorageService} from '@stanvanheumen/ngx-storage';
import {NavigationGroup} from '../dashboard.interfaces';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {first, map} from 'rxjs/operators';

@Component({
    selector: 'ngx-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    animations: [
        trigger('groupState', [
            state('opened', style({height: '*'})),
            state('closed', style({height: '78px'})),
            transition('opened <=> closed', animate('300ms cubic-bezier(0, 0, 0.2, 1)'))
        ])
    ]
})
export class NgxNavigationComponent implements OnInit, OnDestroy {

    // Cookie.
    readonly COOKIE = '__NGX_NAVIGATION__';

    // Inputs.
    @Input() items: Observable<NavigationGroup[]>;
    @Input() formatter: (title: string) => string;
    @Input() background = '#383872';

    // Navigation visibility.
    visible: BehaviorSubject<boolean>;

    // Data.
    data$ = new BehaviorSubject<NavigationGroup[]>([]);

    get navigationBackgroundColor(): SafeStyle {
        return this._sanitizer.bypassSecurityTrustStyle(this.background);
    }

    // Subscription.
    private _subscription: Subscription;

    constructor(private _storage: StorageService,
                private _sanitizer: DomSanitizer,
                @Optional() @Host() private _dashboard: NgxDashboardComponent) {
    }

    ngOnInit() {
        // Grab the visibility subject from the parent.
        if (this._dashboard) {
            this.visible = this._dashboard.navigationVisible$;
        }

        // Get the navigation.
        this.retrieveNavigation();
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    get visible$() {
        return this.visible.asObservable();
    }

    onGroupClicked(group: object) {
        // Toggle state.
        group['state'] = group['state'] === 'opened' ? 'closed' : 'opened';

        // Save the state in the local storage.
        this._storage.set(this.COOKIE, this.data$.getValue());
    }

    private retrieveNavigation() {
        // Get the navigation from the storage (only one time).
        const cache$ = this._storage.get<NavigationGroup[]>(this.COOKIE).pipe(first());

        const observable$ = combineLatest(this.items, cache$).pipe(map(([list, cache]) => {
            return list.map((item, index) => {
                item.description = item.items.map(item =>
                    this.formatter ? this.formatter(item.title) : item.title
                ).join(', ');
                const cookieItem = cache && cache[index];
                const cookieState = cookieItem && cookieItem['state'] ? cookieItem['state'] : null;
                if (!cookieState || cookieItem['title'] !== item['title']) {
                    return item;
                }

                item['state'] = cookieState;

                return item;
            });
        }));

        // Create a subscription.
        this._subscription = observable$.subscribe(data => this.data$.next(data));
    }

}
