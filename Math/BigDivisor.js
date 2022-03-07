"use strict";
exports.__esModule = true;
var big_js_1 = require("big.js");
var loop = Number(process.argv[2]) + 1;
big_js_1["default"].DP = 1000;
var x = new big_js_1["default"](1.0);
var y = new big_js_1["default"](1.0);
while (y.lt(loop)) {
    console.log(y + " : " + x.div(y).toFixed(50));
    y = y.add(1);
}
