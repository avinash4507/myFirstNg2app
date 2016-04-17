import { Control } from 'angular2/common';

export class EmailValidator {
    static invalidEmailCheck(control: Control) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regex.test(control.value)) { 
            return null
        }
        else
            return {invalidEmail: true};
    }
}