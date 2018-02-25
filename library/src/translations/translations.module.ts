import {NgModule, Optional, SkipSelf} from '@angular/core';
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

    constructor(@Optional() @SkipSelf() parentModule: NgxTranslationsModule) {
        if (parentModule) {
            throw new Error('NgxTranslationsModule is already loaded; Import it in the AppModule only.');
        }
    }

    static forRoot(config: TranslateConfig) {
        return {
            ngModule: NgxTranslationsModule,
            providers: [
                {provide: TranslateConfig, useValue: config}
            ]
        };
    }

}