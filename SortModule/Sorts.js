var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
            this.ctx.fillRect(10 + i * 3, 150, 2, -this.arr[i]);
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
export { Sort };
var BubbleSort = /** @class */ (function (_super) {
    __extends(BubbleSort, _super);
    function BubbleSort(n, canvasId) {
        return _super.call(this, n, canvasId) || this;
    }
    BubbleSort.prototype.runSort = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sorted, i, _loop_1, this_1, j;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.runSort.call(this);
                        sorted = false;
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.arr.length && !sorted)) return [3 /*break*/, 6];
                        sorted = true;
                        _loop_1 = function (j) {
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, this_1.compareData(j, j - 1).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!(result < 0)) return [3 /*break*/, 2];
                                                        return [4 /*yield*/, _super.prototype.swapData.call(this, j, j - 1)];
                                                    case 1:
                                                        _a.sent();
                                                        sorted = false;
                                                        _a.label = 2;
                                                    case 2: return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        j = 1;
                        _a.label = 2;
                    case 2:
                        if (!(j < this.arr.length - i + 1)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_1(j)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        j++;
                        return [3 /*break*/, 2];
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return BubbleSort;
}(Sort));
export { BubbleSort };
var SelectSort = /** @class */ (function (_super) {
    __extends(SelectSort, _super);
    function SelectSort(n, canvasId) {
        return _super.call(this, n, canvasId) || this;
    }
    SelectSort.prototype.runSort = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_2, this_2, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.runSort.call(this);
                        _loop_2 = function (i) {
                            var max, _loop_3, j;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        max = i;
                                        _loop_3 = function (j) {
                                            return __generator(this, function (_c) {
                                                switch (_c.label) {
                                                    case 0: return [4 /*yield*/, this_2.compareData(max, j).then(function (result) {
                                                            if (result < 0)
                                                                max = j;
                                                        })];
                                                    case 1:
                                                        _c.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        j = 0;
                                        _b.label = 1;
                                    case 1:
                                        if (!(j < i)) return [3 /*break*/, 4];
                                        return [5 /*yield**/, _loop_3(j)];
                                    case 2:
                                        _b.sent();
                                        _b.label = 3;
                                    case 3:
                                        j++;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        this_2.compare++;
                                        return [4 /*yield*/, this_2.compareData(i, max).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!(result < 0)) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, _super.prototype.swapData.call(this, i, max)];
                                                        case 1:
                                                            _a.sent();
                                                            _a.label = 2;
                                                        case 2: return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 5:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_2 = this;
                        i = this.arr.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i > 0)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_2(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i--;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return SelectSort;
}(Sort));
export { SelectSort };
var InsertSort = /** @class */ (function (_super) {
    __extends(InsertSort, _super);
    function InsertSort(n, canvasId) {
        return _super.call(this, n, canvasId) || this;
    }
    InsertSort.prototype.runSort = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_4, this_3, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.runSort.call(this);
                        _loop_4 = function (i) {
                            var j, x;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        j = i;
                                        x = -1;
                                        _b.label = 1;
                                    case 1:
                                        if (!(x < 0)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_3.compareData(j, j - 1).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!(result < 0)) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, this.swapData(j, j - 1)];
                                                        case 1:
                                                            _a.sent();
                                                            j--;
                                                            _a.label = 2;
                                                        case 2:
                                                            x = result;
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 1];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_3 = this;
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.arr.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_4(i)];
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
    };
    return InsertSort;
}(Sort));
export { InsertSort };
var QuickSort = /** @class */ (function (_super) {
    __extends(QuickSort, _super);
    function QuickSort(n, canvasId) {
        return _super.call(this, n, canvasId) || this;
    }
    QuickSort.prototype.runSort = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.runSort.call(this);
                        return [4 /*yield*/, this.quickSort(0, this.arr.length - 1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    QuickSort.prototype.quickSort = function (lo, hi) {
        return __awaiter(this, void 0, void 0, function () {
            var pivot, l, h, x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pivot = Math.floor((lo + hi) / 2);
                        l = lo;
                        h = hi;
                        x = -1;
                        _a.label = 1;
                    case 1:
                        if (!(l < h)) return [3 /*break*/, 9];
                        _a.label = 2;
                    case 2:
                        if (!(x < 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.compareData(pivot, h).then(function (result) {
                                if (result < 0)
                                    h--;
                                x = result;
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4:
                        if (!(l < h && x >= 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.compareData(pivot, l).then(function (result) {
                                if (result >= 0)
                                    l++;
                                x = result;
                            })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 6:
                        if (!(l < h)) return [3 /*break*/, 8];
                        if (h == pivot)
                            pivot = l;
                        return [4 /*yield*/, this.swapData(l, h)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 1];
                    case 9:
                        if (!(pivot < h)) return [3 /*break*/, 11];
                        return [4 /*yield*/, _super.prototype.swapData.call(this, h, pivot)];
                    case 10:
                        _a.sent();
                        pivot = h;
                        _a.label = 11;
                    case 11:
                        if (!(lo < pivot - 1)) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.quickSort(lo, pivot - 1)];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13:
                        if (!(hi > pivot + 1)) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.quickSort(pivot + 1, hi)];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    return QuickSort;
}(Sort));
export { QuickSort };
