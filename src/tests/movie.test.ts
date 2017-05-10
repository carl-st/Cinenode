import "mocha";
import movieModel = require("../models/movie.model");
import movies = movieModel.movies;
import Movie = movieModel.Movie;
import mongooseConf from "../../config/mongoose.conf";
import mongoose = require("mongoose");
import Caller = require("nodecaller");
import * as express from "express";

mongooseConf();

let app = express();
let url = "http://localhost:8080/api/movies";
let caller = new Caller(url);
let chai = require("chai");
chai.should();



let data = {
    title: "Guardians of the Galaxy",
    actors: "Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel"
};

let movie: Movie = new Movie(data);

describe("Movie Model Unit Tests", function () {
    it("should be able to save without problems", function () {
        movies.create({}, function (err: any, result: any) {
            var exists = err.should.not.exist;
            exists = result._id.should.exist;
            result.title.should.equal(movie.title);
            result.actors.should.equal(movie.actors);
        });
    });
});

describe("Movie API Unit Tests", function () {
    it("should return full movie data", function (done: any) {
        caller.post({
            "title": "guardians of the galaxy"
        }, (result, next) => {
            result.body.title.should.equal(movie.title);
            result.body.actors.should.equal(movie.actors);
            next();
        });
        caller.run(done);
    });

    it("should return error without given title", function (done: any) {
        caller.post({
            "lol": "guardians of the galaxy"
        }, (result, next) => {
            console.log("dupa");
            next();
        }, 400);
        caller.run(done);
    });
});