/**
 * Created by Karol on 09.05.2017.
 */
import {BaseRouter} from "../base-router";
import * as express from "express";
import comment = require("../models/comment.model");
import comments = comment.comments;
import Comment = comment.Comment;

const BASE_URI = "/comment";

module Route {

    export class Routes extends BaseRouter {

        constructor(app: express.Application, router: express.Router) {
            super(app, router, comments);
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
                    let comment = new Comment({
                        movie: req.body.movie,
                        content: req.body.content
                    });
                    super.create(req, res, next, comment);
                });
        }

    }
}

export = Route;