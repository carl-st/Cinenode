/**
 * Created by Karol on 10.05.2017.
 */

import "mocha";
import commentModel = require("../models/comment.model");
import comments = commentModel.comments;
import Comment = commentModel.Comment;
import mongoose = require("mongoose");
import Caller = require("nodecaller");
import utils = require("./test.utils");

let path = "http://localhost:8080/api/comments";
let caller = new Caller(path);

let chai = require("chai");
chai.should();


let data = {
    movie: "59135336d609e14cf9698396",
    content: "I am Groot."
};

let comment: Comment = new Comment(data);

describe("Comment Tests", function () {

    before(function (done: any) {
        utils.connectAndClean(done);
    });

    after(function (done: any) {
        utils.disconnect(done);
    });

    describe("Comment Model Unit Tests", function () {
        it("should be able to save comment without problems", function () {
            comments.create(comment, function (err: any, result: any) {
                let exists = err.should.not.exist;
                exists = result._id.should.exist;
                result.content.should.equal(comment.content);
            });
        });
    });

    describe("Comment API Unit Tests", function () {
        it("should not be able to add comment without movie id", function (done: any) {
            caller.post({
                content: "That dude there. I need his prosthetic leg."
            }, (result, next) => {
                next();
            }, 400);
            caller.run(done);
        });
    });

});

