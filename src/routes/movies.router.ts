/**
 * Created by Karol on 09.05.2017.
 */
import {BaseRouter} from "../base-router";
import * as express from "express";
import movie = require("../models/movie.model");
import movies = movie.movies;
import Movie = movie.Movie;
import Caller = require("nodecaller");
import request = require("request");
import rating = require("../models/rating.model");
import Rating = rating.Rating;
import ratingsModel = rating.ratings;

const BASE_URI = "/movies";

module Route {

    export class Routes extends BaseRouter {

        constructor(app: express.Application, router: express.Router) {
            super(app, router, movies);
            this.config();
        }

        private config() {
            let router = super.getRouter();
            router.get(BASE_URI,
                (req: express.Request,
                 res: express.Response,
                 next: express.NextFunction) => {
                    super.getAll(req, res, next);
                });
            router.post(BASE_URI,
                (req: express.Request,
                 res: express.Response,
                 next: express.NextFunction) => {
                    console.log("Title:" + req.body.title);
                    this.downloadMovieData(req, res, next, req.body);
                });
        }

        private downloadMovieData(req: express.Request,
                                  res: express.Response,
                                  next: express.NextFunction,
                                  body: any) {
            let titleWithPluses = body.title.split(" ").join("+");
            let caller = new Caller("http://www.omdbapi.com/");
            caller.get({"t": titleWithPluses}, (result, next) => {
                let body: any = result.body;

                for (let key in body) {
                    if (body.hasOwnProperty(key)) {
                        if (body[key] === "N/A") {
                            body[key] = 0; // Otherwise cast error in mongoose
                        }
                        body[key.toLowerCase()] = body[key];
                        delete body[key];
                    }
                }

                let movie = new Movie(body);
                console.log(body);
                super.findByTitleAndCreateOrUpdate(req, res, next, body.title, movie);
            });
            caller.run();
        }

    }
}

export = Route;