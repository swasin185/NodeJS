// Class 
class Ball {
    public x: number;
    public y: number;
    public radius: number = 10;
    public paint() {
        cx.shadowBlur = 10;
        cx.shadowColor = "Grey";
        cx.fillStyle = "White";
        cx.beginPath()
        cx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        cx.closePath();
        cx.fill();
    }
}

class Pin {
    private x: number;
    private y: number;
}

class Box {
    private x: number;
    private y: number;
    private size: number;
}

// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
const cv = document.getElementById("cpxCanvas") as HTMLCanvasElement;
const cx = cv.getContext("2d") as CanvasRenderingContext2D;
const boardSize = document.getElementById("boardSize") as HTMLInputElement;
const txtRunTime = document.getElementById("runTime") as HTMLLabelElement;

const WIDTH = cv.width;
const HEIGHT = cv.height;
const MID_WIDTH = cv.width / 2;
const MID_HEIGHT = cv.height / 2;

var imgData = cx.createImageData(WIDTH, HEIGHT); // width x height
var data = imgData.data;

var n = 10;

var ball = new Ball();
ball.x = WIDTH / 2;
ball.y = 20;

// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
calculate();

// ฟังก์ชั่น
// ----------------------------------------------------------------------------
async function calculate() {
    paint();
    for (let i = 0; i < 150; i++) {
        ball.y += 5;
        //ball.paint();
        paint();
        await new Promise(r => setTimeout(r, 10));
    }
}

function clickXY(event: MouseEvent) {
    ball.x = event.offsetX;
    ball.y = event.offsetY;
    paint();
}

function paint() {
    n = Number(boardSize.value);
    cx.clearRect(0, 0, cv.width, cv.height);
    let x = MID_WIDTH;
    let y = 10;
    let size = 50;
    cx.fillStyle = "Blue";
    cx.shadowBlur = 10;
    cx.shadowColor = "Grey";
    let mid = size / 2;
    for (let i = 0; i < n; i++) {
        x = MID_WIDTH - (i * mid);
        cx.beginPath();
        cx.arc(x - mid, y + size, 5, 0, 2 * Math.PI);
        cx.closePath();
        cx.fill();
        for (let j = 0; j <= i; j++) {
            // cx.beginPath();
            // cx.fillStyle = "Orange";
            // cx.shadowBlur = 0;
            // cx.moveTo(x, y);
            // cx.lineTo(x + mid, y + size);
            // cx.lineTo(x - mid, y + size);
            // cx.closePath();
            // cx.fill();

            cx.beginPath()
            cx.arc(x + mid, y + size, 5, 0, 2 * Math.PI);
            cx.closePath();
            cx.fill();
            // cx.beginPath();
            // cx.moveTo(x - mid, y + size);
            // cx.lineTo(x - mid, y + mid - 5);
            // cx.lineTo(x, y);
            // cx.moveTo(x + mid, y + size);
            // cx.lineTo(x + mid, y + mid - 5);
            // cx.lineTo(x, y);
            // cx.stroke();
            x += size;

        }
        y += size;
    }
    ball.paint();
}
