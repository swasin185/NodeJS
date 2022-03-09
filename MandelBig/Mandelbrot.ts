import BigNumber from 'bignumber.js';
import { createCanvas } from 'canvas';
const DP = 50;
BigNumber.config({ DECIMAL_PLACES : DP});
class Complex {
    private re: BigNumber;
    private im: BigNumber;
    
    public constructor(re: BigNumber, im: BigNumber) {
        this.re = re;
        this.im = im;
    }

    public absolute(): BigNumber {
        return this.re.pow(2).plus(this.im.pow(2)).sqrt();
    }

    public add(x: Complex): void {
        this.re = this.re.plus(x.re);
        this.im = this.im.plus(x.im);
    }

    public getImage(): BigNumber {
        return this.im;
    }

    public getReal(): BigNumber {
        return this.re;
    }

    public multiply(x: Complex): void {
        let re = this.re.times(x.re).minus(this.im.times(x.im));
        let im = this.re.times(x.im).plus(this.im.times(x.re));
        this.re = re.precision(DP, BigNumber.ROUND_HALF_UP);
        this.im = im.precision(DP, BigNumber.ROUND_HALF_UP);
    }

    public power2(): void {
        this.multiply(this);
    }

    public equals(x: Complex): boolean {
        return this.re.eq(x.re) && this.im.eq(x.im);
    }
}
// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
const WIDTH = 1000;
const HEIGHT = 1000;
const MID_WIDTH = WIDTH / 2;
const MID_HEIGHT = HEIGHT / 2;

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

//const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

var imgData = ctx.createImageData(WIDTH, HEIGHT); // width x height
var data = imgData.data;

var boundary: BigNumber;
var center_real: BigNumber;
var center_image :BigNumber;
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
//paint();
calculate();
var fs = require("fs");
const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('./image.png', buffer)

// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    console.log('calculate');
    let time: number = (new Date()).getTime();
    boundary = new BigNumber('0.01');
    center_real = new BigNumber('-1.01');
    center_image = new BigNumber('-0.3165');

    let frontier = 2;
    let C: Complex;
    let Zn: Complex;
    let im: BigNumber;
    let re: BigNumber;
    let n: number = 0;
    let coor = 0;
    let im0: BigNumber;
    let re0: BigNumber;
    let percent = Math.round(WIDTH * HEIGHT / 100);
    let i = 0;
    for (let y = 0; y < HEIGHT; y++) {
        im = boundary.times(y - MID_HEIGHT).div(HEIGHT).plus(center_image);
        for (let x = 0; x < WIDTH; x++) {
            i++;
            re = boundary.times(x - MID_WIDTH).div(WIDTH).plus(center_real);
            if (i % percent == 0)
                console.log(i / percent + '%');
            C = new Complex(re, im);
            Zn = new Complex(re, im);
            n = 1;
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
            n--;
            coor = (y * WIDTH + x) * 4;
            data[coor] = PALETTE[n][0]; // RED
            data[++coor] = PALETTE[n][1]; // GREEN
            data[++coor] = PALETTE[n][2]; // BLUE
            data[++coor] = 255; // ALPHA
        }
    }
    paint();
    time = (new Date()).getTime() - time;
    console.log("run time =", time / 1000.0, "seconds")
}

function paint(): void {
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
