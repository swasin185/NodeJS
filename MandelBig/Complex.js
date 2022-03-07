"use strict";
exports.__esModule = true;
var big_js_1 = require("big.js");
big_js_1["default"].DP = 100;
var Complex = /** @class */ (function () {
    function Complex(re, im) {
        this.re = re;
        this.im = im;
    }
    Complex.prototype.absolute = function () {
        return this.re.pow(2).add(this.im.pow(2)).sqrt();
    };
    Complex.prototype.add = function (x) {
        this.re = this.re.add(x.re);
        this.im = this.im.add(x.im);
    };
    Complex.prototype.getImage = function () {
        return this.im;
    };
    Complex.prototype.getReal = function () {
        return this.re;
    };
    Complex.prototype.multiply = function (x) {
        var re = this.re.times(x.re).minus(this.im.times(x.im));
        var im = this.re.times(x.im).add(this.im.times(x.re));
        this.re = re;
        this.im = im;
    };
    Complex.prototype.power2 = function () {
        this.multiply(this);
    };
    Complex.prototype.equals = function (x) {
        return this.re.eq(x.re) && this.im.eq(x.im);
    };
    return Complex;
}());
exports["default"] = Complex;
