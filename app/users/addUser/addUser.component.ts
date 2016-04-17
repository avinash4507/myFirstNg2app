import { Component, OnInit } from 'angular2/core';
import { ControlGroup, FormBuilder, Validators } from 'angular2/common';

@Component({
    templateUrl: 'app/users/addUser/addUser.template.html'
})

export class AddUserComponent {
    form: ControlGroup;
    constructor(fb: FormBuilder){
        this.form = fb.group({
            name: ['',Validators.compose([ Validators.required ])],
            email: ['',Validators.compose([ Validators.required ])],
            phone: ['',Validators.compose([ Validators.required ])],
            street: ['',Validators.compose([ Validators.required ])],
            suite: ['',Validators.compose([ Validators.required ])],
            city: ['',Validators.compose([ Validators.required ])],
            zipCode: ['',Validators.compose([ Validators.required ])]
            
        })
    }
}