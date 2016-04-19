import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map'

@Injectable() 

export class PostsService {
    constructor(private _http: Http){
        
    }
    
    private _url = 'http://jsonplaceholder.typicode.com/posts'
    
    getPosts() {
        return this._http.get(this._url)
            .map( res => res.json() );
    }
    
    getComments(id) {
        return this._http.get(this._url + '/' + id + '/comments')
            .map( res => res.json() );
    }
}