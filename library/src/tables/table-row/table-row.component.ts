import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
    selector: 'ngx-table-row',
    templateUrl: './table-row.component.html',
    styleUrls: ['./table-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class NgxTableRowComponent {

    @HostBinding('class.clickable') @Input() clickable = false;
    @HostBinding('class.fake') @Input() fake = false;

    @Input() colspan: number;

}
