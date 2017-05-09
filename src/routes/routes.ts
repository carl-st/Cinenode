/**
 * Created by Karol on 09.05.2017.
 */
import * as express from "express";
import * as indexRouter from "./index.router";
import * as movieRouter from "./movies.router";
import * as commentsRouter from "./comments.router";

export default (app: express.Application) => {
    let router: express.Router;
    router = express.Router();

    let index: indexRouter.Routes = new indexRouter.Routes(this.app, router);
    let movies: movieRouter.Routes = new movieRouter.Routes(this.app, router);
    let comments: commentsRouter.Routes = new commentsRouter.Routes(this.app, router);

    // All of routes will be prefixed with /api
    app.use("/api", router);

    //use router middleware
    app.use(router);
};