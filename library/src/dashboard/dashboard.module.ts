import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxStorageModule} from '@stanvanheumen/ngx-storage';

import {NgxDashboardComponent} from './dashboard/dashboard.component';
import {NgxNavigationComponent} from './navigation/navigation.component';

@NgModule({
    imports: [CommonModule, RouterModule, NgxStorageModule],
    declarations: [NgxDashboardComponent, NgxNavigationComponent],
    exports: [NgxDashboardComponent, NgxNavigationComponent]
})
export class NgxDashboardModule {
}