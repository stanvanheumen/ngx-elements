import {Component, Input} from '@angular/core';

@Component({
    selector: 'ngx-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    preserveWhitespaces: false
})
export class NgxButtonComponent {

    /**
     * The type of the button.
     */
    @Input() public type: 'button' | 'submit' | 'reset' = 'button';

    /**
     * The color of the button.
     */
    @Input() public color: 'blue' | 'green' | 'red' | 'yellow' | 'black' = null;

    /**
     * The icon of the button.
     */
    @Input() public icon: string = null;

    /**
     * The disabled state of the button.
     */
    @Input() public disabled = false;

    /**
     * The loading state of the button.
     */
    @Input() public loading = false;

    /**
     * The reversed state of the button.
     */
    @Input() public reversed = false;

    /**
     * The grouped state of the button.
     */
    @Input() public grouped = false;

    /**
     * The classes that the button has based on its inputs.
     */
    get buttonClass() {
        return {
            ['ngx-button--' + this.color]: !!this.color,
            'ngx-button--loading': this.loading,
            'ngx-button--reversed': this.reversed,
            'ngx-button--grouped': this.grouped
        };
    }

}
