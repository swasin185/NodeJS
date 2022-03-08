"use strict";
exports.__esModule = true;
var big_js_1 = require("big.js");
var canvas_1 = require("canvas");
big_js_1["default"].DP = 20;
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
        this.re = re.round(big_js_1["default"].DP, big_js_1["default"].roundHalfUp);
        this.im = im.round(big_js_1["default"].DP, big_js_1["default"].roundHalfUp);
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
var MID_WIDTH = WIDTH / 2;
var MID_HEIGHT = HEIGHT / 2;
var MAX_N = 51;
var PALETTE = new Array(MAX_N);
var level = 0;
var x = Math.floor(Math.random() * 3);
for (var i = 0; i < MAX_N; i++) {
    PALETTE[i] = new Array(3);
    level = i * 5;
    PALETTE[i][x + i % 3] = level;
    PALETTE[i][(x + i + 1) % 3] = Math.floor(Math.random() * level / 2 + level / 2);
    PALETTE[i][(x + i + 2) % 3] = Math.floor(Math.random() * level / 2 + level / 2);
}
//const { createCanvas, loadImage } = require('canvas');
var canvas = (0, canvas_1.createCanvas)(WIDTH, HEIGHT);
var ctx = canvas.getContext('2d');
var imgData = ctx.createImageData(WIDTH, HEIGHT); // width x height
var data = imgData.data;
var boundary;
var center_real;
var center_image;
var center;
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
//paint();
calculate();
var fs = require("fs");
var buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./image.png', buffer);
// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    console.log('calculate');
    var time = (new Date()).getTime();
    boundary = new big_js_1["default"](3);
    center_real = new big_js_1["default"](-0.75);
    center_image = new big_js_1["default"](0);
    center = new Complex(center_real, center_image);
    var frontier = 2;
    var C = new Complex(new big_js_1["default"](-0.5), new big_js_1["default"](-0.5));
    var Zn;
    var im;
    var re;
    var n = 0;
    var coor = 0;
    var im0;
    var re0;
    var percent = Math.round(WIDTH * HEIGHT / 100);
    var i = 0;
    for (var y = 0; y < HEIGHT; y++) {
        im = boundary.times(y - MID_HEIGHT).div(HEIGHT).add(center_image);
        for (var x_1 = 0; x_1 < WIDTH; x_1++) {
            i++;
            re = boundary.times(x_1 - MID_WIDTH).div(WIDTH).add(center_real);
            if (i % percent == 0)
                console.log(i / percent + '%');
            C = new Complex(re, im);
            Zn = new Complex(re, im);
            n = 1;
            while (n < MAX_N && Zn.absolute().lt(frontier)) {
                re0 = Zn.getReal();
                im0 = Zn.getImage();
                Zn.power2();
                //                console.log('re=', re0, 'im=', im0);
                Zn.add(C);
                if (re0.eq(Zn.getReal()) && im0.eq(Zn.getImage()))
                    n = MAX_N;
                else
                    n++;
            }
            n--;
            coor = (y * WIDTH + x_1) * 4;
            data[coor] = PALETTE[n][0]; // RED
            data[++coor] = PALETTE[n][1]; // GREEN
            data[++coor] = PALETTE[n][2]; // BLUE
            data[++coor] = 255; // ALPHA
        }
    }
    paint();
    time = (new Date()).getTime() - time;
    console.log("run time =", time / 1000.0, "seconds");
}
function paint() {
    ctx.putImageData(imgData, 0, 0);
    for (var x_2 = 0; x_2 <= WIDTH; x_2 += 100) {
        ctx.moveTo(x_2, 0);
        ctx.lineTo(x_2, 5);
        ctx.moveTo(x_2, HEIGHT);
        ctx.lineTo(x_2, HEIGHT - 5);
    }
    for (var y = 0; y <= HEIGHT; y += 100) {
        ctx.moveTo(0, y);
        ctx.lineTo(5, y);
        ctx.moveTo(WIDTH, y);
        ctx.lineTo(WIDTH - 5, y);
    }
    ctx.moveTo(MID_WIDTH - 5, MID_HEIGHT);
    ctx.lineTo(MID_WIDTH + 5, MID_HEIGHT);
    ctx.moveTo(MID_WIDTH, MID_HEIGHT - 5);
    ctx.lineTo(MID_WIDTH, MID_HEIGHT + 5);
    ctx.stroke();
}
