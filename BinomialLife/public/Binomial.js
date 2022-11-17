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
var Binomial = /** @class */ (function () {
    function Binomial(canvasId) {
        if (canvasId === void 0) { canvasId = "canvas"; }
        this.bgColor = [0x0, 0x0, 0x0];
        this.white = [0xFF, 0xFF, 0xFF];
        this.colors = new Array(1);
        this.age = 0;
        this.population = 0;
        this.bArray = [[]];
        this.running = false;
        this.colors = new Array(100);
        for (var i = 0; i < this.colors.length; i++)
            this.colors[i] = [Math.round(i * 2.5), 205 - (i * 2), 100];
        this.cvs = document.getElementById(canvasId);
        this.ctx = this.cvs.getContext("2d");
        this.ctx.fillStyle = this.cvs.style.backgroundColor;
        this.ctx.strokeStyle = this.cvs.style.color;
    }
    Binomial.prototype.init = function (age, population) {
        if (age === void 0) { age = 100; }
        if (population === void 0) { population = 100; }
        // console.log("age", age, "pop", population);
        if (!this.running) {
            this.running = true;
            this.age = age;
            this.population = population;
            this.bArray = [[0]];
            var normal = 1000;
            this.dx = Math.ceil(normal / age);
            this.dy = Math.ceil(normal / age);
            this.size = age;
            this.width = this.size * this.dx;
            this.height = this.size * this.dy;
            this.cvs.width = this.width;
            this.cvs.height = this.height;
            this._dx4 = this.dx * 4;
            this._width4 = this.width * 4;
            this._width4_dx4 = this._width4 - this._dx4;
            this.imgData = this.ctx.createImageData(this.width, this.height);
            this.imgData.data.fill(0x0);
            this.bArray = new Array(age);
            for (var i = 0; i < age; i++)
                this.bArray[i] = [];
            this.running = false;
        }
    };
    Binomial.prototype.paintArea = function (imgArr, i, j, color) {
        var coor = (i * this.dy * this._width4 + (j * this._dx4));
        for (var by = 0; by < this.dy; by++) {
            for (var bx = 0; bx < this.dx; bx++) {
                imgArr[coor++] = color[Binomial.RED];
                imgArr[coor++] = color[Binomial.GREEN];
                imgArr[coor++] = color[Binomial.BLUE];
                imgArr[coor++] = 0xFF;
            }
            coor += this._width4_dx4;
        }
    };
    Binomial.prototype.paint = function () {
        var imgArr = this.imgData.data;
        var x = 0;
        var y = 0;
        for (var i = 0; i < this.bArray.length; i++)
            for (var j = 0; j < this.bArray[i].length; j++) {
                if (this.bArray[i] != undefined && this.bArray[i][j] != undefined) {
                    if (this.bArray[i][j] > 0) {
                        //this.paintArea(imgArr, i, j, this.colors[this.bArray[i][j] % this.colors.length]);
                        var x_1 = Math.floor((i + j) / 2);
                        if (this.bArray[x_1] != undefined && this.bArray[x_1][x_1] != undefined) {
                            if (this.bArray[x_1][x_1] == 0)
                                y = 0;
                            else {
                                y = Math.round((this.bArray[i][j] / this.bArray[x_1][x_1]) * this.colors.length);
                                if (y >= this.colors.length)
                                    y = this.colors.length - 1;
                            }
                        }
                        else
                            y = 0;
                        this.paintArea(imgArr, i, j, this.colors[y]);
                    }
                }
                else {
                    this.paintArea(imgArr, i, j, this.bgColor);
                }
            }
        this.ctx.putImageData(this.imgData, 0, 0);
    };
    Binomial.prototype.run = function (age, population) {
        if (age === void 0) { age = 100; }
        if (population === void 0) { population = 100; }
        return __awaiter(this, void 0, void 0, function () {
            var p, i, j, x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("start...");
                        console.time("run");
                        this.init(age, population);
                        this.paint();
                        p = 0;
                        _a.label = 1;
                    case 1:
                        if (!(p < population)) return [3 /*break*/, 4];
                        i = 0;
                        j = 0;
                        for (x = 0; x < this.age; x++) {
                            if (this.bArray[i] && this.bArray[i][j])
                                this.bArray[i][j]++;
                            else
                                this.bArray[i][j] = 1;
                            if (Math.random() < 0.5)
                                i++;
                            else
                                j++;
                        }
                        this.paint();
                        return [4 /*yield*/, new Promise(function (r) { setTimeout(r, 1); })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        p++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.timeEnd("run");
                        return [2 /*return*/];
                }
            });
        });
    };
    Binomial.RED = 0;
    Binomial.GREEN = 1;
    Binomial.BLUE = 2;
    return Binomial;
}());
