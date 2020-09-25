const cv = document.getElementById("cpxCanvas") as HTMLCanvasElement;
const cx = cv.getContext("2d") as CanvasRenderingContext2D;
const WIDTH = cv.width;
const HEIGHT = cv.height;
const MID_WIDTH = cv.width / 2;
const MID_HEIGHT = cv.height / 2;

const COLORS = ['magenta', 'cyan', 'blue', 'green', 'yellow', 'orange', 'red'];
const PI2 = Math.PI * 2;
const PI_2 = Math.PI / 2;

class Sprite {
    protected x: number;              // horizontal position
    protected y: number;              // vertical position
    protected radius: number = 5;     // pixel 
    protected color: string = 'Grey'; // color name
    constructor(x: number, y: number, color: string, r: number) {
        this.setXY(x, y);
        this.setRadius(r);
        this.color = color;
    }
    setXY(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
    setRadius(radius: number): void {
        this.radius = radius;
    }
    draw(): void {
        cx.fillStyle = this.color;
        cx.beginPath()
        cx.arc(this.x, this.y, this.radius, 0, PI2);
        cx.closePath();
        cx.fill();
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
    getRadius(): number {
        return this.radius;
    }
}

class Ball extends Sprite {
    dx: number;
    dy: number;
    speed: number = 5;      // pixel per frame
    direction: number = 1;  // radian
    constructor(x: number, y: number) {
        super(x, y, COLORS[Math.floor(Math.random() * COLORS.length)], Math.floor(Math.random() * 10) + 5);
    }
    move(): void {
        if (this.x <= this.radius || this.x >= WIDTH - this.radius)
            this.reflect(0)
        if (this.y <= this.radius || this.y >= HEIGHT - this.radius)
            this.reflect(PI_2)
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
        //        console.log(this.direction);
    }
    getCollideAngle(obj: Sprite): number {
        let dx = this.x - obj.getX();
        let dy = this.y - obj.getY();
        let angle = PI_2;
        if (dx != 0)
            angle = Math.atan(dy / dx);
        return angle;
    }
    isCollided(obj: Sprite): boolean {
        if (this != obj && obj != null) {
            let dx = this.x - obj.getX();
            let dy = this.y - obj.getY();
            let ballDistance = Math.sqrt(dx * dx + dy * dy);
            let collideDistance = obj.getRadius() + this.radius;
            /* r is ratio of collide difference and ball distance */
            let r = (collideDistance - ballDistance) / ballDistance;
            /* if ball is overlape then seperate balls */
            if (r > 0) {
                this.x += dx * r;
                this.y += dy * r;
            }
            //            console.log('distance', ballDistance, collideDistance);
            return ballDistance <= collideDistance;
        } else {
            return false;
        }
    }
}

class Pin extends Sprite {
    constructor(x: number, y: number) {
        super(x, y, 'blue', 5);
    }
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

var allPins: Pin[] = new Array((2 * n + n) / 2);
var pin_n: number = 0;

var ball = new Ball(WIDTH / 2, HEIGHT / 2);
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
ball.setDirection(1);
calculate();


// ฟังก์ชั่น
// ----------------------------------------------------------------------------
async function calculate() {
    n = Number(boardSize.value);
    let size = 50;
    let mid = size / 2;
    let x = MID_WIDTH;
    let y = 10;
    for (let i = 0; i < n; i++) {
        let x = MID_WIDTH - (i * mid);
        allPins[pin_n++] = new Pin(x - mid, y + size);
        for (let j = 0; j <= i; j++) {
            allPins[pin_n++] = new Pin(x + mid, y + size);
            x += size;
        }
        y += size;
    }
    let collided : boolean;
    while (true) {
        collided = false;
        for (let i = 0; i < pin_n && !collided; i++) {
            if (ball.isCollided(allPins[i])) {
                collided = true;
                ball.reflect(ball.getCollideAngle(allPins[i]));
            }
        }
        ball.move();
        paint();
        await new Promise(r => setTimeout(r, 10));
    }
}

function paint() {
    n = Number(boardSize.value);
    cx.clearRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < pin_n; i++) {
        allPins[i].draw();
    }

    let x = MID_WIDTH;
    let y = 10;
    let size = 50;
    cx.fillStyle = 'black';
    cx.shadowBlur = 10;
    cx.shadowColor = 'Grey';
    let mid = size / 2;
    for (let i = 0; i < n; i++) {
        x = MID_WIDTH - (i * mid);

        for (let j = 0; j <= i; j++) {
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
