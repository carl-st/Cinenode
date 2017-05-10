/**
 * Created by Karol on 09.05.2017.
 */

import * as mongoose from "mongoose";

export interface IMovie {
    title: string;
    year: number;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    ratings: mongoose.Schema.Types.Mixed[];
    metascore: number;
    imdbrating: number;
    imdbvotes: string;
    imdbid: string;
    type: string;
    boxoffice: string;
    production: string;
    website: string;
    response: boolean;
}

export class Movie implements IMovie {
    title: string;
    year: number;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    ratings: mongoose.Schema.Types.Mixed[];
    metascore: number;
    imdbrating: number;
    imdbvotes: string;
    imdbid: string;
    type: string;
    boxoffice: string;
    production: string;
    website: string;
    response: boolean;

    constructor(data: any) {
        this.title = data.title;
        this.year = data.year;
        this.rated = data.rated;
        this.released = data.released;
        this.runtime = data.runtime;
        this.genre = data.genre;
        this.director = data.director;
        this.writer = data.writer;
        this.actors = data.actors;
        this.plot = data.plot;
        this.language = data.language;
        this.country = data.country;
        this.awards = data.awards;
        this.poster = data.poster;
        this.ratings = data.ratings;
        this.metascore = data.metascore;
        this.imdbrating = data.imdbrating;
        this.imdbvotes = data.imdbvotes;
        this.imdbid = data.imdbid;
        this.type = data.type;
        this.boxoffice = data.boxoffice;
        this.production = data.production;
        this.website = data.website;
        this.response = data.response;
    }
}

let movieSchema = new mongoose.Schema({
    title: String,
    year: {
        type: Number,
        default: 0
    },
    rated: String,
    released: String,
    runtime: String,
    genre: String,
    director: String,
    writer: String,
    actors: String,
    plot: String,
    language: String,
    country: String,
    awards: String,
    poster: String,
    ratings: [mongoose.Schema.Types.Mixed],
    metascore: {
        type: Number,
        default: 0
    },
    imdbrating: {
        type: Number,
        default: 0
    },
    imdbvotes: String,
    imdbid: String,
    type: String,
    boxoffice: String,
    production: String,
    website: String,
    response: Boolean
});

export interface MovieDocument extends Movie, mongoose.Document { }
export let movies = mongoose.model<MovieDocument>("Movie", movieSchema);