/* Class ---------------------------------------------------------------------*/
class ComplexNumber {
    public static PRECISION: number = 1E12;
    private re = 0;
    private im = 0;
    public constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
        // this.re = new Big(re);
        // this.im = new Big(im);
    }
    public absolute(): number {
        // return this.re.pow(2).add(this.im.pow(2)).sqrt().toNumber();
        // return this.re.abs().add(this.im.abs()).toNumber();
        return Math.hypot(this.re, this.im); // to too complicated for Mandelbrot
        // return Math.abs(this.re) + Math.abs(this.im); // too easy
    }

    public add(x: ComplexNumber): void {
        this.re = Math.round((this.re + x.re) * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
        this.im = Math.round((this.im + x.im) * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
        // this.re = this.re.add(x.re);
        // this.im = this.im.add(x.im);
    }

    public getImage(): number {
        return this.im;
    }
    public getReal(): number {
        return this.re;
    }

    public multiply(x: ComplexNumber): void {
        let re = (this.re * x.re) - (this.im * x.im);
        let im = (this.re * x.im) + (this.im * x.re);
        this.re = Math.round(re * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
        this.im = Math.round(im * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
        // this.re = this.re.mul(x.re).minus(this.im.mul(x.im));
        // this.im = this.re.mul(x.im).add(this.im.mul(x.re));
    }

    public power2(): void {
        this.multiply(this);
    }
}

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

var boundary: number;
var center_real: number;
var center_image: number;
var center: ComplexNumber;

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
    let time: number = (new Date()).getTime();
    boundary = Number(boxBoundary.value);
    center_real = Number(boxReal.value);
    center_image = Number(boxImage.value);
    center = new ComplexNumber(center_real, center_image);

    let frontier = Math.PI;
    let C: ComplexNumber = new ComplexNumber(-0.5, -0.5);
    let Zn: ComplexNumber;
    let im: number;
    let re: number;
    let n: number = 0;
    let coor: number = 0;
    let re0 = 0;
    let im0 = 0;

    for (let y = 0; y < HEIGHT; y++) {
        im = Math.round((y - MID_HEIGHT) * boundary / HEIGHT * ComplexNumber.PRECISION) / ComplexNumber.PRECISION + center_image;
        console.log(y / HEIGHT * 100, '%');
        for (let x = 0; x < WIDTH; x++) {
            re = Math.round((x - MID_WIDTH) * boundary / WIDTH * ComplexNumber.PRECISION) / ComplexNumber.PRECISION + center_real;
            C = new ComplexNumber(re, im);
            Zn = new ComplexNumber(re, im);
            n = 1;
            while (n < MAX_N && Zn.absolute() < frontier) {
                re0 = Zn.getReal();
                im0 = Zn.getImage();
                Zn.power2();
                Zn.add(C);
                if (Zn.getReal() == re0 && Zn.getImage() == im0)
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
    //console.log(center_real + " + " + center_image + "i");
    boxReal.value = String(center_real + Math.round((x - MID_WIDTH) * boundary / WIDTH * ComplexNumber.PRECISION) / ComplexNumber.PRECISION);
    boxImage.value = String(center_image - -Math.round((y - MID_HEIGHT) * boundary / HEIGHT * ComplexNumber.PRECISION) / ComplexNumber.PRECISION);
    if (event.button == 0)
        boundary /= 10;
    else
        boundary *= 10;
    boxBoundary.value = String(boundary);
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

