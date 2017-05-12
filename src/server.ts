import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import morgan = require("morgan");
import mongooseConf from "../config/mongoose.conf";
import routeConf from "./routes/routes";

export class Server {

    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();

        this.config();

        this.mongooseConf();

        this.routes(this.app);
    }

    public config() {
        this.app.use(express.static(path.join(__dirname, "public")));

        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");

        this.app.use(morgan("dev"));

        this.app.use(bodyParser.json());

        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use(cookieParser("a0lLTjF00X"));

        this.app.use(methodOverride());

        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        this.app.use(errorHandler());
    }

    private mongooseConf() {
        mongooseConf();
    }

    private routes(app: express.Application) {
        routeConf(app);
    }
}