/**
 * Created by Karol on 09.05.2017.
 */

import * as mongoose from "mongoose";

export class Comment {
    movie: mongoose.Schema.Types.ObjectId;
    content: string;

    constructor(data: any) {
        this.movie = data.movie;
        this.content = data.content;
    }
}

let commentSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        required: "movie Id is required",
        ref: "Movie"
    },
    content: {
        type: String,
        required: "comment text is required"
    }
});


export interface CommentDocument extends Comment, mongoose.Document { }
export let comments = mongoose.model<CommentDocument>("Comment", commentSchema);
