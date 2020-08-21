"use strict";
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
exports.__esModule = true;
exports.Sort = void 0;
var Sort = /** @class */ (function () {
    function Sort(n, canvasId) {
        this.swap = 0;
        this.compare = 0;
        this.temp = 0;
        this.canvasId = canvasId;
        this.arr = new Array(n);
        for (var i = 0; i < this.arr.length; i++)
            this.arr[i] = i + 1;
        for (var i = 0; i < this.arr.length; i++) {
            var a = this.arr[i];
            var x = Math.floor(Math.random() * this.arr.length);
            this.arr[i] = this.arr[x];
            this.arr[x] = a;
        }
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.repaint();
    }
    Sort.prototype.repaint = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.arr.length; i++) {
            //this.ctx.fillRect(x, y, width, height)
            this.ctx.fillRect(10 + (i * 3), 150, 2, -this.arr[i]);
        }
        this.ctx.fillText("compare=" + this.compare + " swap=" + this.swap, 30, 190);
    };
    Sort.prototype.swapData = function (i, j) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.swap++;
                        this.temp = this.arr[i];
                        this.arr[i] = this.arr[j];
                        this.arr[j] = this.temp;
                        this.repaint();
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 10); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sort.prototype.compareData = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.compare++;
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 10); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.arr[x] - this.arr[y]];
                }
            });
        });
    };
    Sort.prototype.runSort = function () {
        this.swap = 0;
        this.compare = 0;
    };
    return Sort;
}());
exports.Sort = Sort;
