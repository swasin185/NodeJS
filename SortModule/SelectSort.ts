import Sort from "./Sort.js"
export default class SelectSort extends Sort {
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
