/**
 * Created by Karol on 10.05.2017.
 */

import "mocha";
import movieModel = require("../models/movie.model");
import movies = movieModel.movies;
import Movie = movieModel.Movie;
import mongoose = require("mongoose");
import Caller = require("nodecaller");
import utils = require("./test.utils");

let path = "http://localhost:8080/api/movies";
let caller = new Caller(path);

let chai = require("chai");
chai.should();

let data = {
    title: "Guardians of the Galaxy",
    actors: "Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel"
};

let movie: Movie = new Movie(data);

describe("Movie Tests", function () {

    before(function (done: any) {
        utils.connectAndClean(done);
    });

    after(function (done: any) {
       utils.disconnect(done);
    });

    describe("Movie Model Unit Tests", function () {
        it("should be able to save movie without problems", function () {
            movies.create({}, function (err: any, result: any) {
                let exists = err.should.not.exist;
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
                next();
            }, 400);
            caller.run(done);
        });
    });


});

