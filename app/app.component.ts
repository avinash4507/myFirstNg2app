import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { AddUserComponent } from './users/addUser/addUser.component';

@RouteConfig([
    {path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    {path: '/users', name: 'Users', component: UsersComponent },
    {path: '/users/new', name: 'AddUser', component: AddUserComponent },
    {path: '/posts', name: 'Posts', component: PostsComponent },
    {path: '/*others', name: 'Others', redirectTo: ['Home'] }   
])

@Component({
    selector: 'my-app',
    template: `
        <navbar></navbar>
        <div class="container">   
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ NavbarComponent, ROUTER_DIRECTIVES ],
})
export class AppComponent {
    
}