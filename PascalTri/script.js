var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var cv = document.getElementById("cpxCanvas");
var cx = cv.getContext("2d");
var WIDTH = cv.width;
var HEIGHT = cv.height;
var MID_WIDTH = cv.width / 2;
var MID_HEIGHT = cv.height / 2;
var COLORS = ['magenta', 'cyan', 'blue', 'green', 'yellow', 'orange', 'red'];
var PI2 = Math.PI * 2;
var PI_2 = Math.PI / 2;
var GRAVITY = 0.5;
var RESISTANCE = 0.9;
var Sprite = /** @class */ (function () {
    function Sprite(x, y, color, r) {
        this.radius = 5; // pixel 
        this.color = 'yellow'; // color name
        this.setXY(x, y);
        this.setRadius(r);
        this.color = color;
    }
    Sprite.prototype.setXY = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Sprite.prototype.setRadius = function (radius) {
        this.radius = radius;
    };
    Sprite.prototype.draw = function () {
        cx.fillStyle = this.color;
        cx.beginPath();
        cx.arc(this.x, this.y, this.radius, 0, PI2);
        cx.closePath();
        cx.fill();
    };
    Sprite.prototype.getX = function () {
        return this.x;
    };
    Sprite.prototype.getY = function () {
        return this.y;
    };
    Sprite.prototype.getRadius = function () {
        return this.radius;
    };
    Sprite.prototype.isClickIn = function (x, y) {
        var dx = this.x - x;
        var dy = this.y - y;
        return this.radius * this.radius >= dx * dx + dy * dy;
    };
    Sprite.prototype.getAngle = function (dx, dy) {
        var angle = 0;
        if (dx != 0) {
            angle = Math.atan(dy / dx);
            if (Math.sign(dx) < 0)
                if (angle < 0)
                    angle += Math.PI;
                else
                    angle -= Math.PI;
        }
        else
            angle = Math.sign(dy) * PI_2;
        return angle;
    };
    return Sprite;
}());
var Ball = /** @class */ (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y) {
        var _this = _super.call(this, x, y, COLORS[Math.floor(Math.random() * COLORS.length)], 30) || this;
        _this.speed = 5; // pixel per frame
        _this.direction = 1; // radian
        _this.gravity = GRAVITY;
        _this.removed = false;
        return _this;
    }
    Ball.prototype.move = function () {
        if (this.dy > 0 && this.dy <= this.gravity) {
            this.dy -= this.gravity;
            this.gravity = GRAVITY;
        }
        else {
            this.dy -= this.gravity;
            this.gravity *= 1.05;
        }
        this.speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        this.setDirection(this.getAngle(this.dx, this.dy));
        this.x += this.dx;
        this.y -= this.dy;
    };
    Ball.prototype.setDirection = function (d) {
        this.direction = d;
        this.dx = Math.cos(this.direction) * this.speed;
        this.dy = Math.sin(this.direction) * this.speed;
        if (this.dy > -1E-4 && this.dy < 1E-4)
            this.dy = 0;
        if (this.dx > -1E-4 && this.dx < 1E-4)
            this.dx = 0;
        // console.log(this.direction, this.dx, this.dy)
    };
    Ball.prototype.setSpeed = function (s) {
        this.speed = s;
        this.setDirection(this.direction);
    };
    Ball.prototype.reflect = function (pAngle) {
        var reflectAngle = 2 * pAngle - this.direction;
        if (reflectAngle < 0)
            reflectAngle += Math.PI;
        else
            reflectAngle -= Math.PI;
        this.setDirection(reflectAngle);
        this.dx *= RESISTANCE;
        this.dy *= RESISTANCE;
    };
    Ball.prototype.getCollideAngle = function (obj) {
        var dx = obj.getX() - this.x;
        var dy = -(obj.getY() - this.y);
        return this.getAngle(dx, dy);
    };
    Ball.prototype.bounce = function (x1, y1, x2, y2) {
        var isBounce = false;
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
    };
    Ball.prototype.isCollided = function (obj) {
        if (this != obj && obj != null) {
            var dx = obj.getX() - this.x;
            var dy = -(obj.getY() - this.y);
            var ballDistance = Math.sqrt(dx * dx + dy * dy);
            var radius2 = obj.getRadius() + this.radius;
            /* r is ratio of collide difference and ball distance */
            var r = radius2 - ballDistance;
            if (r > 0 && !(obj instanceof Box)) {
                var theta = this.getAngle(dx, dy); //this.getCollideAngle(obj);
                this.x -= r * Math.cos(theta);
                this.y += r * Math.sin(theta);
            }
            return ballDistance <= radius2;
        }
        else {
            return false;
        }
    };
    Ball.prototype.remove = function () {
        this.removed = true;
    };
    Ball.prototype.isRemoved = function () {
        return this.removed;
    };
    Ball.prototype.setRemove = function (r) {
        this.removed = r;
    };
    return Ball;
}(Sprite));
var Pin = /** @class */ (function (_super) {
    __extends(Pin, _super);
    function Pin(x, y) {
        return _super.call(this, x, y, 'black', 5) || this;
    }
    return Pin;
}(Sprite));
var Box = /** @class */ (function (_super) {
    __extends(Box, _super);
    function Box(x, y) {
        var _this = _super.call(this, x, y, 'black', 25) || this;
        _this.count = 0;
        _this.size = _this.radius * 2;
        return _this;
    }
    Box.prototype.draw = function () {
        cx.fillStyle = this.color;
        cx.fillRect(this.x - this.radius, this.y, this.size, this.size);
        cx.strokeStyle = 'yellow';
        cx.strokeText(String(this.count), this.x - 10, this.y + this.radius + 5);
    };
    Box.prototype.countBall = function () {
        this.count++;
    };
    return Box;
}(Sprite));
// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
var txtRunTime = document.getElementById("runTime");
// var imgData = cx.createImageData(WIDTH, HEIGHT); // width x height
// var data = imgData.data;
var n = 15;
var allPins = new Array((n * n + n) / 2);
var pin_n = 0;
var boxs = new Array(n);
var balls = new Array(0);
balls[0] = new Ball(WIDTH * 3.2 / 7, 124);
balls[0].setSpeed(1);
balls[0].setDirection(0);
balls[1] = new Ball(WIDTH * 3.8 / 7, 128);
balls[1].setSpeed(1);
balls[1].setDirection(Math.PI);
balls[2] = new Ball(WIDTH * 6.6 / 7, 45);
balls[2].setSpeed(1);
balls[2].setDirection(-Math.PI / 4);
balls[3] = new Ball(WIDTH * 0.3 / 7, 150);
balls[3].setSpeed(1);
balls[3].setDirection(Math.PI * 3 / 4);
balls[4] = new Ball(WIDTH * 0.5 / 7, HEIGHT * 8 / 10);
balls[4].setSpeed(1);
balls[4].setDirection(-PI_2);
// for (let i = 2; i < 5; i++) {
//     balls[i] = new Ball(Math.random() * WIDTH, Math.random() * HEIGHT);
//     balls[i].setSpeed(Math.random() * 3);
//     balls[i].setDirection(Math.random() * Math.PI * 2);
// }
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
var size = 50;
var mid = size / 2;
var x = MID_WIDTH;
var y = 40;
//allPins[pin_n++] = new Pin(x, y);
for (var i = 0; i < n; i++) {
    var x_1 = MID_WIDTH - (i * mid);
    allPins[pin_n++] = new Pin(x_1 - mid, y + size);
    if (i > 0)
        allPins[pin_n++] = new Pin(x_1 - mid / 2, y + size - mid);
    for (var j = 0; j <= i; j++) {
        allPins[pin_n++] = new Pin(x_1 + mid, y + size);
        x_1 += size;
    }
    if (i > 0)
        allPins[pin_n++] = new Pin(x_1 - size + mid / 2, y + size - mid);
    y += size;
}
y += size;
x = MID_WIDTH - (n * mid - mid);
for (var i = 0; i < n; i++) {
    boxs[i] = new Box(x, y);
    x += size;
}
console.log(balls);
paint();
// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    return __awaiter(this, void 0, void 0, function () {
        var collided, allSpeed, i, j, _i, balls_1, ball, i, _a, balls_2, ball;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    collided = false;
                    allSpeed = 1;
                    _b.label = 1;
                case 1:
                    if (!(allSpeed > 0)) return [3 /*break*/, 3];
                    // if (ball.isRemoved()) {
                    //     ball.setXY(WIDTH / 3 + Math.random() * 20, 20);
                    //     ball.setRemove(false);
                    // }
                    collided = false;
                    // for (let ball of balls)
                    //     for (let i = 0; i < pin_n; i++) {
                    //         if (ball.isCollided(allPins[i])) {
                    //             collided = true;
                    //             ball.reflect(ball.getCollideAngle(allPins[i]));
                    //         }
                    //     }
                    for (i = 0; i < (balls.length - 1); i++) {
                        for (j = i + 1; j < balls.length; j++) {
                            if (balls[i].isCollided(balls[j])) {
                                collided = true;
                                balls[i].reflect(balls[i].getCollideAngle(balls[j]));
                                balls[j].reflect(balls[j].getCollideAngle(balls[i]));
                            }
                        }
                    }
                    for (_i = 0, balls_1 = balls; _i < balls_1.length; _i++) {
                        ball = balls_1[_i];
                        for (i = 0; i < n && !ball.isRemoved(); i++) {
                            if (ball.isCollided(boxs[i])) {
                                boxs[i].countBall();
                                ball.remove();
                            }
                        }
                        collided = ball.bounce(0, 0, WIDTH, HEIGHT);
                        ball.move();
                    }
                    paint();
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 20); })];
                case 2:
                    _b.sent();
                    allSpeed = 0;
                    for (_a = 0, balls_2 = balls; _a < balls_2.length; _a++) {
                        ball = balls_2[_a];
                        allSpeed += ball.speed;
                    }
                    return [3 /*break*/, 1];
                case 3:
                    console.log('STOP');
                    return [2 /*return*/];
            }
        });
    });
}
function paint() {
    cx.clearRect(0, 0, cv.width, cv.height);
    var x = MID_WIDTH;
    var y = 40;
    var size = 50;
    cx.shadowBlur = 10;
    cx.shadowColor = 'blue';
    var mid = size / 2;
    for (var i = 0; i < n; i++) {
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
    // for (let i = 0; i < pin_n; i++) {
    //     allPins[i].draw();
    // }
    for (var _i = 0, balls_3 = balls; _i < balls_3.length; _i++) {
        var ball = balls_3[_i];
        ball.draw();
    }
}
function round(x) {
    return Math.round(x * 1000) / 1000;
}
function clickXY(e) {
    for (var _i = 0, balls_4 = balls; _i < balls_4.length; _i++) {
        var ball = balls_4[_i];
        if (ball.isClickIn(e.offsetX, e.offsetY))
            console.log(ball);
    }
}
