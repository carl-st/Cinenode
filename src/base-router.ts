import * as express from "express";

export class BaseRouter {

    protected title: string;
    private scripts: string[];
    app: express.Application;
    router: express.Router;
    model: any;

    constructor(app: express.Application,
                router: express.Router,
                model: any) {
        this.app = app;
        this.router = router;
        this.model = model;
        this.scripts = [];
        this.title = "Cinenode";
    }

    public addScript(src: string): BaseRouter {
        this.scripts.push(src);
        return this;
    }

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

    protected getAllSortedByField(req: express.Request,
                                  res: express.Response,
                                  next: express.NextFunction,
                                  field: String,
                                  desc: String) {
        let isTrueSet = (desc === "true");
        this.model.find((err, item) => {
            if (err) {
                res.send(err);
            }
        }).sort([[`${field}`, isTrueSet === true ? -1 : 1]]).populate("movie")
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

    public render(req: express.Request, res: express.Response, view: string, options?: Object) {
        res.locals.BASE_URL = "/";
        res.locals.scripts = this.scripts;
        res.locals.title = this.title;
        res.render(view, options);
    }
}