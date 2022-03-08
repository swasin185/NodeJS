import Big from 'big.js';
import { createCanvas, loadImage } from 'canvas';

Big.DP = 20;
class Complex {
    private re: Big;
    private im: Big;
    
    public constructor(re: Big, im: Big) {
        this.re = re;
        this.im = im;
    }

    public absolute(): Big {
        return this.re.pow(2).add(this.im.pow(2)).sqrt();
    }

    public add(x: Complex): void {
        this.re = this.re.add(x.re);
        this.im = this.im.add(x.im);
    }

    public getImage(): Big {
        return this.im;
    }

    public getReal(): Big {
        return this.re;
    }

    public multiply(x: Complex): void {
        let re = this.re.times(x.re).minus(this.im.times(x.im));
        let im = this.re.times(x.im).add(this.im.times(x.re));
        this.re = re.round(Big.DP, Big.roundHalfUp);
        this.im = im.round(Big.DP, Big.roundHalfUp);
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

var boundary;
var center_real;
var center_image;
var center: Complex;
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
    boundary = new Big(3);
    center_real = new Big(-0.75);
    center_image = new Big(0);
    center = new Complex(center_real, center_image);

    let frontier = 2;
    let C: Complex = new Complex(new Big(-0.5), new Big(-0.5));
    let Zn: Complex;
    let im;
    let re;
    let n: number = 0;
    let coor: number = 0;
    let im0;
    let re0;
    let percent = Math.round(WIDTH * HEIGHT / 100);
    let i = 0;
    for (let y = 0; y < HEIGHT; y++) {
        im = boundary.times(y - MID_HEIGHT).div(HEIGHT).add(center_image);
        for (let x = 0; x < WIDTH; x++) {
            i++;
            re = boundary.times(x - MID_WIDTH).div(WIDTH).add(center_real);
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
