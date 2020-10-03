const cv = document.getElementById("cpxCanvas") as HTMLCanvasElement;
const cx = cv.getContext("2d") as CanvasRenderingContext2D;
const WIDTH = cv.width;
const HEIGHT = cv.height;
const MID_WIDTH = cv.width / 2;
const MID_HEIGHT = cv.height / 2;

const COLORS = ['magenta', 'cyan', 'blue', 'green', 'yellow', 'orange', 'red'];
const PI2 = Math.PI * 2;
const PI_2 = Math.PI / 2;
const GRAVITY = 0.5;
const RESISTANCE = 0.5;

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
}

class Ball extends Sprite {
    dx: number;
    dy: number;
    speed: number = 5;      // pixel per frame
    direction: number = 1;  // radian
    gravity = GRAVITY;
    removed: boolean = false;
    constructor(x: number, y: number) {
        super(x, y, COLORS[Math.floor(Math.random() * COLORS.length)], 15);
    }
    move(): void {
        if (this.x <= this.radius || this.x >= WIDTH - this.radius)
            this.reflect(0);
        if ((this.y < 0 && this.y <= this.radius) || (this.y > 0 && this.y >= HEIGHT - this.radius)) {
            this.reflect(PI_2);
        }
        if (!(this.dy > 0 && this.y > HEIGHT - this.radius)) {
            this.gravity *= 1.01;
            if (this.dy > 0 && this.dy < this.gravity)
                this.gravity = GRAVITY;
            this.dy -= this.gravity;
        }
        this.x += this.dx;
        this.y -= this.dy;
        if (this.y > 0 && this.y > HEIGHT - this.radius) {
            this.y = HEIGHT - this.radius;
            if (this.dy > -1E-6 && this.dy < 1E-6)
                this.dy = 0;
            if (this.dx > -1E-6 && this.dx < 1E-6)
                this.dx = 0;
        }
        if (this.dx != 0)
            this.direction = Math.atan(this.dy / this.dx);
        else {
            if (this.dy > 0)
                this.direction = PI_2;
            else
                this.direction = -PI_2;
        }
        this.speed = this.dy / Math.sin(this.direction);
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
        let reflectAngle = Math.PI - 2 * pAngle - this.direction;
        // console.log(this.color, this.direction, reflectAngle);
        this.setDirection(reflectAngle);
        this.dx *= RESISTANCE + Math.random() / 10;
        this.dy *= RESISTANCE - Math.random() / 10;
    }
    getCollideAngle(obj: Sprite): number {
        let dx = obj.getX() - this.x;
        let dy = -(obj.getY() - this.y);
        let angle = PI_2;
        if (dx != 0)
            angle = Math.atan(dy / dx);
        return angle;
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
                let tetha = Math.asin(dy / ballDistance); //this.getCollideAngle(obj);
                console.log("dist=", ballDistance, Math.atan(dy / dx))
                console.log("xy=", this.x, this.y, "obj.xy=", obj.getX(), obj.getY())
                console.log('dxdy=', dx, dy, this.color, tetha, this.dx, this.dy)
                this.x -= r * Math.cos(tetha);
                this.y += r * Math.sin(tetha);
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
        super(x, y, 'black', 5);
    }
}

class Box extends Sprite {
    size: number;
    count: number = 0;
    constructor(x: number, y: number) {
        super(x, y, 'black', 25);
        this.size = this.radius * 2;
    }
    draw(): void {
        cx.fillStyle = this.color;
        cx.fillRect(this.x - this.radius, this.y, this.size, this.size);
        cx.strokeStyle = 'yellow';
        cx.strokeText(String(this.count), this.x - 10, this.y + this.radius + 5);
    }
    countBall(): void {
        this.count++;
    }
}

// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
const txtRunTime = document.getElementById("runTime") as HTMLLabelElement;

// var imgData = cx.createImageData(WIDTH, HEIGHT); // width x height
// var data = imgData.data;

var n = 15;
var allPins: Pin[] = new Array((n * n + n) / 2);
var pin_n: number = 0;
var boxs: Box[] = new Array(n);
var balls: Ball[] = new Array(0);

balls[0] = new Ball(WIDTH * 3.2 / 7, 25);
balls[0].setSpeed(0);
balls[0].setDirection(-Math.PI / 2);
balls[1] = new Ball(WIDTH * 3.8 / 7, 25);
balls[1].setSpeed(0);
balls[1].setDirection(-Math.PI / 2);
// for (let i = 2; i < 5; i++) {
//     balls[i] = new Ball(Math.random() * WIDTH, Math.random() * HEIGHT);
//     balls[i].setSpeed(Math.random() * 3);
//     balls[i].setDirection(Math.random() * Math.PI * 2);
// }

// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
let size = 50;
let mid = size / 2;
let x = MID_WIDTH;
let y = 40;
//allPins[pin_n++] = new Pin(x, y);
for (let i = 0; i < n; i++) {
    let x = MID_WIDTH - (i * mid);
    allPins[pin_n++] = new Pin(x - mid, y + size);
    if (i > 0)
        allPins[pin_n++] = new Pin(x - mid / 2, y + size - mid);
    for (let j = 0; j <= i; j++) {
        allPins[pin_n++] = new Pin(x + mid, y + size);
        x += size;
    }
    if (i > 0)
        allPins[pin_n++] = new Pin(x - size + mid / 2, y + size - mid);
    y += size;
}
y += size;
x = MID_WIDTH - (n * mid - mid);
for (let i = 0; i < n; i++) {
    boxs[i] = new Box(x, y);
    x += size;
}


paint();

// ฟังก์ชั่น
// ----------------------------------------------------------------------------
async function calculate() {
    let collided: boolean = false;
    while (!collided) {
        // if (ball.isRemoved()) {
        //     ball.setXY(WIDTH / 3 + Math.random() * 20, 20);
        //     ball.setRemove(false);
        // }
        collided = false;
        for (let ball of balls)
            for (let i = 0; i < pin_n; i++) {
                if (ball.isCollided(allPins[i])) {
                    collided = true;
                    ball.reflect(ball.getCollideAngle(allPins[i]));
                }
            }

        for (let i = 0; i < (balls.length - 1); i++) {
            for (let j = i + 1; j < balls.length; j++) {
                if (balls[i].isCollided(balls[j])) {
                    collided = true;
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
            ball.move();

        }
        paint();
        await new Promise(r => setTimeout(r, 50));
    }
}

function paint() {
    cx.clearRect(0, 0, cv.width, cv.height);

    let x = MID_WIDTH;
    let y = 40;
    let size = 50;
    cx.shadowBlur = 10;
    cx.shadowColor = 'blue';
    let mid = size / 2;
    cx.beginPath();
    cx.moveTo(x - mid - 5, y + size - 5);
    cx.lineTo(x - 200, y - 35);
    cx.stroke();
    cx.beginPath();
    cx.moveTo(x + mid + 5, y + size - 5);
    cx.lineTo(x + 200, y - 35);
    cx.stroke();

    for (let i = 0; i < n; i++) {
        boxs[i].draw();
        // x = MID_WIDTH - (i * mid);
        // for (let j = 0; j <= i; j++) {
        //     cx.beginPath();
        //     cx.moveTo(x - mid, y + size);
        //     // cx.lineTo(x - mid, y + mid - 5);
        //     cx.lineTo(x, y);
        //     cx.moveTo(x + mid, y + size);
        //     // cx.lineTo(x + mid, y + mid - 5);
        //     cx.lineTo(x, y);
        //     cx.stroke();
        //     x += size;
        // }
        // y += size;
    }
    for (let i = 0; i < pin_n; i++) {
        allPins[i].draw();
    }
    for (let ball of balls)
        ball.draw();
}