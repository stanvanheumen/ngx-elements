import {Component, Input} from '@angular/core';

@Component({
    selector: 'ngx-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
    preserveWhitespaces: false
})
export class NgxGroupComponent {

    /**
     * The alignment of the items in the group.
     */
    @Input() align: 'left' | 'right' = 'left';

    /**
     * The direction of the items in the group.
     */
    @Input() direction: 'row' | 'column' = 'row';

    /**
     * If the items in the group should take full width.
     */
    @Input() full = false;

    /**
     * If the group should have bottom margin.
     */
    @Input() grouped = false;

    /**
     * The classes that the group has based on its inputs.
     */
    get groupClasses() {
        return {
            ['ngx-group--' + this.direction]: !!this.direction,
            ['ngx-group--' + this.align]: !!this.align,
            'ngx-group--full': this.full,
            'ngx-group--grouped': this.grouped
        };
    }

}
