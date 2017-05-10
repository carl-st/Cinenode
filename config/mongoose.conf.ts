/**
 * Created by Karol on 09.05.2017.
 */
import mongoose = require('mongoose');


export default function mongooseConf() {

    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;

    mongoose.connect(process.env.MONGO_URI, (error) => {

        if (error) {
            throw error;
        }

    });

}
