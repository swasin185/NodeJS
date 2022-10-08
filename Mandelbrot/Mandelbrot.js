/* Class ---------------------------------------------------------------------*/
var ComplexNumber = /** @class */ (function () {
    function ComplexNumber(re, im) {
        this.re = re;
        this.im = im;
    }
    ComplexNumber.prototype.absolute = function () {
        // return Math.hypot(this.re, this.im);
        return this.re * this.re + this.im * this.im;
    };
    ComplexNumber.prototype.add = function (x) {
        this.re = this.re + x.re;
        this.im = this.im + x.im;
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
        this.re = re;
        this.im = im;
    };
    ComplexNumber.prototype.power2 = function () {
        this.multiply(this);
    };
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
var MAX_N = 500;
var PALETTE = new Array(MAX_N);
for (var i = 0; i <= MAX_N; i++) {
    PALETTE[i] = new Array(3);
    PALETTE[i][0] = (i * 35) % 250;
    PALETTE[i][1] = (i * 20) % 200;
    PALETTE[i][2] = (i * 10) % 250;
}
var imgData = ctx.createImageData(WIDTH, HEIGHT); // width x height
var data = imgData.data;
var boundary;
var center_real;
var center_image;
var center;
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
paint();
calculate();
// var bigA = new Big(1e-20);
// var bigB= new Big(2e-21);
// var bigC = bigA.add(bigB);
// console.log(bigA.toString(), '+', bigB.toString(), '=', bigC.toString())
// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    console.log('calculate');
    var time = (new Date()).getTime();
    boundary = Number(boxBoundary.value);
    center_real = Number(boxReal.value);
    center_image = -Number(boxImage.value);
    center = new ComplexNumber(center_real, center_image);
    var frontier = 2 * 2;
    var cr = center_real - boundary / 2;
    var ci = center_image - boundary / 2;
    var C;
    var Zn;
    var im;
    var re;
    var n = 0;
    var coor = 0;
    var im0;
    var re0;
    var i = 0;
    var step = boundary / WIDTH;
    im = ci;
    for (var y = 0; y < HEIGHT; y++) {
        re = cr;
        for (var x = 0; x < WIDTH; x++) {
            i++;
            C = new ComplexNumber(re, im);
            Zn = new ComplexNumber(re, im);
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
    paint();
    time = (new Date()).getTime() - time;
    txtRunTime.innerHTML = "run time = " + time / 1000.0 + " seconds";
    //console.log("run time =", time / 1000.0, "seconds")
}
function clickXY(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    boxReal.value = String(center_real + (x - MID_WIDTH) * boundary / WIDTH);
    boxImage.value = String(-center_image - (y - MID_HEIGHT) * boundary / HEIGHT);
    if (event.button == 0)
        boundary /= 1.618034;
    else
        boundary *= 1.618034;
    boxBoundary.value = String(boundary);
    calculate();
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
