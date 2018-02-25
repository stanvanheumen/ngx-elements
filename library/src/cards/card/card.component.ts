import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface NgxCardEvent {

    /**
     * The identifier of the event.
     */
    id: string;

    /**
     * The icon of the event.
     */
    icon: string;

    /**
     * Extra data of the event.
     */
    data?: any;

}

@Component({
    selector: 'ngx-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    preserveWhitespaces: false
})
export class NgxCardComponent {

    /**
     * The title of the card.
     */
    @Input() title: string = null;

    /**
     * The direction of the text.
     */
    @Input() direction: 'left' | 'right' | 'center' = 'left';

    /**
     * The amount of padding that the card has.
     */
    @Input() padding = '20px';

    /**
     * The buttons on the left of the header.
     */
    @Input() leftButtonBar: NgxCardEvent[] = [];

    /**
     * The buttons on the right of the header.
     */
    @Input() rightButtonBar: NgxCardEvent[] = [];

    /**
     * The grouped state of the card.
     */
    @Input() grouped = true;

    /**
     * The max height of the card.
     */
    @Input() maxHeight = 'auto';

    /**
     * The event containing the button that was pressed.
     */
    @Output() onButtonClicked = new EventEmitter<NgxCardEvent>();

}
