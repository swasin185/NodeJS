const cv = document.getElementById("cpxCanvas") as HTMLCanvasElement;
const cx = cv.getContext("2d") as CanvasRenderingContext2D;
const WIDTH = cv.width;
const HEIGHT = cv.height;
const MID_WIDTH = cv.width / 2;
const MID_HEIGHT = cv.height / 2;

const COLORS = ['magenta', 'cyan', 'blue', 'green', 'yellow', 'orange', 'red'];
const PI2 = Math.PI * 2;

class Ball {
    x: number;              // horizontal position
    y: number;              // vertical position
    dx: number;
    dy: number;
    radius: number = 5;     // pixel 
    speed: number = 5;      // pixel per frame
    direction: number = 1;  // radian
    color: string = 'Grey'; // color name
    radiusPower2: number;             // radius power of 2
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.floor(Math.random() * 10) + 5;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.radiusPower2 = this.radius * this.radius;
    }
    draw() {
        cx.fillStyle = this.color;
        cx.beginPath()
        cx.arc(this.x, this.y, this.radius, 0, PI2);
        cx.closePath();
        cx.fill();
    }
    isClickIn(x: number, y: number): boolean {
        let c2 = (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y);
        return c2 <= this.radiusPower2;
    }
    move(): void {
        if (this.x <= this.radius || this.x >= WIDTH - this.radius)
            this.reflect(0)
        if (this.y <= this.radius || this.y >= HEIGHT - this.radius)
            this.reflect(Math.PI / 2)
        this.x += this.dx;
        this.y -= this.dy;
    }
    setDirection(d: number): void {
        this.direction = d;
        this.dx = Math.cos(this.direction) * this.speed;
        this.dy = Math.sin(this.direction) * this.speed;
    }
    setSpeed(s: number): void {
        this.speed = s;
        this.setDirection(this.direction);
    }
    reflect(pAngle: number): void {
        this.setDirection(Math.PI - 2 * pAngle - this.direction);
        console.log(this.direction);
    }
    setRadius(radius: number): void {
        this.radius = radius;
        this.radiusPower2 = radius * radius;
    }
    getCollideAngle(ball: Ball): number {
        let dx = this.x - ball.x;
        let dy = this.y - ball.y;
        let angle = Math.PI / 2;
        if (dx != 0) {
            angle = Math.atan(dy / dx);
        }
        return angle;
    }
    isCollided(ball: Ball): boolean {
        if (this != ball && ball != null) {
            let dx = this.x - ball.x;
            let dy = this.y - ball.y;
            let ballDistance = dx * dx + dy * dy;
            let collideDistance = ball.radius + this.radius;
            /* r is ratio of collide difference and ball distance */
            let r = (collideDistance - ballDistance) / ballDistance;
            /* if ball is overlape then seperate balls */
            if (r > 0) {
                this.x += dx * r;
                this.y += dy * r;
            }
            return ballDistance <= collideDistance;
        } else {
            return false;
        }
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
const boardSize = document.getElementById("boardSize") as HTMLInputElement;
const txtRunTime = document.getElementById("runTime") as HTMLLabelElement;

// var imgData = cx.createImageData(WIDTH, HEIGHT); // width x height
// var data = imgData.data;

var n = 10;

var ball = new Ball(WIDTH / 2, HEIGHT / 2);
ball.setDirection(1);
calculate();
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------

// ฟังก์ชั่น
// ----------------------------------------------------------------------------
async function calculate() {
    while (true) {
        ball.move();
        paint();
        await new Promise(r => setTimeout(r, 10));
    }
}

function paint() {
    n = Number(boardSize.value);
    cx.clearRect(0, 0, cv.width, cv.height);
    let x = MID_WIDTH;
    let y = 10;
    let size = 50;
    cx.fillStyle = 'black';
    cx.shadowBlur = 10;
    cx.shadowColor = 'Grey';
    let mid = size / 2;
    for (let i = 0; i < n; i++) {
        x = MID_WIDTH - (i * mid);
        cx.beginPath();
        cx.arc(x - mid, y + size, 5, 0, PI2);
        cx.closePath();
        cx.fill();

        for (let j = 0; j <= i; j++) {
            // cx.beginPath();
            // cx.moveTo(x, y);
            // cx.lineTo(x + mid, y + size);
            // cx.lineTo(x - mid, y + size);
            // cx.closePath();
            // cx.stroke();

            cx.beginPath()
            cx.arc(x + mid, y + size, 5, 0, PI2);
            cx.closePath();
            cx.fill();

            cx.beginPath();
            cx.moveTo(x - mid, y + size);
            cx.lineTo(x - mid, y + mid - 5);
            cx.lineTo(x, y);
            cx.moveTo(x + mid, y + size);
            cx.lineTo(x + mid, y + mid - 5);
            cx.lineTo(x, y);
            cx.stroke();

            x += size;

        }
        y += size;
    }
    ball.draw();
}
