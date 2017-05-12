import * as express from "express";
import { BaseRouter } from "../base-router";
import {comments} from "../models/comment.model";

module Route {

    export class Routes extends BaseRouter {

        /**
         * Constructor
         *
         * @class IndexRoute
         * @constructor
         */
        constructor(app: express.Application, router: express.Router) {
            super(app, router, comments);
            this.config();
        }

        /**
         * Create the routes.
         *
         * @class IndexRoute
         * @method create
         * @static
         */
        private config() {
            let router = super.getRouter();
            router.get("/", (req: express.Request,
                             res: express.Response,
                             next: express.NextFunction) => {
                this.index(req, res, next);
            });
        }

        /**
         * The home page route.
         *
         * @class IndexRoute
         * @method index
         * @param req {Request} The express Request object.
         * @param res {Response} The express Response object.
         * @next {NextFunction} Execute the next method.
         */
        public index(req: express.Request, res: express.Response, next: express.NextFunction) {
            this.title = "Cinenode";
            let options: Object = {
                "message": "Welcome to Cinenode"
            };

            this.render(req, res, "index", options);
        }
    }
}

export = Route;