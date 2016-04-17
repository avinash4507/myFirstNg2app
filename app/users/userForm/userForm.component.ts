import { Component, OnInit } from 'angular2/core';
import { ControlGroup, FormBuilder, Validators } from 'angular2/common';
import { CanDeactivate, Router, RouteParams } from 'angular2/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { EmailValidator } from './email.validator';
import { UsersService } from '../users.service';
import { Address, User } from '../user';

@Component({
    templateUrl: 'app/users/userForm/userForm.template.html',
    styles: [`
        .ng-touched.ng-invalid {
            border: 1px solid crimson
        }
    `],
    providers: [ UsersService, ToastsManager ]
})

export class UserFormComponent implements CanDeactivate, OnInit {
    form: ControlGroup;
    user = new User();
    title: string;
    constructor(fb: FormBuilder,
                private _usersService: UsersService,
                private _router: Router, 
                private _toastr: ToastsManager,
                private _routeParams: RouteParams){
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
    
    ngOnInit() {
        let userId = this._routeParams.get("id")
        
        if(userId)
            this.title = 'Edit User';
        else
            this.title = 'New User';
        
        if(!userId)
            return;
        
        this._usersService.getUsersById(userId)
            .subscribe(user => this.user = user,
                response => {
                    if (response.status == 404) {
                        this._router.navigate(['NotFound']);
                    }
                });
    }
    
    onSubmit() {  
        var result;      
        if(this.user.id)
            result = this._usersService.updateUser(this.user);
        else
            result =  this._usersService.saveUser(this.user);
            
                result.subscribe(result => {
                    if(result.id)
                        this._toastr.success('User saved successfully')
                    else
                        this._toastr.error('Save encountered an error')
                    this._router.navigate(['Users']);
                });
    }
    
    routerCanDeactivate(next, previous){
         if(this.form.dirty)
            return confirm("You have unsaved changes. Are you sure you want to navigate away?");
            
         return true;
    }
       
}