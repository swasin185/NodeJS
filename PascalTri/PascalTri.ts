const cv = document.getElementById("cpxCanvas") as HTMLCanvasElement;
const cx = cv.getContext("2d") as CanvasRenderingContext2D;
const WIDTH = cv.width;
const HEIGHT = cv.height;
const MID_WIDTH = cv.width / 2;
const MID_HEIGHT = cv.height / 2;

const COLORS = ['magenta', 'cyan', 'red', 'lime', 'yellow', 'orange', 'blue'];
const PI2 = Math.PI * 2;
const PI_2 = Math.PI / 2;
const GRAVITY = 0.1;
const RESISTANCE = 0.6666;

class Sprite {
    protected x: number;              // horizontal position
    protected y: number;              // vertical position
    protected radius: number = 5;     // pixel 
    protected color: string = 'yellow'; // color name
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
    isClickIn(x: number, y: number) {
        let dx = this.x - x;
        let dy = this.y - y;
        return this.radius * this.radius >= dx * dx + dy * dy;
    }
    getAngle(dx: number, dy: number): number {
        let angle = 0;
        if (dx != 0) {
            angle = Math.atan(dy / dx);
            if (Math.sign(dx) < 0)
                if (angle < 0)
                    angle += Math.PI;
                else
                    angle -= Math.PI;
        } else
            angle = Math.sign(dy) * PI_2;
        return angle;
    }
}

class Ball extends Sprite {
    private static ID = 0;
    private dx: number;
    private dy: number;
    private speed: number = 0;
    private direction: number = 0;
    private gravity = GRAVITY;
    private removed: boolean = false;
    constructor(x: number, y: number) {
        super(x, y, COLORS[Ball.ID % 7], 12);
        Ball.ID++;
        this.setDirection(this.direction);
    }
    move(): void {
        if (this.dy > 0 && this.dy <= this.gravity) {
            this.dy -= this.gravity;
            this.gravity = GRAVITY;
        } else {
            this.dy -= this.gravity;
            this.gravity *= 1.01;
        }
        this.speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        this.setDirection(this.getAngle(this.dx, this.dy));
        this.x += this.dx;
        this.y -= this.dy;
    }
    setDirection(d: number): void {
        this.direction = d;
        this.dx = Math.cos(this.direction) * this.speed;
        this.dy = Math.sin(this.direction) * this.speed;
        if (this.dy > -1E-4 && this.dy < 1E-4)
            this.dy = 0;
        if (this.dx > -1E-4 && this.dx < 1E-4)
            this.dx = 0;
    }
    setSpeed(s: number): void {
        this.speed = s;
        this.setDirection(this.direction);
    }
    reflect(pAngle: number): void {
        let reflectAngle = 2 * pAngle - this.direction;
        if (reflectAngle < 0)
            reflectAngle += Math.PI;
        else
            reflectAngle -= Math.PI;
        this.setDirection(reflectAngle);
        if (this.dx != 0)
            this.dx *= RESISTANCE + Math.random() / 10;
        else
            this.dx = Math.random() - 0.5; // ถ้าตกลงมาแนวดิ่งด้วยมุม +Pi/2 -Pi/2 ให้เบี่ยงออกซ้ายขวา + - 0.5
        this.dy *= RESISTANCE + Math.random() / 10;
    }
    getCollideAngle(obj: Sprite): number {
        let dx = obj.getX() - this.x;
        let dy = -(obj.getY() - this.y);
        return this.getAngle(dx, dy);
    }
    bounce(x1: number, y1: number, x2: number, y2: number): boolean {
        let isBounce = false;
        if (this.x < x1 + this.radius || this.x > x2 - this.radius) {
            if (this.x < x1 + this.radius)
                this.x = x1 + this.radius;
            else
                this.x = x2 - this.radius;
            this.reflect(0);
            isBounce = true;
        }
        if (this.y < y1 + this.radius || this.y > y2 - this.radius) {
            if (this.y < y1 + this.radius)
                this.y = y1 + this.radius;
            else {
                this.y = y2 - this.radius;
            }
            this.reflect(PI_2);
            isBounce = true;
        }
        return isBounce;
    }
    isCollided(obj: Sprite): boolean {
        if (this != obj && obj != null) {
            let dx = obj.getX() - this.x;
            let dy = -(obj.getY() - this.y);
            let ballDistance = Math.sqrt(dx * dx + dy * dy);
            let radius2 = obj.getRadius() + this.radius;

            /* r is ratio of collide difference and ball distance */
            let r = radius2 - ballDistance;
            if (r > 0 && !(obj instanceof Box)) {
                let theta = this.getAngle(dx, dy) //this.getCollideAngle(obj);
                this.x -= r * Math.cos(theta);
                this.y += r * Math.sin(theta);
            }
            return ballDistance <= radius2;
        } else {
            return false;
        }
    }
    remove(): void {
        this.removed = true;
    }
    isRemoved(): boolean {
        return this.removed;
    }
    setRemove(r: boolean): void {
        this.removed = r;
    }
}

class Pin extends Sprite {
    constructor(x: number, y: number) {
        super(x, y, COLORS[Math.floor(Math.random() * COLORS.length)], 3);
    }
}

class Box extends Sprite {
    private static ID = 0;
    private id: number = Box.ID++;
    private size: number;
    private count: number = 0;
    constructor(x: number, y: number) {
        super(x, y, 'black', 25);
        this.size = this.radius * 2;
    }
    draw(): void {
        // cx.fillStyle = this.color;
        cx.strokeStyle = 'lime';
        // cx.fillRect(this.x - this.radius, this.y, this.size, this.size);
        // cx.strokeRect(this.x - this.radius, this.y, this.size, this.size);
        cx.strokeText(String(this.count), this.x - 10, this.y + this.radius);
        // cx.strokeStyle = 'yellow';
        // cx.strokeText(String(this.id), this.x - 10, this.y + this.radius * 3);
    }
    countBall(): void {
        this.count++;
    }
}

// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
// var imgData = cx.createImageData(WIDTH, HEIGHT); // width x height
// var data = imgData.data;

var n = 16;
var allPins: Pin[] = new Array((n * n + n) / 2);
var pin_n: number = 0;
var boxs: Box[] = new Array(n);
var balls: Ball[] = new Array(0);
var gun : Box = new Box(MID_WIDTH / 10, 10);


// for (let i = 2; i < 5; i++) {
//     balls[i] = new Ball(Math.random() * WIDTH, Math.random() * HEIGHT);
//     balls[i].setSpeed(Math.random() * 3);
//     balls[i].setDirection(Math.random() * Math.PI * 2);
// }

// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
let size = 45;
let mid = size / 2;
let x = MID_WIDTH;
let y = 20;
size *= Math.sqrt(3) / 2;
let six = mid / Math.cos(Math.PI / 6);

allPins[pin_n++] = new Pin(x, y);
for (let i = 0; i < n; i++) {
    let x = MID_WIDTH - (i * mid);
    allPins[pin_n++] = new Pin(x - mid, y + size);
    allPins[pin_n++] = new Pin(x - mid, y + size - six);
    for (let j = 0; j <= i; j++) {
        allPins[pin_n++] = new Pin(x + mid, y + size);
        x += mid * 2;
    }
    allPins[pin_n++] = new Pin(x - mid, y + size - six);
    y += size;
}
y += six;
x = MID_WIDTH - (n * mid - mid);
for (let i = 0; i < n; i++) {
    boxs[i] = new Box(x, y);
    x += mid * 2;
}

paint();
calculate();
// ฟังก์ชั่น
// ----------------------------------------------------------------------------
async function calculate() {
    let resetBall: boolean = false;
    let nearBall: boolean = true;
    let nearArea: number = HEIGHT / 6
    while (true) {
        nearBall = false;
        for (let i = 0; i < balls.length && !nearBall; i++) 
            nearBall = balls[i].getY() < nearArea;
        if (!nearBall) {
            resetBall = false;
            for (let i = 0; i < balls.length && !resetBall; i++) {
                if (balls[i].isRemoved()) {
                    resetBall = true;
                    balls[i].setXY(MID_WIDTH, 50);
                    balls[i].setRemove(false);
                    gun.countBall();
                }
            }
            if (!resetBall) {
                balls[balls.length] = new Ball(MID_WIDTH, 50);
                gun.countBall();
            }
        }
        for (let ball of balls)
            for (let i = 0; i < pin_n; i++) {
                if (ball.isCollided(allPins[i])) {
                    ball.reflect(ball.getCollideAngle(allPins[i]));
                }
            }

        for (let i = 0; i < (balls.length - 1); i++) {
            for (let j = i + 1; j < balls.length; j++) {
                if (balls[i].isCollided(balls[j])) {
                    balls[i].reflect(balls[i].getCollideAngle(balls[j]));
                    balls[j].reflect(balls[j].getCollideAngle(balls[i]));
                }
            }
        }

        for (let ball of balls) {
            for (let i = 0; i < n && !ball.isRemoved(); i++) {
                if (ball.isCollided(boxs[i])) {
                    boxs[i].countBall();
                    ball.remove();
                }
            }
            ball.bounce(0, 0, WIDTH, HEIGHT);
            ball.move();
        }
        paint();
        await new Promise(r => setTimeout(r, 8));
    }
}

function paintLine() {
    let x = MID_WIDTH;
    let y = 20;
    let size = 45;
    cx.shadowBlur = 10;
    cx.shadowColor = 'blue';

    let mid = size / 2;
    size *= Math.sqrt(3) / 2;
    let six = mid / Math.cos(Math.PI / 6);
    for (let i = 0; i < n; i++) {
        x = MID_WIDTH - (i * mid);
        for (let j = 0; j <= i; j++) {
            cx.strokeStyle = 'grey';
            cx.beginPath();
            cx.moveTo(x - mid, y + size);
            cx.lineTo(x - mid, y + size - six);
            cx.lineTo(x, y);
            cx.moveTo(x + mid, y + size);
            cx.lineTo(x + mid, y + size - six);
            cx.lineTo(x, y);
            cx.stroke();
            x += mid * 2;
        }
        y += size;
    }

}

function paint() {
    cx.clearRect(0, 0, cv.width, cv.height);
    // paintLine();
    // for (let i = 0; i < pin_n; i++) {
    //     allPins[i].draw();
    // }
    gun.draw();
    for (let i = 0; i < n; i++)
        boxs[i].draw();
    for (let ball of balls)
        if (!ball.isRemoved())
            ball.draw();
}

function round(x: number): number {
    return Math.round(x * 1000) / 1000;
}

function clickXY(e: MouseEvent) {
    for (let ball of balls) {
        if (ball.isClickIn(e.offsetX, e.offsetY))
            console.log(ball);
    }
}