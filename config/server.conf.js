#!/usr/bin/env node
"use strict";

let server = require("../src/server");
let debug = require("debug")("express:server");
let http = require("http");

let envConf = require("../config/env.conf");

envConf.validateEnvVariables();

let port = normalizePort(process.env.PORT) !== undefined ?
    normalizePort(process.env.PORT) : 8080;

let app = server.Server.bootstrap().app;
app.set("port", port);

let httpServer = http.createServer( app ).listen( process.env.PORT, function() {
  console.log('Express server listening on port ' + process.env.PORT);
});

httpServer.listen(port);
httpServer.on("error", onError);
httpServer.on("listening", onListening);

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

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

function normalizePort(input) {
    let port = parseInt(input, 10);

    if (isNaN(port)) {
        return input;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onListening() {
    let addr = httpServer.address();
    let bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
}