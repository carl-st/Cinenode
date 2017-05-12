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
let expect = chai.expect;

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
            movies.create(movie, function (err: any, result: any) {
                expect(result.actors).to.equal(movie.actors);
                expect(result.title).to.equal(movie.title);
            });
        });
    });

    describe("Movie API Unit Tests", function () {
        it("should return full movie data", function (done: any) {
            caller.post({
                "title": "guardians of the galaxy"
            }, (result, next) => {
                expect(result.body).to.have.property("title");
                expect(result.body).to.have.property("actors");
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

