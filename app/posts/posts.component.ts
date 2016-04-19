import { Component, OnInit } from 'angular2/core';
import { PostsService } from './posts.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommentsComponent } from './comments/comments.component';

@Component({
    template: `
        <h1>Posts</h1>
        <div class="row">
            <spinner [visible]="isLoading"></spinner>
            <ul class="list-group col-md-6 col-sm-6 posts">
                <li class="list-group-item" *ngFor="#post of posts" [ngClass]="{active: currentPost==post}" (click)="select(post)">{{post.title}}</li>
            </ul>
            <div *ngIf="currentPost" class="col-md-6 col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">{{currentPost.title}}</h3>
                    </div>
                    <div class="panel-body">
                        {{currentPost.body}}
                        <hr/>
                        <spinner [visible]="commentIsLoading"></spinner>
                        <comments *ngFor="#comment of currentPost.comments" [commentId]="comment.id" [commentHeading]="comment.name" [commentBody]="comment.body"></comments>
                    </div>
                </div>
            </div>
        </div>
    `,
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
    providers: [ PostsService ]
})

export class PostsComponent implements OnInit{
    posts = [];
    isLoading: boolean = true;
    currentPost;
    commentIsLoading: boolean;
    
    constructor(private _postsService: PostsService){
        
    }
    
    ngOnInit() {
        this._postsService.getPosts()
            .subscribe(
                allPosts => this.posts = allPosts,
                error => console.error(error),
                () => {
                    console.log('completed'),
                    this.isLoading = false   
                }
            )
    }
    
    select(post) {
        this.currentPost = post;
        this.commentIsLoading = true;
        this._postsService.getComments(post.id)
            .subscribe( 
                comments => this.currentPost.comments = comments,
                error =>console.error(error),
                () => this.commentIsLoading = false
            );
    }    
}