"use strict";
exports.__esModule = true;
var big_js_1 = require("big.js");
var Complex_js_1 = require("./Complex.js");
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
var level = 0;
var x = Math.floor(Math.random() * 3);
for (var i = 0; i < MAX_N; i++) {
    PALETTE[i] = new Array(3);
    level = i * 5;
    PALETTE[i][x + i % 3] = level;
    PALETTE[i][(x + i + 1) % 3] = Math.floor(Math.random() * level / 2 + level / 2);
    PALETTE[i][(x + i + 2) % 3] = Math.floor(Math.random() * level / 2 + level / 2);
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
// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    console.log('calculate');
    var time = (new Date()).getTime();
    boundary = new big_js_1["default"](boxBoundary.value);
    center_real = new big_js_1["default"](boxReal.value);
    center_image = new big_js_1["default"](boxImage.value);
    center = new Complex_js_1["default"](center_real, center_image);
    var frontier = 2;
    var C = new Complex_js_1["default"](new big_js_1["default"](-0.5), new big_js_1["default"](-0.5));
    var Zn;
    var im;
    var re;
    var n = 0;
    var coor = 0;
    var Z0;
    var percent = Math.round(WIDTH * HEIGHT / 100);
    var i = 0;
    for (var y = 0; y < HEIGHT; y++) {
        im = boundary.times(y - MID_HEIGHT).div(HEIGHT).add(center_image);
        for (var x_1 = 0; x_1 < WIDTH; x_1++) {
            i++;
            if (i % percent == 0)
                console.log(i / percent + ' %');
            re = boundary.times(x_1 - MID_WIDTH).div(WIDTH).add(center_real);
            C = new Complex_js_1["default"](re, im);
            Zn = new Complex_js_1["default"](re, im);
            n = 1;
            while (n < MAX_N && Zn.absolute().lt(frontier)) {
                Z0 = Zn;
                Zn.power2();
                Zn.add(C);
                if (Zn.equals(Z0))
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
    //console.log(data)
    paint();
    time = (new Date()).getTime() - time;
    txtRunTime.innerHTML = "run time = " + time / 1000.0 + " seconds";
    //console.log("run time =", time / 1000.0, "seconds")
}
function clickXY(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    boxReal.value = String(center_real.add(boundary.times(x - MID_WIDTH).div(WIDTH)));
    boxImage.value = String(center_image.add(boundary.times(y - MID_HEIGHT).div(HEIGHT)));
    if (event.button == 0)
        boundary = boundary.div(2);
    else
        boundary = boundary.times(2);
    boxBoundary.value = boundary.toFixed(50);
    calculate();
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
