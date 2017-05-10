import * as express from "express";

/**
 * Constructor
 *
 * @class BaseRoute
 */
export class BaseRouter {

    protected title: string;
    private scripts: string[];
    app: express.Application;
    router: express.Router;
    model: any;

    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor(app: express.Application,
                router: express.Router,
                model: any) {
        this.app = app;
        this.router = router;
        this.model = model;
        this.scripts = [];
        this.title = "Cinenode";
    }

    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    public addScript(src: string): BaseRouter {
        this.scripts.push(src);
        return this;
    }

    /**
     *
     *
     * @returns {BaseRoute} Self
     */
    public getRouter() {
        return this.router;
    }

    protected getAll(req: express.Request,
                     res: express.Response,
                     next: express.NextFunction) {
        this.model.find((err, item) => {
            if (err) {
                res.send(err);
            }
        }).populate("movie")
            .exec((err, item) => {
                res.json(item);
            });
    }

    protected getByMovie(req: express.Request,
                         res: express.Response,
                         next: express.NextFunction,
                         movieId: any) {
        this.model.find({
            "movie": movieId
        }, (err, item) => {
            if (err) {
                res.send(err);
            }
        }).populate("movie")
            .exec((err, item) => {
                res.json(item);
            });
    }

    protected findByTitleAndCreateOrUpdate(req: express.Request,
                                           res: express.Response,
                                           next: express.NextFunction,
                                           title: any,
                                           newData: any) {
        this.model.findOneAndUpdate({
            "title": title
        }, newData, {
            upsert: true,
            new: true
        }, (err, item) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                res.json(item);
                console.log(`Item created or updated: ${item}`);
            }

        });
    }

    protected create(req: express.Request,
                     res: express.Response,
                     next: express.NextFunction,
                     dataModel: any) {
        this.model.create(dataModel, (err, item) => {
            if (err) {
                res.send(err);
            } else {
                res.json(item);
                console.log(`Item created: ${item}`);
            }
        });
    }

    /**
     * Render a page.
     *
     * @class BaseRoute
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {String} The view to render.
     * @param options {Object} Additional options to append to the view's local scope.
     * @return void
     */
    public render(req: express.Request, res: express.Response, view: string, options?: Object) {
        res.locals.BASE_URL = "/";
        res.locals.scripts = this.scripts;
        res.locals.title = this.title;
        res.render(view, options);
    }
}