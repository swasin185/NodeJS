/* Class ---------------------------------------------------------------------*/
var ComplexNumber = /** @class */ (function () {
    function ComplexNumber(re, im) {
        this.re = 0.0;
        this.im = 0.0;
        this.re = re;
        this.im = im;
    }
    ComplexNumber.prototype.absolute = function () {
        return Math.hypot(this.re, this.im); // to too complicated for Mandelbrot
        //return Math.abs(this.re) + Math.abs(this.im);
    };
    ComplexNumber.prototype.add = function (x) {
        this.re = Math.round((this.re + x.re) * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
        this.im = Math.round((this.im + x.im) * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
    };
    ComplexNumber.prototype.getImage = function () {
        return this.im;
    };
    ComplexNumber.prototype.getReal = function () {
        return this.re;
    };
    ComplexNumber.prototype.multiply = function (x) {
        var re = (this.re * x.re) - (this.im * x.im);
        var im = (this.re * x.im) + (this.im * x.re);
        this.re = Math.round(re * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
        this.im = Math.round(im * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
    };
    ComplexNumber.prototype.power2 = function () {
        this.multiply(this);
    };
    ComplexNumber.PRECISION = 1E16;
    return ComplexNumber;
}());
// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
var canvas = document.getElementById("cpxCanvas");
var ctx = canvas.getContext("2d");
var boxReal = document.getElementById("realValue");
var boxImage = document.getElementById("imageValue");
var boxBoundary = document.getElementById("boundary");
var txtRunTime = document.getElementById("runTime");
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var MID_WIDTH = canvas.width / 2;
var MID_HEIGHT = canvas.height / 2;
var MAX_N = 51;
var PALETTE = new Array(MAX_N);
for (var i = 0; i < 10; i++) {
    PALETTE[i] = new Array(3);
    PALETTE[i][0] = i * 10; // Red
    PALETTE[i][1] = PALETTE[i][0]; // Blue
    PALETTE[i][2] = PALETTE[i][0]; // Green
}
for (var i = 10; i < PALETTE.length; i++) {
    PALETTE[i] = new Array(3);
    PALETTE[i][0] = Math.floor(Math.random() * 255); // Red
    PALETTE[i][1] = Math.floor(Math.random() * 255); // Blue
    PALETTE[i][2] = Math.floor(Math.random() * 255); // Green
}
//console.log(PALETTE);
var imgData = ctx.createImageData(WIDTH, HEIGHT); // width x height
var data = imgData.data;
var boundary;
var center_real;
var center_image;
var center;
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
calculate();
// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    var time = (new Date()).getTime();
    boundary = Number(boxBoundary.value);
    center_real = Number(boxReal.value);
    center_image = Number(boxImage.value);
    center = new ComplexNumber(center_real, center_image);
    var C;
    var Zn;
    var im;
    var re;
    var n = 0;
    var coor = 0;
    for (var y = 0; y < HEIGHT; y++) {
        im = Math.round((y - MID_HEIGHT) * boundary / HEIGHT * ComplexNumber.PRECISION) / ComplexNumber.PRECISION + center_image;
        for (var x = 0; x < WIDTH; x++) {
            re = Math.round((x - MID_WIDTH) * boundary / WIDTH * ComplexNumber.PRECISION) / ComplexNumber.PRECISION + center_real;
            C = new ComplexNumber(re, im);
            //  C.add(center);
            var re0 = C.getReal();
            var im0 = C.getImage();
            Zn = new ComplexNumber(re0, im0);
            n = 1;
            while (n < MAX_N && Zn.absolute() < Math.PI) {
                Zn.power2();
                Zn.add(C);
                if (Zn.getReal() == re0 && Zn.getImage() == im0)
                    n = MAX_N;
                else
                    n++;
                re0 = Zn.getReal();
                im0 = Zn.getImage();
            }
            n--;
            coor = (y * WIDTH + x) * 4;
            data[coor] = PALETTE[n][0]; // RED
            data[++coor] = PALETTE[n][1]; // GREEN
            data[++coor] = PALETTE[n][2]; // BLUE
            data[++coor] = 255; // ALPHA
        }
    }
    //console.log(data)
    paint();
    time = (new Date()).getTime() - time;
    txtRunTime.innerHTML = "run time = " + time / 1000.0 + " seconds";
    //console.log("run time =", time / 1000.0, "seconds")
}
function clickXY(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    //console.log(center_real + " + " + center_image + "i");
    boxReal.value = String(center_real + Math.round((x - MID_WIDTH) * boundary / WIDTH * ComplexNumber.PRECISION) / ComplexNumber.PRECISION);
    boxImage.value = String(center_image - -Math.round((y - MID_HEIGHT) * boundary / HEIGHT * ComplexNumber.PRECISION) / ComplexNumber.PRECISION);
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
