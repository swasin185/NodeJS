import {Sort} from './Sort.js'
export class BubbleSort extends Sort {
    public constructor(n: number, canvasId: string) {
        super(n, canvasId);
    }

    public async runSort() {
        super.runSort();
        let sorted = false;
        for (let i = 1; i < this.arr.length && !sorted; i++) {
            sorted = true;
            for (let j = 1; j < this.arr.length - i + 1; j++) {
                await this.compareData(j, j - 1).then(async result => {
                    if (result < 0) {
                        await super.swapData(j, j - 1);
                        sorted = false;
                    }
                });
            }
        }
    }
}

export class SelectSort extends Sort {
    public constructor(n: number, canvasId: string) {
        super(n, canvasId);
    }

    public async runSort() {
        super.runSort();
        for (let i = this.arr.length - 1; i > 0; i--) {
            let max = i;
            for (let j = 0; j < i; j++) {
                await this.compareData(max, j).then(result => {
                    if (result < 0)
                        max = j;
                });
            }
            this.compare++;
            await this.compareData(i, max).then(async result => {
                if (result < 0)
                    await super.swapData(i, max);
            });
        }
    }
}

export class InsertSort extends Sort {
    public constructor(n: number, canvasId: string) {
        super(n, canvasId);
    }

    public async runSort() {
        super.runSort();
        for (let i = 1; i < this.arr.length; i++) {
            let j = i;
            let x = -1;
            while (x < 0) {
                await this.compareData(j, j - 1).then(async result => {
                    if (result < 0) {
                        await this.swapData(j, j - 1);
                        j--;
                    }
                    x = result;
                });

            }
        }
    }
}

export class QuickSort extends Sort {
    public constructor(n: number, canvasId: string) {
        super(n, canvasId);
    }

    public async runSort() {
        super.runSort();
        await this.quickSort(0, this.arr.length - 1);
    }

    private async quickSort(lo: number, hi: number) {
        if (lo < hi) {
            let pivot = Math.floor((lo + hi) / 2);
            let l = lo;
            let h = hi;
            let x = -1;
            while (l < h) {
                while (x < 0)
                    await this.compareData(pivot, h).then(result => {
                        if (result < 0)
                            h--;
                        x = result;
                    });
                while (x >= 0)
                    await this.compareData(pivot, l).then(result => {
                        if (result >= 0)
                            l++;
                        x = result;
                    });
                if (l < h) {
                    if (h == pivot)
                        pivot = l;
                    await this.swapData(l, h);
                }
            }
            if (pivot < h) {
                await super.swapData(h, pivot);
                pivot = h;
            }
            await this.quickSort(lo, pivot - 1);
            await this.quickSort(pivot + 1, hi);
        }
    }
}