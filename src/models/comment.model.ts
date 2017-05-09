/**
 * Created by Karol on 09.05.2017.
 */

import * as mongoose from 'mongoose';

interface IComment {
    movie: mongoose.Schema.Types.ObjectId;
    text: string;
}

export class Comment implements IComment {
    movie: mongoose.Schema.Types.ObjectId;
    text: string;

    constructor(data) {
        this.movie = data.movie;
        this.text = data.text;
    }
}

let commentSchema = new mongoose.Schema({
    movie: mongoose.Schema.Types.ObjectId,
    text: String
});


export interface CommentDocument extends Comment, mongoose.Document { }
export let Comments = mongoose.model<CommentDocument>('Comment', commentSchema);
