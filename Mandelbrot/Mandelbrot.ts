/* Class ---------------------------------------------------------------------*/
class ComplexNumber {
    private re: number;
    private im: number;
    public constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
    }
    public absolute(): number {
        // return Math.hypot(this.re, this.im);
        return this.re * this.re + this.im * this.im; 
    }

    public add(x: ComplexNumber): void {
        this.re = this.re + x.re;
        this.im = this.im + x.im;
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
        this.re = re;
        this.im = im;
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

const MAX_N = 500;
const PALETTE: number[][] = new Array(MAX_N);
for (let i = 0; i <= MAX_N; i++) {
    PALETTE[i] = new Array(3);
    PALETTE[i][0] = (i * 35) % 250;
    PALETTE[i][1] = (i * 20) % 200;
    PALETTE[i][2] = (i * 10) % 250;
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
    center_image = -Number(boxImage.value);
    center = new ComplexNumber(center_real, center_image);

    let frontier = 2 * 2;
    let cr = center_real - boundary / 2;
    let ci = center_image - boundary / 2;
    let C: ComplexNumber;
    let Zn: ComplexNumber;
    let im: number;
    let re: number;
    let n: number = 0;
    let coor = 0;
    let im0: number;
    let re0: number;
    let i = 0;
    let step = boundary / WIDTH;
    im = ci;
    for (let y = 0; y < HEIGHT; y++) {
        re = cr;
        for (let x = 0; x < WIDTH; x++) {
            i++;
            C = new ComplexNumber(re, im);
            Zn = new ComplexNumber(re, im);
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
    paint();
    time = (new Date()).getTime() - time;
    txtRunTime.innerHTML = "run time = " + time / 1000.0 + " seconds";
    //console.log("run time =", time / 1000.0, "seconds")
}

function clickXY(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
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

