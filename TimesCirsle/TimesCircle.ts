const cv: any = document.getElementById("canvas") as HTMLCanvasElement;
const cx: any = cv.getContext("2d") as CanvasRenderingContext2D;
const timesTextBox = document.getElementById("timesTextBox") as HTMLInputElement;

const PI2 = Math.PI * 2;

const x0 = Math.floor(cv.width / 2);
const y0 = Math.floor(cv.height / 2);
let n = 360;
let pointX: number[] = new Array(n);
let pointY: number[] = new Array(n);


let angle = 0;
for (let i = 0; i < n; i++) {
    angle = PI2 * (i / n);
    pointX[i] = x0 + x0 * Math.cos(angle);
    pointY[i] = x0 - x0 * Math.sin(angle);
}

paint();

function line(a: number, b: number) {
    a = a % n;
    b = b % n;
    cx.beginPath();
    cx.moveTo(pointX[a], pointY[a]);
    cx.lineTo(pointX[b], pointY[b]);
    cx.closePath();
    cx.stroke();
}

function paint() {
    let times = Number(timesTextBox.value);
    cx.clearRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < n; i++)
        line(i, i * times);
}
