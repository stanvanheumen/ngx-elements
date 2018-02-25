import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxTranslationsModule} from '../translations/translations.module';

import {NgxNotificationItemComponent} from './notification/notification-item.component';
import {NgxNotificationsListComponent} from './notifications-list/notifications-list.component';
import {NotificationsService} from './notifications.service';

@NgModule({
    imports: [CommonModule, NgxTranslationsModule],
    declarations: [
        NgxNotificationItemComponent,
        NgxNotificationsListComponent
    ],
    exports: [
        NgxNotificationItemComponent,
        NgxNotificationsListComponent
    ]
})
export class NgxNotificationsModule {

    constructor(@Optional() @SkipSelf() parentModule: NgxNotificationsModule) {
        if (parentModule) {
            throw new Error('NgxNotificationsModule is already loaded; Import it in the AppModule only.');
        }
    }

    static forRoot() {
        return {
            ngModule: NgxNotificationsModule,
            providers: [NotificationsService]
        };
    }

}