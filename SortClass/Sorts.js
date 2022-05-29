var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Sort {
    constructor(n, canvasId) {
        this.swap = 0;
        this.compare = 0;
        this.temp = 0;
        this.canvasId = canvasId;
        this.arr = new Array(n);
        for (let i = 0; i < this.arr.length; i++)
            this.arr[i] = i + 1;
        for (let i = 0; i < this.arr.length; i++) {
            let a = this.arr[i];
            let x = Math.floor(Math.random() * this.arr.length);
            this.arr[i] = this.arr[x];
            this.arr[x] = a;
        }
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.repaint();
    }
    repaint() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.arr.length; i++) {
            //this.ctx.fillRect(x, y, width, height)
            this.ctx.fillRect(10 + i * 3, 150, 2, -this.arr[i]);
        }
        this.ctx.fillText("compare=" + this.compare + " swap=" + this.swap, 30, 190);
    }
    swapData(i, j) {
        return __awaiter(this, void 0, void 0, function* () {
            this.swap++;
            this.temp = this.arr[i];
            this.arr[i] = this.arr[j];
            this.arr[j] = this.temp;
            this.repaint();
            yield new Promise((r) => setTimeout(r, 10));
        });
    }
    compareData(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            this.compare++;
            yield new Promise((r) => setTimeout(r, 10));
            return this.arr[x] - this.arr[y];
        });
    }
    runSort() {
        this.swap = 0;
        this.compare = 0;
    }
}
export class BubbleSort extends Sort {
    constructor(n, canvasId) {
        super(n, canvasId);
    }
    runSort() {
        const _super = Object.create(null, {
            runSort: { get: () => super.runSort },
            swapData: { get: () => super.swapData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.runSort.call(this);
            let sorted = false;
            for (let i = 1; i < this.arr.length && !sorted; i++) {
                sorted = true;
                for (let j = 1; j < this.arr.length - i + 1; j++) {
                    yield this.compareData(j, j - 1).then((result) => __awaiter(this, void 0, void 0, function* () {
                        if (result < 0) {
                            yield _super.swapData.call(this, j, j - 1);
                            sorted = false;
                        }
                    }));
                }
            }
        });
    }
}
export class SelectSort extends Sort {
    constructor(n, canvasId) {
        super(n, canvasId);
    }
    runSort() {
        const _super = Object.create(null, {
            runSort: { get: () => super.runSort },
            swapData: { get: () => super.swapData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.runSort.call(this);
            for (let i = this.arr.length - 1; i > 0; i--) {
                let max = i;
                for (let j = 0; j < i; j++) {
                    yield this.compareData(max, j).then((result) => {
                        if (result < 0)
                            max = j;
                    });
                }
                this.compare++;
                yield this.compareData(i, max).then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result < 0)
                        yield _super.swapData.call(this, i, max);
                }));
            }
        });
    }
}
export class InsertSort extends Sort {
    constructor(n, canvasId) {
        super(n, canvasId);
    }
    runSort() {
        const _super = Object.create(null, {
            runSort: { get: () => super.runSort }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.runSort.call(this);
            for (let i = 1; i < this.arr.length; i++) {
                let j = i;
                let x = -1;
                while (x < 0) {
                    yield this.compareData(j, j - 1).then((result) => __awaiter(this, void 0, void 0, function* () {
                        if (result < 0) {
                            yield this.swapData(j, j - 1);
                            j--;
                        }
                        x = result;
                    }));
                }
            }
        });
    }
}
export class QuickSort extends Sort {
    constructor(n, canvasId) {
        super(n, canvasId);
    }
    runSort() {
        const _super = Object.create(null, {
            runSort: { get: () => super.runSort }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.runSort.call(this);
            yield this.quickSort(0, this.arr.length - 1);
        });
    }
    quickSort(lo, hi) {
        const _super = Object.create(null, {
            swapData: { get: () => super.swapData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let pivot = Math.floor((lo + hi) / 2);
            let l = lo;
            let h = hi;
            let x = -1;
            while (l < h) {
                while ((yield this.compareData(pivot, h)) < 0)
                    h--;
                while (l < h && x >= 0)
                    yield this.compareData(pivot, l).then((result) => {
                        if (result >= 0)
                            l++;
                        x = result;
                    });
                if (l < h) {
                    if (h == pivot)
                        pivot = l;
                    yield this.swapData(l, h);
                }
            }
            if (pivot < h) {
                yield this.compareData(pivot, h).then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result !== 0)
                        yield _super.swapData.call(this, h, pivot);
                }));
                pivot = h;
            }
            if (lo < pivot - 1)
                yield this.quickSort(lo, pivot - 1);
            if (hi > pivot + 1)
                yield this.quickSort(pivot + 1, hi);
        });
    }
}
