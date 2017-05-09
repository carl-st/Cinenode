import { NextFunction, Request, Response, Router } from "express";
import { BaseRouter } from "./router";


export class IndexRouter extends BaseRouter {

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            new IndexRouter().index(req, res, next);
        });
    }

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
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
    public index(req: Request, res: Response, next: NextFunction) {
        this.title = "Cinenode";
        let options: Object = {
            "message": "Welcome to Cinenode"
        };

        this.render(req, res, "index", options);
    }
}