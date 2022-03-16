"use strict";
exports.__esModule = true;
var canvas_1 = require("canvas");
var Complex = /** @class */ (function () {
    function Complex(re, im) {
        this.re = re;
        this.im = im;
    }
    Complex.prototype.absolute = function () {
        return this.re * this.re + this.im * this.im;
    };
    Complex.prototype.add = function (x) {
        this.re = this.re + x.re;
        this.im = this.im + x.im;
    };
    Complex.prototype.getImage = function () {
        return this.im;
    };
    Complex.prototype.getReal = function () {
        return this.re;
    };
    Complex.prototype.multiply = function (x) {
        var re = (this.re * x.re) - (this.im * x.im);
        var im = (this.re * x.im) + (this.im * x.re);
        this.re = re;
        this.im = im;
    };
    Complex.prototype.power2 = function () {
        this.multiply(this);
    };
    return Complex;
}());
// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
var SIZE = 500;
var WIDTH = SIZE;
var HEIGHT = SIZE;
var MAX_N = 500;
var PALETTE = new Array(MAX_N);
for (var i = 0; i <= MAX_N; i++) {
    PALETTE[i] = new Array(3);
    PALETTE[i][0] = (i * 5 % 250);
    PALETTE[i][1] = (i * 25 % 250);
    PALETTE[i][2] = Math.round(((MAX_N - i) / MAX_N) * 250);
}
var canvas = (0, canvas_1.createCanvas)(WIDTH, HEIGHT);
var ctx = canvas.getContext('2d');
var fs = require("fs");
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
var time = (new Date()).getTime();
var scale = 1;
for (var i = 0; i < 30; i++) {
    //calculate(scale, -1.79000110500048, 1E-10);
    calculate(scale, -1.2580731154780158, 0.03749802859538307);
    scale /= 1.618034;
}
time = (new Date()).getTime() - time;
console.log("run time =", Math.round(time / 1000.0), "seconds");
// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate(boundary, center_real, center_image) {
    var imgData = ctx.createImageData(WIDTH, HEIGHT); // width x height
    var data = imgData.data;
    console.log('calculate ' + boundary.toFixed(15));
    var frontier = 2 * 2;
    center_real -= boundary / 2;
    center_image = -center_image;
    center_image -= boundary / 2;
    var C;
    var Zn;
    var im;
    var re;
    var n = 0;
    var coor = 0;
    var im0;
    var re0;
    var i = 0;
    var step = boundary / SIZE;
    im = center_image;
    for (var y = 0; y < HEIGHT; y++) {
        re = center_real;
        for (var x = 0; x < WIDTH; x++) {
            i++;
            C = new Complex(re, im);
            Zn = new Complex(re, im);
            n = 0;
            re0 = null;
            im0 = null;
            while (n < MAX_N && Zn.absolute() < frontier && !(re0 == Zn.getReal() && im0 == Zn.getImage())) {
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
            re += step;
        }
        im += step;
    }
    ctx.putImageData(imgData, 0, 0);
    var buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync('./mandel-' + boundary.toFixed(15) + '.jpg', buffer);
}
