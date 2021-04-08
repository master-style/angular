import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RadioControlValueAccessor, RadioControlRegistry } from './radio.directive';
import { CheckboxRequiredValidator, CheckboxControlValueAccessor } from './checkbox.directive';
import { DefaultValueAccessor } from './control.directive';
import { NumberValueAccessor } from './number.directive';
import { OptionControlValueAccessor, SelectMultipleControlValueAccessor } from './select-multiple.directive';
import { SelectControlValueAccessor } from './select.directive';
import { FileControlValueAccessor } from './file.directive';

const SHARED_DIRECTIVES: any[] = [
    RadioControlValueAccessor,
    FileControlValueAccessor,
    CheckboxControlValueAccessor,
    CheckboxRequiredValidator,
    DefaultValueAccessor,
    NumberValueAccessor,
    OptionControlValueAccessor,
    SelectControlValueAccessor,
    SelectMultipleControlValueAccessor
];

@NgModule({
    declarations: SHARED_DIRECTIVES,
    imports: [],
    providers: [
        RadioControlRegistry
    ],
    exports: [
        ...SHARED_DIRECTIVES

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormModule { }
