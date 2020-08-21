import {Sort} from './Sort.js'
class BubbleSort extends Sort {
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
export { BubbleSort };