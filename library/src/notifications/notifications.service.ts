import {Notification, NotificationOptions} from './notifications-list/notifications-list.component';
import {TranslateOptions} from '../translations/translate.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {delay, first} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {of} from 'rxjs/observable/of';

@Injectable()
export class NotificationsService {

    // Data.
    private list: Notification[] = [];
    private list$ = new BehaviorSubject(this.list);

    get items() {
        return this.list$;
    }

    success(text: string | TranslateOptions, timeout = 4000) {
        this.create({type: 'success', text, timeout});
    }

    error(text: string | TranslateOptions, timeout = 4000) {
        this.create({type: 'error', text, timeout});
    }

    warn(text: string | TranslateOptions, timeout = 4000) {
        this.create({type: 'warning', text, timeout});
    }

    info(text: string | TranslateOptions, timeout = 4000) {
        this.create({type: 'info', text, timeout});
    }

    create(options: NotificationOptions = {text: ''}) {
        const id = this.getId();
        const type = options.type || 'info';
        const timeout = options.timeout || 4000;
        const item = {
            id,
            type,
            timeout,
            text: options.text,
            icon: options.icon ? options.icon : this.getIcon(options),
            title: options.title ? options.title : this.retrieveDefaultTitle(options)
        };

        // Add the new item.
        this.add(item);

        // Create a delayed observable.
        const observable$ = of(item).pipe(delay(timeout), first());

        // Subscribe to remove the item.
        observable$.subscribe(notificationItem => this.remove(notificationItem));
    }

    private add(item: Notification) {
        this.list.push(item);
        this.list$.next(this.list);
    }

    private remove(item: Notification) {
        this.list.forEach((notification, index) => {
            if (notification.id === item.id) {
                this.list.splice(index, 1);
            }
        });

        this.list$.next(this.list);
    }

    private getId() {
        return Math.random().toString(36).substr(2, 10);
    }

    private retrieveDefaultTitle(options: NotificationOptions) {
        switch (options.type) {
            case 'success':
                return 'Action was successful';
            case 'error':
                return 'Action did fail';
            case 'warning':
                return 'Warning';
            case 'info':
            default:
                return 'Information';
        }
    }

    private getIcon(options: NotificationOptions) {
        if (options.icon) {
            return options.icon;
        }

        switch (options.type) {
            case 'error':
                return 'error_outline';
            case 'warning':
                return 'error_outline';
            case 'info':
                return 'info_outline';
            case 'success':
                return 'check_circle';
            default:
                return 'check_circle';
        }
    }

}
