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
    content: "I am Groot",
};

let comment: Comment = new Comment(data);

describe("Comment Tests", function () {

    beforeEach(function (done: any) {
        utils.connectAndClean(done);
    });

    afterEach(function (done: any) {
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
        it("should show all comments", function (done: any) {
            caller.get((result, next) => {
                let exists = result.body[0].content.should.exist;
                next();
            }, 200);
            caller.run(done);
        });
    });

});

