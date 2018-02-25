import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxMiscellaneousModule} from '../miscellaneous/miscellaneous.module';

import {TranslateService} from './translate.service';
import {NgxTranslatePipe} from './translate.pipe';
import {TranslateConfig} from './translate.config';

@NgModule({
    imports: [CommonModule, NgxMiscellaneousModule],
    providers: [TranslateService],
    declarations: [NgxTranslatePipe],
    exports: [NgxTranslatePipe]
})
export class NgxTranslationsModule {

    static forRoot(config: TranslateConfig) {
        return {
            ngModule: NgxTranslationsModule,
            providers: [
                {provide: TranslateConfig, useValue: config}
            ]
        };
    }

}