import 'core-js'

import EmailValidator from './email-address-validator.directive';
import { FormControl } from '@angular/forms';
var tape: any = require('tape');


const valid = [
    'Mark <test@gmail.com>',
    '"Mark Mark" <test@gmail.com>',
    'test@test.com',
    '<test@test.com>'
]

valid.forEach(example => {
    tape(`EmailValidator: ${example} should be valid`, (t: any) => {
        const validator = new EmailValidator();
        const result = validator.validate(new FormControl(example));
        t.ok(result === null);
        t.end();
    })
});


const invalid = [
    'Mark <testgmail.com>',
    '"Mark Mark" test.com>',
    'mark testtest',
    'testtest.com'
]

invalid.forEach(example => {
    tape(`EmailValidator: ${example} should be valid`, (t: any) => {
        const validator = new EmailValidator();
        const result = validator.validate(new FormControl(example));
        t.ok(result && result.email );
        t.end();
    })

});




