import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxMiscellaneousModule} from '../miscellaneous/miscellaneous.module';

import {NgxCardComponent} from './card/card.component';
import {NgxModalComponent} from './modal/modal.component';

@NgModule({
    imports: [CommonModule, NgxMiscellaneousModule],
    declarations: [
        NgxCardComponent,
        NgxModalComponent
    ],
    exports: [
        NgxCardComponent,
        NgxModalComponent
    ]
})
export class NgxCardsModule {
}