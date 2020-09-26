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
var GRAVITY = 1;
var Sprite = /** @class */ (function () {
    function Sprite(x, y, color, r) {
        this.radius = 5; // pixel 
        this.color = 'Grey'; // color name
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
    return Sprite;
}());
var Ball = /** @class */ (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y) {
        var _this = _super.call(this, x, y, COLORS[Math.floor(Math.random() * COLORS.length)], Math.floor(Math.random() * 10) + 5) || this;
        _this.speed = 5; // pixel per frame
        _this.direction = 1; // radian
        _this.gravity = GRAVITY;
        return _this;
    }
    Ball.prototype.move = function () {
        if (this.x <= this.radius || this.x >= WIDTH - this.radius)
            this.reflect(0);
        if ((this.y < 0 && this.y <= this.radius) || (this.y > 0 && this.y >= HEIGHT - this.radius))
            this.reflect(PI_2);
        // this.setDirection(this.direction + Math.atan(gravity * Math.sin(PI_2 - this.direction) /
        //     (this.speed * gravity * Math.cos(PI_2 - this.direction))));
        if (this.y > 0 && this.y > HEIGHT - this.radius) {
            this.dx /= 2;
            this.dy *= 0.7;
        }
        else {
            this.gravity *= 1.05;
            if (this.dy < this.gravity)
                this.gravity = GRAVITY;
            this.dy -= this.gravity;
        }
        console.log(this.dy, this.gravity);
        this.x += this.dx;
        this.y -= this.dy;
        if (this.y > 0 && this.y > HEIGHT - this.radius) {
            this.y = HEIGHT - this.radius + 1;
            if (this.dy > -0.0000001 && this.dy < 0.0000001)
                this.dy = 0;
            if (this.dx > -0.0000001 && this.dx < 0.0000001)
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
    };
    Ball.prototype.setDirection = function (d) {
        this.direction = d;
        this.dx = Math.cos(this.direction) * this.speed;
        this.dy = Math.sin(this.direction) * this.speed;
    };
    Ball.prototype.setSpeed = function (s) {
        this.speed = s;
        this.setDirection(this.direction);
    };
    Ball.prototype.reflect = function (pAngle) {
        this.setDirection(Math.PI - 2 * pAngle - this.direction);
        // console.log(this.direction);
    };
    Ball.prototype.getCollideAngle = function (obj) {
        var dx = this.x - obj.getX();
        var dy = this.y - obj.getY();
        var angle = PI_2;
        if (dx != 0)
            angle = Math.atan(dy / dx);
        return angle;
    };
    Ball.prototype.isCollided = function (obj) {
        if (this != obj && obj != null) {
            var dx = this.x - obj.getX();
            var dy = this.y - obj.getY();
            var ballDistance = Math.sqrt(dx * dx + dy * dy);
            var collideDistance = obj.getRadius() + this.radius;
            /* r is ratio of collide difference and ball distance */
            var r = (collideDistance - ballDistance) / ballDistance;
            /* if ball is overlape then seperate balls */
            if (r > 0) {
                this.x += dx * r;
                this.y += dy * r;
            }
            //            console.log('distance', ballDistance, collideDistance);
            return ballDistance <= collideDistance;
        }
        else {
            return false;
        }
    };
    return Ball;
}(Sprite));
var Pin = /** @class */ (function (_super) {
    __extends(Pin, _super);
    function Pin(x, y) {
        return _super.call(this, x, y, 'blue', 5) || this;
    }
    return Pin;
}(Sprite));
var Box = /** @class */ (function () {
    function Box() {
    }
    return Box;
}());
// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
var boardSize = document.getElementById("boardSize");
var txtRunTime = document.getElementById("runTime");
// var imgData = cx.createImageData(WIDTH, HEIGHT); // width x height
// var data = imgData.data;
var n = 10;
var allPins = new Array((2 * n + n) / 2);
var pin_n = 0;
var ball = new Ball(60, HEIGHT * 0.9);
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
ball.setDirection(1);
ball.setSpeed(30);
calculate();
// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    return __awaiter(this, void 0, void 0, function () {
        var size, mid, x, y, i, x_1, j, collided;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    n = Number(boardSize.value);
                    size = 50;
                    mid = size / 2;
                    x = MID_WIDTH;
                    y = 10;
                    for (i = 0; i < n; i++) {
                        x_1 = MID_WIDTH - (i * mid);
                        allPins[pin_n++] = new Pin(x_1 - mid, y + size);
                        for (j = 0; j <= i; j++) {
                            allPins[pin_n++] = new Pin(x_1 + mid, y + size);
                            x_1 += size;
                        }
                        y += size;
                    }
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    // collided = false;
                    // for (let i = 0; i < pin_n && !collided; i++) {
                    //     if (ball.isCollided(allPins[i])) {
                    //         collided = true;
                    //         ball.reflect(ball.getCollideAngle(allPins[i]));
                    //     }
                    // }
                    ball.move();
                    paint();
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 500); })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function paint() {
    n = Number(boardSize.value);
    cx.clearRect(0, 0, cv.width, cv.height);
    for (var i = 0; i < pin_n; i++) {
        allPins[i].draw();
    }
    var x = MID_WIDTH;
    var y = 10;
    var size = 50;
    cx.fillStyle = 'black';
    cx.shadowBlur = 10;
    cx.shadowColor = 'Grey';
    var mid = size / 2;
    for (var i = 0; i < n; i++) {
        x = MID_WIDTH - (i * mid);
        for (var j = 0; j <= i; j++) {
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
