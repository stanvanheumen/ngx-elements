import {TranslateService} from './translate.service';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'translate',
    pure: false
})
export class NgxTranslatePipe implements PipeTransform {

    constructor(private translate: TranslateService) {
    }

    transform(value: string, args: any[]) {
        if (!value) {
            console.warn('translate.pipe.ts :: The value was not properly received', value);
            return null;
        }

        return this.translate.instant(args ? {key: value, words: args} : value);
    }

}
