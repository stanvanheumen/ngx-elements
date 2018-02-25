import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMiscellaneousModule} from '../miscellaneous/miscellaneous.module';

import {NgxButtonComponent} from './button/button.component';
import {NgxGroupComponent} from './group/group.component';
import {NgxFormControlComponent} from './form-control/form-control.component';
import {NgxCheckboxComponent} from './checkbox/checkbox.component';
import {NgxRadioComponent} from './radio/radio.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMiscellaneousModule],
    declarations: [
        NgxButtonComponent,
        NgxGroupComponent,
        NgxFormControlComponent,
        NgxCheckboxComponent,
        NgxRadioComponent
    ],
    exports: [
        NgxButtonComponent,
        NgxGroupComponent,
        NgxFormControlComponent,
        NgxCheckboxComponent,
        NgxRadioComponent
    ]
})
export class NgxFormsModule {
}
