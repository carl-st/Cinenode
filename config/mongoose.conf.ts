/**
 * Created by Karol on 09.05.2017.
 */
import mongoose = require('mongoose');


export default function mongooseConf() {

    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;

    let dbServer  = process.env.MONGO_URI;

    mongoose.connect(dbServer, (error) => {

        if (error) {
            throw error;
        }

    });

    mongoose.connection.on('connected', function () {
        console.log('Mongoose connection open to ' + dbServer);
    });

    mongoose.connection.on("error", function(err) {
        console.error('Failed to connect to DB ' + dbServer + ' on startup ', err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection to DB :' + dbServer + ' disconnected');
    });

    let gracefulExit = function() {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection with DB :' + dbServer + ' is disconnected through app termination');
            process.exit(0);
        });
    };

    process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

}
