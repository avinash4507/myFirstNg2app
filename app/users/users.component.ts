import { Component, OnInit } from 'angular2/core';
import { Observable } from 'rxjs/Rx';

import { UsersService } from './users.service';

@Component({
    template: `
        <h1>Users</h1>
        <p><a ><button class="btn btn-primary">Add User</button></a></p>
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
                    <td><i class="glyphicon glyphicon-edit"></i></td>
                    <td><i class="glyphicon glyphicon-remove"></i></td>
                </tr>
            </table>
        </div>
    `,
    providers: [ UsersService ]
})

export class UsersComponent implements OnInit {
    users = [];
    
    constructor(private _userService: UsersService) {
        
    }
    
    ngOnInit() {
        this._userService.getUsers()
            .subscribe(res => {
                this.users = res;
            });
    }
}