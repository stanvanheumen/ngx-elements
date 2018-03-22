import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgxDashboardEvent} from '../dashboard.interfaces';
import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class NgxDashboardComponent {

    /**
     * The amount of padding in the main area.
     */
    @Input() padding = '20px';

    /**
     * The max width of the main area.
     */
    @Input() maxWidth = 'auto';

    /**
     * The background of the header.
     */
    @Input() background = '#5851d6';

    /**
     * The buttons that show up in the header of the dashboard.
     */
    @Input() buttons: NgxDashboardEvent[] = [];

    /**
     * The emitter that emits when the user clicks a button.
     */
    @Output() onButtonClicked = new EventEmitter<NgxDashboardEvent>();

    /**
     * The visibility of the navigation menu.
     */
    navigationVisible$ = new BehaviorSubject(false);

    get headerBackgroundColor() {
        return this._sanitizer.bypassSecurityTrustStyle(this.background);
    }

    constructor(private _sanitizer: DomSanitizer) {
    }

}
