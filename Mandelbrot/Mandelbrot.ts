/* Class ---------------------------------------------------------------------*/
class ComplexNumber {
    public static PRECISION: number = 1E16;
    private re: number = 0.0;
    private im: number = 0.0;
    public constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
    }
    public absolute(): number {
        return Math.hypot(this.re, this.im); // to too complicated for Mandelbrot
        //return Math.abs(this.re) + Math.abs(this.im);
    }

    public add(x: ComplexNumber): void {
        this.re = Math.round((this.re + x.re) * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
        this.im = Math.round((this.im + x.im) * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
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

for (let i = 0; i < 10; i++) {
    PALETTE[i] = new Array(3);
    PALETTE[i][0] = i * 10; // Red
    PALETTE[i][1] = PALETTE[i][0]; // Blue
    PALETTE[i][2] = PALETTE[i][0]; // Green
}
for (let i = 10; i < PALETTE.length; i++) {
    PALETTE[i] = new Array(3);
    PALETTE[i][0] = Math.floor(Math.random() * 255); // Red
    PALETTE[i][1] = Math.floor(Math.random() * 255); // Blue
    PALETTE[i][2] = Math.floor(Math.random() * 255); // Green
}
//console.log(PALETTE);

var imgData = ctx.createImageData(WIDTH, HEIGHT); // width x height
var data = imgData.data;

var boundary: number;
var center_real: number;
var center_image: number;
var center: ComplexNumber;

// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
calculate();

// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    let time: number = (new Date()).getTime();
    boundary = Number(boxBoundary.value);
    center_real = Number(boxReal.value);
    center_image = Number(boxImage.value);
    center = new ComplexNumber(center_real, center_image);

    let frontier = 2;
    let C: ComplexNumber;
    let Zn: ComplexNumber;
    let im: number;
    let re: number;
    let n: number = 0;
    let coor: number = 0;
    for (let y = 0; y < HEIGHT; y++) {
        im = Math.round((y - MID_HEIGHT) * boundary / HEIGHT * ComplexNumber.PRECISION) / ComplexNumber.PRECISION + center_image;
        for (let x = 0; x < WIDTH; x++) {
            re = Math.round((x - MID_WIDTH) * boundary / WIDTH * ComplexNumber.PRECISION) / ComplexNumber.PRECISION + center_real;
            C = new ComplexNumber(re, im);
            //C.add(center);
            let re0 = C.getReal();
            let im0 = C.getImage();
            Zn = new ComplexNumber(re0, im0);
            n = 1;
            while (n < MAX_N && Zn.absolute() < frontier) {
                Zn.power2();
                Zn.add(C);
                if (Zn.getReal() == re0 && Zn.getImage() == im0)
                    n = MAX_N;
                else
                    n++;
                re0 = Zn.getReal();
                im0 = Zn.getImage();
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
    paint();
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
