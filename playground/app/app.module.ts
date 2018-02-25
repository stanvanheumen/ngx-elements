import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxFormsModule} from '../../library/src/forms/forms.module';
import {NgxCardsModule} from '../../library/src/cards/cards.module';
import {NgxMiscellaneousModule} from '../../library/src/miscellaneous/miscellaneous.module';
import {NgxTranslationsModule} from '../../library/src/translations/translations.module';
import {NgxNotificationsModule} from '../../library/src/notifications/notifications.module';
import {environment} from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxFormsModule,
        NgxCardsModule,
        NgxMiscellaneousModule,
        NgxTranslationsModule.forRoot({
            production: environment.production, dictionary: [
                {
                    data: {
                        'This does work': 'Dit werkt goed',
                        'Action did fail': 'Actie is mislukt',
                        'Action was successful': 'Actie was succesvol',
                        'Warning': 'Waarschuwing',
                        'Information': 'Informatie'
                    },
                    languages: ['nl-NL', 'nl'],
                    name: 'Dutch'
                }
            ]
        }),
        NgxNotificationsModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
