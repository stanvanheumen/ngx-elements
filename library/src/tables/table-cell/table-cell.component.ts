import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'ngx-table-cell',
    templateUrl: './table-cell.component.html',
    styleUrls: ['./table-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class NgxTableCellComponent {
}
