import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'ngx-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
    preserveWhitespaces: false,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxRadioComponent),
        multi: true
    }]
})
export class NgxRadioComponent implements ControlValueAccessor {

    /**
     * The two way binding for the checkbox.
     */
    _checked = false;

    @Input()
    get checked() {
        return this._checked;
    }

    @Output() checkedChange = new EventEmitter<boolean>();

    set checked(value: boolean) {
        this._checked = value;
        this.checkedChange.emit(this._checked);
    }

    /**
     * The value of the radio.
     */
    @Input() value: string;

    /**
     * If the radio should have single bottom margin.
     */
    @Input() single = false;

    /**
     * If the radio should have grouped bottom margin.
     */
    @Input() grouped = false;

    /**
     * If the radio is disabled.
     */
    @Input() disabled: boolean;

    /**
     * The callback that will be executed when the checkbox is touched.
     */
    onTouchedCallback: () => void = () => {};

    /**
     * The callback that will be executed when the value changes.
     */
    onChangeCallback: (_: boolean) => void = () => {};

    writeValue(value: boolean) {
        if (this.checked !== value) {
            this.checked = value;
        }
    }

    registerOnChange(method: (_: boolean) => void) {
        this.onChangeCallback = method;
    }

    registerOnTouched(method: () => void) {
        this.onTouchedCallback = method;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

}
