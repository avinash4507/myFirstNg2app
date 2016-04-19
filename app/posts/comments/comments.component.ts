import { Component } from 'angular2/core';

@Component({
    selector: 'comments',
    template: `
        <div class="media">
            <div class="media-left">
                <a href="#">
                <img class="media-object comment-image" src="http://lorempixel.com/80/80/people?random={{commentId}}" alt="comment guy">
                </a>
            </div>
            <div class="media-body">
                <h4 class="media-heading">{{commentHeading}}</h4>
                {{commentBody}}
            </div>
        </div>
        <br/>
    `,
    styles: [`
        .comment-image {
            border-radius: 100%;
        }
    `],
    inputs: ['commentId','commentHeading','commentBody']
})

export class CommentsComponent {
    commentId;
    commentHeading;
    commentBody;
}