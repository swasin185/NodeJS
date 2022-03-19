"use strict";
exports.__esModule = true;
var decimal_js_light_1 = require("decimal.js-light");
var canvas_1 = require("canvas");
var DP = 20;
decimal_js_light_1.Decimal.config({ precision: DP });
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
// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
var WIDTH = 1000;
var HEIGHT = 1000;
var MID_WIDTH = WIDTH / 2;
var MID_HEIGHT = HEIGHT / 2;
var MAX_N = 1000;
var PALETTE = new Array(MAX_N);
for (var i = 0; i <= MAX_N; i++) {
    PALETTE[i] = new Array(3);
    PALETTE[i][0] = (i * 3 % 255);
    PALETTE[i][1] = (i * 59 % 255);
    PALETTE[i][2] = (i * 27 % 255);
}
//const { createCanvas, loadImage } = require('canvas');
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
var fs = require("fs");
var buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./dec' + DP + '-' + Math.round(time / 1000.0) + '.png', buffer);
// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    console.log('calculate');
    boundary = new decimal_js_light_1.Decimal('1');
    center_real = new decimal_js_light_1.Decimal('-0.2');
    center_image = new decimal_js_light_1.Decimal('0');
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
    for (var y = 0; y < HEIGHT; y++) {
        im = boundary.times(y - MID_HEIGHT).div(HEIGHT).plus(center_image);
        for (var x = 0; x < WIDTH; x++) {
            i++;
            re = boundary.times(x - MID_WIDTH).div(WIDTH).plus(center_real);
            if (i % percent == 0)
                console.log(i / percent + '%');
            C = new Complex(re, im);
            Zn = new Complex(re, im);
            n = 0;
            while (n < MAX_N && Zn.absolute().lt(frontier)) {
                re0 = Zn.getReal();
                im0 = Zn.getImage();
                Zn.power2();
                Zn.add(C);
                if (re0.eq(Zn.getReal()) && im0.eq(Zn.getImage()))
                    n = MAX_N;
                else
                    n++;
            }
            coor = (y * WIDTH + x) * 4;
            data[coor] = PALETTE[n][0]; // RED
            data[++coor] = PALETTE[n][1]; // GREEN
            data[++coor] = PALETTE[n][2]; // BLUE
            data[++coor] = 255; // ALPHA
        }
    }
    paint();
}
function paint() {
    ctx.putImageData(imgData, 0, 0);
    for (var x = 0; x <= WIDTH; x += 100) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 5);
        ctx.moveTo(x, HEIGHT);
        ctx.lineTo(x, HEIGHT - 5);
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
