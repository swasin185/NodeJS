import BigNumber from 'bignumber.js';
import { createCanvas } from 'canvas';
const DP = 20;
BigNumber.config({ DECIMAL_PLACES : DP, POW_PRECISION : DP, ROUNDING_MODE : BigNumber.ROUND_HALF_UP});
class Complex {
    private re: BigNumber;
    private im: BigNumber;
    
    public constructor(re: BigNumber, im: BigNumber) {
        this.re = re;
        this.im = im;
    }

    public absolute(): BigNumber {
        return this.re.pow(2).plus(this.im.pow(2));
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
        this.re = re.sd(DP);
        this.im = im.sd(DP);
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

const MAX_N = 500;
const PALETTE: number[][] = new Array(MAX_N);
for (let i = 0; i <= MAX_N; i++) {
    PALETTE[i] = new Array(3);
    PALETTE[i][0] = (i * 35) % 250;
    PALETTE[i][1] = (i * 20) % 200;
    PALETTE[i][2] = (i * 10) % 250;
}

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

var imgData = ctx.createImageData(WIDTH, HEIGHT); // width x height
var data = imgData.data;

var boundary: BigNumber;
var center_real: BigNumber;
var center_image :BigNumber;
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
let time: number = (new Date()).getTime();
calculate();
time = (new Date()).getTime() - time;
console.log("run time =", Math.round(time / 1000.0), "seconds")
ctx.putImageData(imgData, 0, 0);
var fs = require("fs");
const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('./big'+DP+'-'+Math.round(time / 1000.0)+'.png', buffer)

// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    console.log('calculate');
    boundary = new BigNumber('1E-8'); 
    //center_real = new BigNumber('-1.7900011049');
    //center_image = new BigNumber('1E-10');
    center_real = new BigNumber('-1.19067');
    center_image = new BigNumber('0.242035');
    let frontier = 2 * 2;
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
    let step: BigNumber = boundary.div(WIDTH);
    let bound2 = boundary.div(2);
    center_real = center_real.minus(bound2);
    center_image = center_image.times(-1);
    center_image = center_image.minus(bound2);    
    im = center_image;
    for (let y = 0; y < HEIGHT; y++) {
        re = center_real;
        for (let x = 0; x < WIDTH; x++) {
            i++;
            if (i % percent == 0) {
                console.log(i / percent + '%', Math.round(((new Date()).getTime() - time) / 1000.0), "sec");
            }
            C = new Complex(re, im);
            Zn = new Complex(re, im);
            n = 0;
            re0 = null;
            im0 = null;
            while (n < MAX_N && Zn.absolute().lt(frontier) && 
                   (re0 == null || !(Zn.getReal().eq(re0) && Zn.getImage().eq(im0)))) {
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
            re = re.plus(step);
        }
        im = im.plus(step);
    }
}