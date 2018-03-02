import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxFormsModule} from '../../library/src/forms/forms.module';
import {NgxCardsModule} from '../../library/src/cards/cards.module';
import {NgxMiscellaneousModule} from '../../library/src/miscellaneous/miscellaneous.module';

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
        NgxMiscellaneousModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
