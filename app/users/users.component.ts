import { Component, OnInit } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UsersService } from './users.service';
import { UserFormComponent } from './userForm/userForm.component';

@Component({
    template: `
        <h1>Users</h1>
        <p><a [routerLink]="['NewUser']"><button class="btn btn-primary">Add User</button></a></p>
        <div class="table-responsive">
            <table class="table table-bordered">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                <tr *ngFor="#user of users">
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td><a [routerLink]="['EditUser', {id: user.id}]"><i class="glyphicon glyphicon-edit"></i></a></td>
                    <td><i (click)="deleteUser(user)" class="glyphicon glyphicon-remove clickable"></i></td>
                </tr>
            </table>
        </div>
    `,
    styles: [`
       .clickable {
           cursor: pointer;
       } 
    `],
    directives: [ ROUTER_DIRECTIVES ],
    providers: [ UsersService, ToastsManager ]
})

export class UsersComponent implements OnInit {
    users = [];
    
    constructor(private _userService: UsersService, private _toastr: ToastsManager) {
        
    }
    
    ngOnInit() {
        this._userService.getUsers()
            .subscribe(res => {
                this.users = res;
            });
    }
    
    deleteUser(user) {
        if(confirm("Are you sure you want to delete " + user.name + "?")){
            var index = this.users.indexOf(user);
            this.users.splice(index,1);
            
            this._userService.deleteUser(user.id)
                .subscribe(null,
                    err =>{
                        this._toastr.error('Could not delete the user');
                        this.users.splice(index,0,user)
                    })
        }
    }
}