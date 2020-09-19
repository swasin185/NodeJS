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
var Circle = /** @class */ (function () {
    function Circle(x, y) {
        this.radius = 10;
        this.color = 'Grey';
        this.x = x;
        this.y = y;
        this.radius = Math.floor(Math.random() * 30) + 11;
        this.color = Circle.colors[Math.floor(Math.random() * Circle.colors.length)];
    }
    Circle.prototype.paint = function () {
        cx.shadowBlur = 10;
        cx.shadowColor = "Grey";
        cx.fillStyle = this.color;
        cx.beginPath();
        cx.arc(this.x, this.y, this.radius, 0, Circle.pi2);
        cx.closePath();
        cx.fill();
    };
    Circle.prototype.isClickIn = function (x, y) {
        var a2 = x - this.x;
        a2 *= a2;
        var b2 = y - this.y;
        b2 *= b2;
        var c2 = this.radius * this.radius;
        return (a2 + b2) <= c2;
    };
    Circle.colors = ['magenta', 'cyan', 'blue', 'green', 'yellow', 'orange', 'red'];
    // private static cv = document.getElementById("myCanvas") as HTMLCanvasElement;
    // private static  cx = Circle.cv.getContext("2d") as CanvasRenderingContext2D;
    Circle.pi2 = Math.PI * 2;
    return Circle;
}());
// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
var cv = document.getElementById("myCanvas");
var cx = cv.getContext("2d");
var WIDTH = cv.width;
var HEIGHT = cv.height;
var MID_WIDTH = cv.width / 2;
var MID_HEIGHT = cv.height / 2;
var data = new Array(100);
var size = 0;
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
calculate();
// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function calculate() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
function clickXY(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    var found = -1;
    for (var i = 0; i < size && found == -1; i++) {
        if (data[i].isClickIn(x, y))
            found = i;
    }
    if (found == -1) {
        data[size++] = new Circle(x, y);
    }
    else {
        for (var i = found + 1; i < size; i++)
            data[i - 1] = data[i];
        size--;
    }
    paint();
}
function paint() {
    cx.clearRect(0, 0, cv.width, cv.height);
    for (var i = 0; i < size; i++)
        data[i].paint();
}
