import  Decimal  from 'decimal.js-light';
import  { createCanvas }  from 'canvas';
const DP = 20;
Decimal.config({ precision : DP });
class Complex {
    private re: Decimal;
    private im: Decimal;
    
    public constructor(re: Decimal, im: Decimal) {
        this.re = re;
        this.im = im;
    }

    public absolute(): Decimal {
        return this.re.pow(2).plus(this.im.pow(2));
    }

    public add(x: Complex): void {
        this.re = this.re.plus(x.re);
        this.im = this.im.plus(x.im);
    }

    public getImage(): Decimal {
        return this.im;
    }

    public getReal(): Decimal {
        return this.re;
    }

    public multiply(x: Complex): void {
        let re = this.re.times(x.re).minus(this.im.times(x.im));
        let im = this.re.times(x.im).plus(this.im.times(x.re));
        this.re = re;
        this.im = im;
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

const MAX_N = 1000;
const PALETTE: number[][] = new Array(MAX_N);
for (let i = 0; i <= MAX_N; i++) {
    PALETTE[i] = new Array(3);
    PALETTE[i][0] = (i * 3 % 255);
    PALETTE[i][1] = (i * 59 % 255);
    PALETTE[i][2] = (i * 27 % 255);
}

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

var imgData = ctx.createImageData(WIDTH, HEIGHT); // width x height
var data = imgData.data;

var boundary: Decimal;
var center_real: Decimal;
var center_image :Decimal;
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
let time: number = (new Date()).getTime();
calculate();
time = (new Date()).getTime() - time;
console.log("run time =", Math.round(time / 1000.0), "seconds")
var fs = require("fs");
const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('./dec'+DP+'-'+Math.round(time / 1000.0)+'.png', buffer)

// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    console.log('calculate');

    boundary = new Decimal('1');
    center_real = new Decimal('-0.2');
    center_image = new Decimal('0');

    let frontier = 2 * 2;
    let C: Complex;
    let Zn: Complex;
    let im: Decimal;
    let re: Decimal;
    let n: number = 0;
    let coor = 0;
    let im0: Decimal;
    let re0: Decimal;
    let percent = Math.round(WIDTH * HEIGHT / 100);
    let i = 0;
    for (let y = 0; y < HEIGHT; y++) {
        im = boundary.times(y - MID_HEIGHT).div(HEIGHT).plus(center_image);
        for (let x = 0; x < WIDTH; x++) {
            i++;
            re = boundary.times(x - MID_WIDTH).div(WIDTH).plus(center_real);
            if (i % percent == 0) 
                console.log(i / percent + '%' );
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
