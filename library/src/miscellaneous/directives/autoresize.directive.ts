import {AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
    selector: 'textarea[ngxAutoresize]'
})
export class NgxAutoResizeDirective implements AfterViewInit {

    @Input() @HostBinding('style.min-height')
    minHeight = '120px';

    private readonly element: HTMLElement;
    private clientWidth: number;

    constructor(private renderer: Renderer2,
                private elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
        this.clientWidth = this.element.clientWidth;
    }

    ngAfterViewInit() {
        this.adjust();
    }

    @HostListener('window:resize', ['$event.target'])
    onResize() {
        if (!this.element || this.element.clientWidth === this.clientWidth) {
            return;
        }
        this.clientWidth = this.element.clientWidth;
        this.adjust();
    }

    @HostListener('input', ['$event.target'])
    onInput() {
        this.adjust();
    }

    private adjust() {
        if (!this.element || this.element.style.height === this.element.scrollHeight + 'px') {
            return;
        }

        this.renderer.setStyle(this.element, 'overflow', 'hidden');
        this.renderer.setStyle(this.element, 'height', 'auto');
        this.renderer.setStyle(this.element, 'height', this.element.scrollHeight + 'px');
    }

}
