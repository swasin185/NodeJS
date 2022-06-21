import Sort from "./Sort.js"
export default class BubbleSort extends Sort {
    public constructor(n: number, canvasId: string) {
        super(n, canvasId);
    }

    public async runSort() {
        super.runSort();
        let sorted = false;
        let x: any = -1;
        for (let i = 1; i < this.arr.length && !sorted; i++) {
            sorted = true;
            for (let j = 1; j < this.arr.length - i + 1; j++) {
                x = await this.compareData(j, j - 1);
                if (x < 0) {
                  await super.swapData(j, j - 1);
                  sorted = false;
                }
            }
        }
    }
}
