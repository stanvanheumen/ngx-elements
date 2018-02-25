import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'ngx-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    preserveWhitespaces: false,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxCheckboxComponent),
        multi: true
    }]
})
export class NgxCheckboxComponent implements ControlValueAccessor {

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
     * If the checkbox should have single bottom margin.
     */
    @Input() single = false;

    /**
     * If the checkbox should have bottom margin.
     */
    @Input() grouped = false;

    /**
     * If the checkbox is disabled.
     */
    @Input() disabled = false;


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
