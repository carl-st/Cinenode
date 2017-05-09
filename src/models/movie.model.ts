/**
 * Created by Karol on 09.05.2017.
 */

import * as mongoose from 'mongoose';

interface IMovie {
    title: string,
    year: number,
    rated: string,
    released: string,
    runtime: string,
    genre: string,
    director: string,
    writer: string,
    actors: string,
    plot: string,
    language: string,
    country: string,
    awards: string,
    poster: string,
    ratings: mongoose.Schema.Types.ObjectId[],
    metascore: number,
    imdbRating: number,
    imdbVotes: string,
    imdbId: string,
    type: string,
    boxOffice: string,
    production: string,
    website: string,
    response: boolean
}

export class Movie {
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
    ratings: mongoose.Schema.Types.ObjectId[];
    metascore: number;
    imdbRating: number;
    imdbVotes: string;
    imdbId: string;
    type: string;
    boxOffice: string;
    production: string;
    website: string;
    response: boolean;

    constructor(data) {
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
        this.language = data.label;
        this.country = data.country;
        this.awards = data.awards;
        this.poster = data.poster;
        this.ratings = data.ratings;
        this.metascore = data.metascore;
        this.imdbRating = data.imdbRating;
        this.imdbVotes = data.imdbVotes;
        this.imdbId = data.imdbId;
        this.type = data.type;
        this.boxOffice = data.boxOffice;
        this.production = data.production;
        this.website = data.website;
        this.response = data.response;
    }
}

let movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
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
    ratings: [mongoose.Schema.Types.ObjectId],
    metascore: Number,
    imdbRating: Number,
    imdbVotes: String,
    imdbId: String,
    type: String,
    boxOffice: String,
    production: String,
    website: String,
    response: Boolean
});

export interface MovieDocument extends Movie, mongoose.Document { }
export let Movies = mongoose.model<MovieDocument>('Movie', movieSchema);