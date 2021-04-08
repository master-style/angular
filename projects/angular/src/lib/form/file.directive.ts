import { Directive, ElementRef, forwardRef, Renderer2 } from '@angular/core';

import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

export const FILE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileControlValueAccessor),
    multi: true
};

@Directive({
    selector:
        'm-input[type=file][formControlName],m-input[type=file][formControl],m-input[type=file][ngModel]',
    host: { '(change)': 'onChange($event.target)', '(blur)': 'onTouched()' },
    providers: [FILE_VALUE_ACCESSOR]
})
export class FileControlValueAccessor implements ControlValueAccessor {
    constructor(
        private el: ElementRef,
        private _renderer: Renderer2
    ) { }

    onChange = (value: any) => { }

    onTouched = () => { };

    writeValue(value: any): void {
        this._renderer.setProperty(this.el.nativeElement, 'value', value);
    }

    registerOnChange(fn): void {
        this.onChange = (nativeElement) => {
            fn(nativeElement.value);
        };
    }

    registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this._renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
    }

}