import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxLoadingComponent} from './loading/loading.component';

import {NgxOutsideClickDirective} from './directives/outside-click.directive';
import {NgxAutoResizeDirective} from './directives/autoresize.directive';

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