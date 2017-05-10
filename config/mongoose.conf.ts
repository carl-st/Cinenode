/**
 * Created by Karol on 09.05.2017.
 */
import mongoose = require('mongoose');


export default function mongooseConf() {

    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/cinenode";

    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;

    mongoose.connect(MONGODB_CONNECTION, (error) => {

        if (error) {
            throw error;
        }

    });

}
