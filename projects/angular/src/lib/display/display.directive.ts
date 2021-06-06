import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DisplayService } from './display.service';
import { getWindow } from 'ssr-window';

const window = getWindow();

@Directive({
    selector: '[show],[hide]'
})
export class DisplayDirective {

    @Input() show: string;
    @Input() hide: string;

    display: boolean;
    subscriptions: Subscription[] = [];

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private displayService: DisplayService
    ) {
        this.subscriptions.push(
            this.displayService.resized.subscribe(() => this.resize())
        )
    }

    resize() {
        const width = window.outerWidth;

        let display = true;

        if (this.show) {
            display = width >= this.displayService.options.breakpoints[this.show];
        }

        if (this.hide) {
            display = width - 0.2 < this.displayService.options.breakpoints[this.hide];
        }

        if (display && !this.display) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }

        if (!display && this.display) {
            this.viewContainerRef.clear();
        }

        this.display = display;
    }

    ngOnChanges(): void {
        this.resize();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
