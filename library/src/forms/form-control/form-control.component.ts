import {Component, Input} from '@angular/core';

@Component({
    selector: 'ngx-form-control',
    templateUrl: './form-control.component.html',
    styleUrls: ['./form-control.component.scss'],
    preserveWhitespaces: false
})
export class NgxFormControlComponent {

    /**
     * The icon of the form control.
     */
    @Input() icon: string = null;

    /**
     * The label for the form-control.
     */
    @Input() label: string = null;

    /**
     * The error that should be displayed if the model is invalid.
     */
    @Input() error: string = null;

    /**
     * If the icon should be reversed.
     */
    @Input() reversed = false;

    /**
     * If the form control is required.
     */
    @Input() required = false;

    /**
     * If the form-control should have bottom margin.
     */
    @Input() grouped = true;

    /**
     * If the form control is valid.
     */
    @Input() valid = true;

}
