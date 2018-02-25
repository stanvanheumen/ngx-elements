import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {trigger, animate, style, transition, state} from '@angular/animations';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {NgxCardEvent} from '../card/card.component';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
    selector: 'ngx-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    preserveWhitespaces: false,
    animations: [
        trigger('modal', [
            state('void', style({opacity: 0, transform: 'scale(0.94)'})),
            state('inactive', style({opacity: 0, transform: 'scale(0.94)'})),
            state('active', style({opacity: 1, transform: 'scale(1)'})),
            transition('inactive <=> active', animate(`300ms cubic-bezier(0, 0, 0.2, 1)`)),
            transition('void => active', [
                style({opacity: 0, transform: 'scale(0.94)'}),
                animate(`300ms cubic-bezier(0, 0, 0.2, 1)`)
            ]),
            transition('active => inactive', [
                style({opacity: 1, transform: 'scale(1)'}),
                animate(`300ms cubic-bezier(0, 0, 0.2, 1)`)
            ])
        ]),
        trigger('backdrop', [
            state('inactive', style({opacity: 0})),
            state('active', style({opacity: 1})),

            transition('inactive <=> active', animate(`250ms cubic-bezier(0, 0, 0.2, 1)`)),
            transition('void <=> active', [style({opacity: 0}), animate(250)])
        ])
    ]
})

export class NgxModalComponent implements OnInit {

    // Inputs.
    @Input() out = true;
    @Input() overflow = true;
    @Input() boilerplate = true;
    @Input() back: string;
    @Input() title: string;
    @Input() modifier: string;
    @Input() wait: Observable<any>;
    @Input() leftButtonBar: NgxCardEvent[] = [];
    @Input() rightButtonBar: NgxCardEvent[] = [];

    // Outputs.
    @Output() onButtonClicked = new EventEmitter<NgxCardEvent>();

    modal$ = new BehaviorSubject('inactive');
    backdrop$ = new BehaviorSubject('inactive');

    constructor(private router: Router,
                private location: Location) {
    }

    ngOnInit() {
        if (!this.wait) {
            return this.setState('active');
        }

        this.wait.pipe(first()).subscribe(() => this.setState('active'));
    }

    onClickOutside(event: Object) {
        if (event
            && event['value'] === true
            && typeof event['target'].className === 'string'
            && event['target'].className.includes('ngx-modal-backdrop')
            && this.out) {
            this.quit();
        }
    }

    @HostListener('window:keyup', ['$event'])
    onKeyEvent(event: KeyboardEvent) {
        if (event.keyCode === 27 && this.out) {
            this.quit();
        }
    }

    onClick(button: NgxCardEvent) {
        if (button.id === 'goBackModal') {
            this.quit();
            return;
        }

        this.onButtonClicked.emit(button);
    }

    onAnimationCompleted($event) {
        if ($event.fromState === 'void' || $event.toState !== 'inactive') {
            return;
        }

        if (this.back) {
            return this.router.navigate([this.back]);
        }

        this.location.back();
    }

    quit() {
        this.setState('inactive');
    }

    private setState(value: string) {
        this.modal$.next(value);
        this.backdrop$.next(value);
    }

}
