/**
 * Created by Karol on 11.05.2017.
 */

import mongoose = require("mongoose");

export function connectAndClean(done: any) {

    function clearDB() {
        for (let i in mongoose.connection.collections) {

            if (mongoose.connection.collections) {
                mongoose.connection.collections[i].remove(function() {
                    console.log("removed");
                });
            }
        }
        return done();
    }

    if (mongoose.connection.readyState === 0) {
        mongoose.connect("mongodb://localhost:27017/test", function (err: any) {
            if (err) {
                throw err;
            }

            return clearDB();
        });
    } else {
        return clearDB();
    }
}

export function disconnect(done: any) {
    mongoose.disconnect();
    return done();
}