import { Component, OnInit } from 'angular2/core';
import { PostsService } from './posts.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommentsComponent } from './comments/comments.component';
import { UsersService } from '../users/users.service';

@Component({
    templateUrl: 'app/posts/posts.template.html',
    styles: [`
        .posts li {
            cursor: pointer
        }
        .posts li:hover {
            background: grey;
        }
        .list-group-item.active,
        .list-group-item.active:hover,
        .list-group-item.active:focus {
            background-color: grey;
            border-color: grey; 
            color: black;
        }
    `],
    directives: [ SpinnerComponent, CommentsComponent ],
    providers: [ PostsService, UsersService ]
})

export class PostsComponent implements OnInit{
    posts = [];
    users = [];
    postsLoading: boolean;
    currentPost;
    commentsLoading: boolean;
    
    constructor(private _postsService: PostsService, private _usersService: UsersService){
        
    }
    
    ngOnInit() {
        this.getPosts();
        this.getUsers();
    }
    
    getUsers() {
        this._usersService.getUsers()
            .subscribe(
                users => this.users = users,
                errors =>console.error(errors),
                () => console.log('completed')
            )
    }
    
    select(post) {
        this.currentPost = post;
        this.commentsLoading = true;
        this._postsService.getComments(post.id)
            .subscribe( 
                comments => this.currentPost.comments = comments,
                error =>console.error(error),
                () => this.commentsLoading = false
            );
    }    
    
    getPosts(filter?: number) {
        this.currentPost = null;
        this.postsLoading = true;
        this._postsService.getPosts(filter)
            .subscribe( 
                posts => this.posts = posts,
                error =>console.error(error),
                () => this.postsLoading = false
            )
    }
}