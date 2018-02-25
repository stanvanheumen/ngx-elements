import {ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-notification-item',
    templateUrl: './notification-item.component.html',
    styleUrls: ['./notification-item.component.scss']
})
export class NgxNotificationItemComponent implements OnInit, OnDestroy {

    // Inputs.
    @Input() type: string;
    @Input() title: string;
    @Input() text: string;
    @Input() icon: string;
    @Input() timeout = 4000;

    // Progress loader.
    progress = 0;

    // Calculating variables for the progress.
    private steps: number;
    private speed: number;
    private startTime: number;
    private difference: number;
    private timer: number;
    private count = 0;

    constructor(private zone: NgZone,
                private changeDetection: ChangeDetectorRef) {
    }

    ngOnInit() {
        if (this.timeout !== 0) {
            this.startTimeout();
        }
    }

    ngOnDestroy(): void {
        clearTimeout(this.timer);
    }

    get progressWidth() {
        return Math.min(this.progress, 100) + '%';
    }

    private startTimeout() {
        // Calculate the steps of the timeout.
        this.steps = this.timeout / 10;

        // Calculate the speed of the timeout.
        this.speed = this.timeout / this.steps;

        // Get the start time.
        this.startTime = new Date().getTime();

        // Set a new timer outside of Angular.
        this.zone.runOutsideAngular(() => this.timer = setTimeout(this.instance, this.speed));
    }

    private instance = () => {
        // Calculate the difference.
        this.difference = (new Date().getTime() - this.startTime) - (this.count * this.speed);

        // Add up the count.
        this.count++;

        // Add the steps to the progress.
        this.progress += 100 / this.steps;

        // Set a new timer.
        this.timer = setTimeout(this.instance, (this.speed - this.difference));

        // Run a new change detection cycle.
        this.zone.run(() => this.changeDetection.detectChanges());
    }

}
