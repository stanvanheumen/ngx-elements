import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxLoadingComponent} from './loading/loading.component';

import {NgxOutsideClickDirective} from './outside-click.directive';
import {NgxAutoResizeDirective} from './autoresize.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        NgxLoadingComponent,
        NgxOutsideClickDirective,
        NgxAutoResizeDirective
    ],
    exports: [
        NgxLoadingComponent,
        NgxOutsideClickDirective,
        NgxAutoResizeDirective
    ]
})
export class NgxMiscellaneousModule {
}