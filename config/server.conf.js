#!/usr/bin/env node
"use strict";

var server = require("../dist/src/server");
var debug = require("debug")("express:server");
var http = require("http");

var envConf = require("../dist/config/env.conf");

envConf.validateEnvVariables();

var port = normalizePort(process.env.PORT) !== undefined ?
    normalizePort(process.env.PORT) : 8080;
var app = server.Server.bootstrap().app;
app.set("port", port);
var httpServer = http.createServer(app);

httpServer.listen(port);
httpServer.on("error", onError);
httpServer.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(input) {
    let port = parseInt(input, 10);

    if (isNaN(port)) {
        // named pipe
        return input;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    let addr = httpServer.address();
    let bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        console.log(`Wizardry is afoot on ${bind}`);
    }
}