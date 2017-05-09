/**
 * Created by Karol on 09.05.2017.
 */

import * as mongoose from "mongoose";

interface IComment {
    movie: mongoose.Schema.Types.ObjectId;
    content: string;
}

export class Comment implements IComment {
    movie: mongoose.Schema.Types.ObjectId;
    content: string;

    constructor(data: any) {
        this.movie = data.movie;
        this.content = data.content;
    }
}

let commentSchema = new mongoose.Schema({
    movie: mongoose.Schema.Types.ObjectId,
    content: String
});


export interface CommentDocument extends Comment, mongoose.Document { }
export let comments = mongoose.model<CommentDocument>("Comment", commentSchema);
