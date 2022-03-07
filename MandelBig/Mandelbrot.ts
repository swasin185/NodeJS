import Big from "big.js";
import Complex from "./Complex.js";
// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
const canvas = document.getElementById("cpxCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const boxReal = document.getElementById("realValue") as HTMLInputElement;
const boxImage = document.getElementById("imageValue") as HTMLInputElement;
const boxBoundary = document.getElementById("boundary") as HTMLInputElement;
const txtRunTime = document.getElementById("runTime") as HTMLLabelElement;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const MID_WIDTH = canvas.width / 2;
const MID_HEIGHT = canvas.height / 2;

const MAX_N = 51;
const PALETTE: number[][] = new Array(MAX_N);
let level = 0;
let x = Math.floor(Math.random() * 3);
for (let i = 0; i < MAX_N; i++) {
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
var center: Complex;
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
paint();
calculate();

// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    console.log('calculate');
    let time: number = (new Date()).getTime();
    boundary = new Big(boxBoundary.value);
    center_real = new Big(boxReal.value);
    center_image = new Big(boxImage.value);
    center = new Complex(center_real, center_image);

    let frontier = 2;
    let C: Complex = new Complex(new Big(-0.5), new Big(-0.5));
    let Zn: Complex;
    let im;
    let re;
    let n: number = 0;
    let coor: number = 0;
    let Z0: Complex;
    let percent = Math.round(WIDTH * HEIGHT / 100);
    let i = 0;
    for (let y = 0; y < HEIGHT; y++) {
        im = boundary.times(y - MID_HEIGHT).div(HEIGHT).add(center_image);
        for (let x = 0; x < WIDTH; x++) {
            i++;
            if (i % percent == 0)
                console.log(i / percent + ' %');
            re = boundary.times(x - MID_WIDTH).div(WIDTH).add(center_real);
            C = new Complex(re, im);
            Zn = new Complex(re, im);
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

function clickXY(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
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
    for (let x = 0; x <= WIDTH; x += 100) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 5);
        ctx.moveTo(x, HEIGHT);
        ctx.lineTo(x, HEIGHT - 5);
    }
    for (let y = 0; y <= HEIGHT; y += 100) {
        ctx.moveTo(0, y);
        ctx.lineTo(5, y);
        ctx.moveTo(WIDTH, y);
        ctx.lineTo(WIDTH - 5, y);
    }
    ctx.moveTo(MID_WIDTH - 5, MID_HEIGHT)
    ctx.lineTo(MID_WIDTH + 5, MID_HEIGHT);
    ctx.moveTo(MID_WIDTH, MID_HEIGHT - 5)
    ctx.lineTo(MID_WIDTH, MID_HEIGHT + 5);
    ctx.stroke();
}

