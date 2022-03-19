"use strict";
exports.__esModule = true;
var bignumber_js_1 = require("bignumber.js");
var canvas_1 = require("canvas");
var DP = 20;
bignumber_js_1["default"].config({ DECIMAL_PLACES: DP, POW_PRECISION: DP, ROUNDING_MODE: bignumber_js_1["default"].ROUND_HALF_UP });
var Complex = /** @class */ (function () {
    function Complex(re, im) {
        this.re = re;
        this.im = im;
    }
    Complex.prototype.absolute = function () {
        return this.re.pow(2).plus(this.im.pow(2));
    };
    Complex.prototype.add = function (x) {
        this.re = this.re.plus(x.re);
        this.im = this.im.plus(x.im);
    };
    Complex.prototype.getImage = function () {
        return this.im;
    };
    Complex.prototype.getReal = function () {
        return this.re;
    };
    Complex.prototype.multiply = function (x) {
        var re = this.re.times(x.re).minus(this.im.times(x.im));
        var im = this.re.times(x.im).plus(this.im.times(x.re));
        this.re = re.sd(DP);
        this.im = im.sd(DP);
    };
    Complex.prototype.power2 = function () {
        this.multiply(this);
    };
    Complex.prototype.equals = function (x) {
        return this.re.eq(x.re) && this.im.eq(x.im);
    };
    return Complex;
}());
// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
var WIDTH = 1000;
var HEIGHT = 1000;
var MAX_N = 500;
var PALETTE = new Array(MAX_N);
for (var i = 0; i <= MAX_N; i++) {
    PALETTE[i] = new Array(3);
    PALETTE[i][0] = (i * 35) % 250;
    PALETTE[i][1] = (i * 20) % 200;
    PALETTE[i][2] = (i * 10) % 250;
}
var canvas = (0, canvas_1.createCanvas)(WIDTH, HEIGHT);
var ctx = canvas.getContext('2d');
var imgData = ctx.createImageData(WIDTH, HEIGHT); // width x height
var data = imgData.data;
var boundary;
var center_real;
var center_image;
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
var time = (new Date()).getTime();
calculate();
time = (new Date()).getTime() - time;
console.log("run time =", Math.round(time / 1000.0), "seconds");
ctx.putImageData(imgData, 0, 0);
var fs = require("fs");
var buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./big' + DP + '-' + Math.round(time / 1000.0) + '.png', buffer);
// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    console.log('calculate');
    boundary = new bignumber_js_1["default"]('1E-8');
    //center_real = new BigNumber('-1.7900011049');
    //center_image = new BigNumber('1E-10');
    center_real = new bignumber_js_1["default"]('-1.19067');
    center_image = new bignumber_js_1["default"]('0.242035');
    var frontier = 2 * 2;
    var C;
    var Zn;
    var im;
    var re;
    var n = 0;
    var coor = 0;
    var im0;
    var re0;
    var percent = Math.round(WIDTH * HEIGHT / 100);
    var i = 0;
    var step = boundary.div(WIDTH);
    var bound2 = boundary.div(2);
    center_real = center_real.minus(bound2);
    center_image = center_image.times(-1);
    center_image = center_image.minus(bound2);
    im = center_image;
    for (var y = 0; y < HEIGHT; y++) {
        re = center_real;
        for (var x = 0; x < WIDTH; x++) {
            i++;
            if (i % percent == 0) {
                console.log(i / percent + '%', Math.round(((new Date()).getTime() - time) / 1000.0), "sec");
            }
            C = new Complex(re, im);
            Zn = new Complex(re, im);
            n = 0;
            re0 = null;
            im0 = null;
            while (n < MAX_N && Zn.absolute().lt(frontier) &&
                (re0 == null || !(Zn.getReal().eq(re0) && Zn.getImage().eq(im0)))) {
                re0 = Zn.getReal();
                im0 = Zn.getImage();
                Zn.power2();
                Zn.add(C);
                n++;
            }
            coor = (y * WIDTH + x) * 4;
            data[coor] = PALETTE[n][0]; // RED
            data[++coor] = PALETTE[n][1]; // GREEN
            data[++coor] = PALETTE[n][2]; // BLUE
            data[++coor] = 255; // ALPHA
            re = re.plus(step);
        }
        im = im.plus(step);
    }
}
