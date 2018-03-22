import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Pager} from '../tables.interfaces';

@Component({
    selector: 'ngx-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class NgxPagerComponent {

    // Input and outputs.
    @Input() pageSizes = [10, 25, 50, 100];
    @Output() dataChange = new EventEmitter<Pager>();

    // Placeholders.
    @Input() ofPlaceholder = 'of';
    @Input() perPagePlaceholder = 'Items per page:';

    // Paging data.
    private _data: Pager;

    @Input() get data() {
        return this._data;
    }

    set data(value: Pager) {
        if (this._data && this._data.pageSize === value.pageSize
            && this._data.pageNumber === value.pageNumber
            && this._data.totalItems === value.totalItems) {
            return;
        }

        if (!this._data
            || !value
            || (this._data.pageNumber === value.pageNumber && this._data.pageSize === value.pageSize)) {
            this._data = value;
            return;
        }

        this._data = value;

        this.dataChange.emit({pageSize: this._data.pageSize, pageNumber: this._data.pageNumber});
    }

    get pageNumber() {
        return this.data ? this.data.pageNumber : 1;
    }

    get totalPages() {
        return this.data ? Math.ceil(this.data.totalItems / this.data.pageSize) : 1;
    }

    get pageStart() {
        if (this.totalItems === 0) {
            return 0;
        }
        return this.data ? (this.data.pageNumber * this.data.pageSize) - this.data.pageSize + 1 : 1;
    }

    get pageEnd() {
        const amount = this.data ? this.data.pageNumber * this.data.pageSize : 1;
        return amount > this.totalItems ? this.totalItems : amount;
    }

    get pageSize() {
        return this.data ? this.data.pageSize : 50;
    }

    set pageSize(value: number) {
        this.data.pageSize = value;
    }

    get totalItems() {
        return this.data ? this.data.totalItems : 1;
    }

    onPageSizeChange(newSize: string) {
        const pageSize = parseInt(newSize, 10);
        this.data = {...this.data, pageSize, pageNumber: 1};
    }

    onPageChange(newPageNumber: number) {
        const pageNumber = Math.min(
            this.totalPages,
            Math.max(1, newPageNumber)
        );

        this.data = {...this.data, pageNumber};
    }

}
