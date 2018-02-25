import {trigger, animate, style, transition, query, stagger, keyframes} from '@angular/animations';
import {TranslateOptions} from '../../translations/translate.service';
import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'ngx-notifications-list',
    templateUrl: './notifications-list.component.html',
    styleUrls: ['./notifications-list.component.scss'],
    animations: [trigger('listAnimation', [
        transition('* => *', [
            query(':enter', style({opacity: 0}), {optional: true}),

            query(':enter', stagger('500ms', [
                animate('500ms cubic-bezier(0, 0, .2, 1)', keyframes([
                    style({opacity: 0, transform: 'translateX(50%)', offset: 0}),
                    style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
                ]))]), {optional: true}),

            query(':leave', stagger('500ms', [
                animate('500ms cubic-bezier(0, 0, .2, 1)', keyframes([
                    style({height: '*', opacity: 1, transform: 'translateX(0)', offset: 0}),
                    style({height: '*', opacity: 0, transform: 'translateX(-25%)', offset: 0.9}),
                    style({height: 0, opacity: 0, transform: 'translateX(-25%)', offset: 1.0})
                ]))]), {optional: true})
        ])
    ])]
})
export class NgxNotificationsListComponent {

    // Data.
    @Input() items: Observable<Notification[]>;

    // Track by function.
    trackById = function (index: string, item: Notification) {
        return item.id;
    };

}

export interface Notification {

    /**
     * The identifier of the notification.
     */
    id: string;

    /**
     * The title of the notification.
     */
    title: string | TranslateOptions;

    /**
     * The text of the notification.
     */
    text: string | TranslateOptions;

    /**
     * The type of the notification.
     */
    type: string;

    /**
     * The icon of the notification.
     */
    icon: string;

}

export interface NotificationOptions {

    /**
     * The text of the notification.
     */
    text: string | TranslateOptions;

    /**
     * The title of the notification.
     */
    title?: string | TranslateOptions;

    /**
     * The type of notification.
     */
    type?: 'success' | 'error' | 'warning' | 'info';

    /**
     * The timeout before the notification should disappear.
     */
    timeout?: number;

    /**
     * The icon of the notification.
     */
    icon?: string;

}
