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
// Class 
var Ball = /** @class */ (function () {
    function Ball() {
        this.radius = 10;
    }
    Ball.prototype.paint = function () {
        cx.shadowBlur = 10;
        cx.shadowColor = "Grey";
        cx.fillStyle = "White";
        cx.beginPath();
        cx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        cx.closePath();
        cx.fill();
    };
    return Ball;
}());
var Pin = /** @class */ (function () {
    function Pin() {
    }
    return Pin;
}());
var Box = /** @class */ (function () {
    function Box() {
    }
    return Box;
}());
// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
var cv = document.getElementById("cpxCanvas");
var cx = cv.getContext("2d");
var boardSize = document.getElementById("boardSize");
var txtRunTime = document.getElementById("runTime");
var WIDTH = cv.width;
var HEIGHT = cv.height;
var MID_WIDTH = cv.width / 2;
var MID_HEIGHT = cv.height / 2;
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
function calculate() {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paint();
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 150)) return [3 /*break*/, 4];
                    ball.y += 5;
                    //ball.paint();
                    paint();
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 10); })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function clickXY(event) {
    ball.x = event.offsetX;
    ball.y = event.offsetY;
    paint();
}
function paint() {
    n = Number(boardSize.value);
    cx.clearRect(0, 0, cv.width, cv.height);
    var x = MID_WIDTH;
    var y = 10;
    var size = 50;
    cx.fillStyle = "Blue";
    cx.shadowBlur = 10;
    cx.shadowColor = "Grey";
    var mid = size / 2;
    for (var i = 0; i < n; i++) {
        x = MID_WIDTH - (i * mid);
        cx.beginPath();
        cx.arc(x - mid, y + size, 5, 0, 2 * Math.PI);
        cx.closePath();
        cx.fill();
        for (var j = 0; j <= i; j++) {
            // cx.beginPath();
            // cx.fillStyle = "Orange";
            // cx.shadowBlur = 0;
            // cx.moveTo(x, y);
            // cx.lineTo(x + mid, y + size);
            // cx.lineTo(x - mid, y + size);
            // cx.closePath();
            // cx.fill();
            cx.beginPath();
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
