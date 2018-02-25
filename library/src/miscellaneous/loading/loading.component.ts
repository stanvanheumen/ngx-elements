import {Component, Input} from '@angular/core';

@Component({
    selector: 'ngx-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    preserveWhitespaces: false
})
export class NgxLoadingComponent {

    /**
     * The width of the loader.
     */
    @Input() width = '80px';

    /**
     * The height of the loader.
     */
    @Input() height = '80px';

    /**
     * The spacing of the loader.
     */
    @Input() spacing = '20px';

    /**
     * The color of the loader.
     */
    @Input() color = '#1977d3';

}
