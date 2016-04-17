import { Component, OnInit } from 'angular2/core';
import { ControlGroup, FormBuilder, Validators } from 'angular2/common';

import { EmailValidator } from './email.validator';

@Component({
    templateUrl: 'app/users/addUser/addUser.template.html',
    styles: [`
        .ng-touched.ng-invalid {
            border: 1px solid crimson
        }
    `]
})

export class AddUserComponent {
    form: ControlGroup;
    constructor(fb: FormBuilder){
        this.form = fb.group({
            name: ['',Validators.compose([ Validators.required ])],
            email: ['',Validators.compose([ Validators.required, EmailValidator.invalidEmailCheck ])],
            phone: ['',Validators.compose([ Validators.required ])],
            street: ['',Validators.compose([ Validators.required ])],
            suite: ['',Validators.compose([ Validators.required ])],
            city: ['',Validators.compose([ Validators.required ])],
            zipCode: ['',Validators.compose([ Validators.required ])]
            
        })
    }
}