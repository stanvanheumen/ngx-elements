import {Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {Subscription} from 'rxjs/Subscription';
import {delay, tap} from 'rxjs/operators';

@Directive({
    selector: '[ngxOutsideClick]'
})
export class NgxOutsideClickDirective implements OnInit, OnDestroy {

    /**
     * The emitter that emits when the click was outside the host.
     */
    @Output() ngxOutsideClick = new EventEmitter<object>();

    /**
     * If the directive is listening.
     */
    private listening = false;

    /**
     * The subscription that handles the click observable.
     */
    private clickSubscription: Subscription;

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        this.clickSubscription = fromEvent(document, 'click').pipe(
            delay(1),
            tap(() => this.listening = true)
        ).subscribe((event: MouseEvent) => this.onGlobalClick(event));
    }

    ngOnDestroy() {
        if (this.clickSubscription) {
            this.clickSubscription.unsubscribe();
        }
    }

    private onGlobalClick(event: MouseEvent) {
        if (event instanceof MouseEvent && this.listening) {
            this.ngxOutsideClick.emit({
                target: (event.target || null),
                value: !this.isDescendant(this.element.nativeElement, event.target)
            });
        }
    }

    private isDescendant(parent, child) {
        let node = child;

        while (node !== null) {
            if (node === parent) {
                return true;
            }

            node = node.parentNode;
        }

        return false;
    }

}
