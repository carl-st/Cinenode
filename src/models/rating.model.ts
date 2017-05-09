/**
 * Created by Karol on 09.05.2017.
 */

import * as mongoose from "mongoose";

interface IRating {
    source: string;
    value: string;
}

export class Rating implements IRating {
    source: string;
    value: string;

    constructor(data: any) {
        this.source = data.movie;
        this.value = data.text;
    }
}

let visitTypeSchema = new mongoose.Schema({
    source: String,
    value: String
});


export interface RatingDocument extends Rating, mongoose.Document { }
export let ratings = mongoose.model<RatingDocument>("Comment", visitTypeSchema);
