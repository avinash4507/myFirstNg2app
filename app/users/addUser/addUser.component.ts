import { Component, OnInit } from 'angular2/core';
import { ControlGroup, FormBuilder, Validators } from 'angular2/common';
import { CanDeactivate, Router } from 'angular2/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { EmailValidator } from './email.validator';
import { UsersService } from '../users.service';

@Component({
    templateUrl: 'app/users/addUser/addUser.template.html',
    styles: [`
        .ng-touched.ng-invalid {
            border: 1px solid crimson
        }
    `],
    providers: [ UsersService, ToastsManager ]
})

export class AddUserComponent implements CanDeactivate {
    form: ControlGroup;
    constructor(fb: FormBuilder,
                private _usersService: UsersService,
                private _router: Router, 
                private _toastr: ToastsManager){
        this.form = fb.group({
            name: ['',Validators.compose([ Validators.required ])],
            email: ['',Validators.compose([ Validators.required, EmailValidator.invalidEmailCheck ])],
            phone: [],
            address: fb.group({
                street: [],
                suite: [],
                city: [],
                zipCode: []
            })
        })
    }
    
    onSubmit() {
        this._usersService.saveUser(this.form.value)
            .subscribe(result => {
                if(result.id)
                    this._toastr.success('User saved successfully')
                else
                    this._toastr.error('Save encountered an error')
                this._router.navigate(['Users']);
            })
    }
    
    routerCanDeactivate(next, previous){
         if(this.form.dirty)
            return confirm("You have unsaved changes. Are you sure you want to navigate away?");
            
         return true;
    }
       
}