import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validators } from '@angular/forms';
import emailParser from './emailParser'


@Directive({
    selector: '[validateEmail][ngModel],[validateEmail][formControl]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
    ]
})
class EmailValidator {

    constructor() {
    }

    validate(c: FormControl): any {

        if (!c || !c.value) return null;

        const parsed = emailParser(c.value);

        const result = Validators.email(new FormControl(parsed.email))

        return result;
    }
}

export default EmailValidator