import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()

export class UsersService {
    private _url = 'http://jsonplaceholder.typicode.com/users';
    
    constructor(private _http: Http) {
        
    }
    
    getUsers() {
        return this._http.get(this._url)
            .map(res => res.json());
    }
    
    saveUser(user) {
        return this._http.post(this._url, JSON.stringify(user))
            .map( result => result.json());
    }
    
    getUsersById(id) {
        return this._http.get(this._url + '/' + id)
            .map( result => result.json() );
    }
    
    updateUser(user) {
        return this._http.put(this._url + '/' + user.id, JSON.stringify(user))
            .map( result => result.json());
    }
    
    deleteUser(id) {
        return this._http.delete(this._url + '/' + id)
            .map( res => res.json() );
    }
}