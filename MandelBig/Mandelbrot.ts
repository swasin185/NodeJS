import { createCanvas } from 'canvas';
class Complex {
    private re: number;
    private im: number;
    public constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
    }
    public absolute(): number {
        return this.re * this.re + this.im * this.im; 
    }

    public add(x: Complex): void {
        this.re = this.re + x.re;
        this.im = this.im + x.im;
    }

    public getImage(): number {
        return this.im;
    }
    public getReal(): number {
        return this.re;
    }

    public multiply(x: Complex): void {
        let re = (this.re * x.re) - (this.im * x.im);
        let im = (this.re * x.im) + (this.im * x.re);
        this.re = re;
        this.im = im;
    }

    public power2(): void {
        this.multiply(this);
    }
}
// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
const SIZE = 500;
const WIDTH = SIZE;
const HEIGHT = SIZE;

const MAX_N = 500;
const PALETTE: number[][] = new Array(MAX_N);
for (let i = 0; i <= MAX_N; i++) {
    PALETTE[i] = new Array(3);
        PALETTE[i][0] = (i * 5 % 250);
        PALETTE[i][1] = (i * 25 % 250);
        PALETTE[i][2] = Math.round(((MAX_N - i) / MAX_N) * 250);
}

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

var fs = require("fs");

// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
let time: number = (new Date()).getTime();
let scale = 1;
for (let i=0; i<30; i++) {
    //calculate(scale, -1.79000110500048, 1E-10);
    calculate(scale, -1.2580731154780158, 0.03749802859538307);
    scale /= 1.618034;
}
time = (new Date()).getTime() - time;
console.log("run time =", Math.round(time / 1000.0), "seconds")

// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate(boundary: number, center_real: number, center_image: number) {
    var imgData = ctx.createImageData(WIDTH, HEIGHT); // width x height
    var data = imgData.data;
    console.log('calculate ' + boundary.toFixed(15));
    let frontier = 2 * 2;
    center_real -= boundary / 2;
    center_image = -center_image;
    center_image -= boundary / 2;
    let C: Complex;
    let Zn: Complex;
    let im: number;
    let re: number;
    let n: number = 0;
    let coor = 0;
    let im0: number;
    let re0: number;
    let i = 0;
    let step = boundary / SIZE;
    im = center_image;
    for (let y = 0; y < HEIGHT; y++) {
        re = center_real;
        for (let x = 0; x < WIDTH; x++) {
            i++;
            C = new Complex(re, im);
            Zn = new Complex(re, im);
            n = 0;
            re0 = null;
            im0 = null;
            while (n < MAX_N && Zn.absolute()<frontier && !(re0 == Zn.getReal() && im0 == Zn.getImage())) {
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
    const buffer = canvas.toBuffer('image/jpeg')
    fs.writeFileSync('./mandel-'+boundary.toFixed(15)+'.jpg', buffer)
}