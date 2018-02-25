import {NotificationsService} from '../../library/src/notifications/notifications.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Notification} from '../../library/src/notifications/notifications-list/notifications-list.component';

@Component({
    selector: 'app-root',
    templateUrl: '/app.component.html'
})
export class AppComponent implements OnInit {

    notifications$: Observable<Notification[]>;
    form: FormGroup;

    constructor(private notifications: NotificationsService) {
    }

    ngOnInit() {
        // Get the notifications observable.
        this.notifications$ = this.notifications.items;

        const required = Validators.required;
        const email = Validators.email;

        this.form = new FormGroup({
            email: new FormControl('', [required, email]),
            password: new FormControl('', required)
        });
    }

    onSubmit() {
        this.notifications.success('This does work');
    }

}
