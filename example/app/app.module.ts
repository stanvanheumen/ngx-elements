import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxFormsModule} from '../../library/src/forms/forms.module';
import {NgxCardsModule} from '../../library/src/cards/cards.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgxFormsModule,
        NgxCardsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
