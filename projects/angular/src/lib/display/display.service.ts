import { Inject, Injectable, InjectionToken } from '@angular/core';
import merge from 'lodash-es/merge';
import { Subject } from 'rxjs';
import debounce from 'lodash-es/debounce';
import { getWindow } from 'ssr-window';

const window = getWindow();

const DEFAULT_OPTIONS = {
    breakpoints: {
        sm: 600,
        md: 1024,
        lg: 1440,
        xl: 1920
    },
    debounceWait: 70
};

@Injectable()
export class DisplayService {

    constructor(
        @Inject(DISPLAY_OPTIONS) public options: DisplayOptions
    ) {
        this.options = merge(DEFAULT_OPTIONS, this.options);
        this.onResize = debounce(() => {
            this.windowWidth = window.outerWidth;
            this.resized.next();
        }, this.options.debounceWait);
        window.addEventListener('resize', this.onResize, { passive: true });
    }

    #windowWidth: number;

    get windowWidth() {
        return this.#windowWidth || window.outerWidth;
    }

    set windowWidth(width: number) {
        this.#windowWidth = width;
    }

    private onResize;
    resized = new Subject();

    isAbove(breakpoint: string): boolean {
        return this.windowWidth >= this.options.breakpoints[breakpoint];
    }

    isBelow(breakpoint: string): boolean {
        return this.windowWidth - 0.2 < this.options.breakpoints[breakpoint];
    }

    get above() {
        const width = this.windowWidth;
        let above = '';
        for (const breakpointKey in this.options.breakpoints) {
            const breakpointValue = this.options.breakpoints[breakpointKey];
            if (width >= breakpointValue) {
                if (above) {
                    if (breakpointValue > this.options.breakpoints[above]) {
                        above = breakpointKey;
                    }
                } else {
                    above = breakpointKey;
                }
            }
        }
        return above;
    }

    get below() {
        const width = this.windowWidth;
        let below = '';
        for (const breakpointKey in this.options.breakpoints) {
            const breakpointValue = this.options.breakpoints[breakpointKey];
            if (width - 0.2 < breakpointValue) {
                if (below) {
                    if (breakpointValue < this.options.breakpoints[below]) {
                        below = breakpointKey;
                    }
                } else {
                    below = breakpointKey;
                }
            }
        }
        return below;
    }
}

export interface DisplayOptions {
    breakpoints?: { key: number },
    debounceWait?: number;
}

export const DISPLAY_OPTIONS = new InjectionToken<DisplayOptions>('DisplayOptions');