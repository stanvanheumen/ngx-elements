import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgxCardsModule} from '../cards/cards.module';
import {NgxMiscellaneousModule} from '../miscellaneous/miscellaneous.module';

import {NgxPagerComponent} from './pager/pager.component';
import {NgxTableComponent} from './table/table.component';
import {NgxTableRowComponent} from './table-row/table-row.component';
import {NgxTableCellComponent} from './table-cell/table-cell.component';
import {NgxTableColumnComponent} from './table-column/table-column.component';

@NgModule({
    imports: [CommonModule, FormsModule, NgxCardsModule, NgxMiscellaneousModule],
    declarations: [
        NgxPagerComponent,
        NgxTableComponent,
        NgxTableRowComponent,
        NgxTableCellComponent,
        NgxTableColumnComponent
    ],
    exports: [NgxTableComponent, NgxTableColumnComponent]
})
export class NgxTablesModule {
}