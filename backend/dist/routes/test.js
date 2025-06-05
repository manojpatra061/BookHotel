"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testRouter = (0, express_1.Router)();
// api/test
testRouter.route("/try").get((_req, res) => {
    res.status(200).json({ message: "working..." });
});
exports.default = testRouter;
