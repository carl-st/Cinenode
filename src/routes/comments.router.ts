/**
 * Created by Karol on 09.05.2017.
 */
import {BaseRouter} from "../base-router";
import * as express from "express";
import {comments} from "../models/comment.model";

const BASE_URI = "/comment";

module Route {

    export class Routes extends BaseRouter {

        constructor(app: express.Application, router: express.Router) {
            super(app, router, comments);
            this.config();
        }

        private config() {
            let router = super.getRouter();
            router.get(`${BASE_URI}`,
                (req: express.Request,
                 res: express.Response,
                 next: express.NextFunction) => {
                    super.getAll(req, res, next);
                });
        }

    }
}

export = Route;