import Sort from "./Sort.js"

export default class InsertSort extends Sort {
    public constructor(n: number, canvasId: string) {
      super(n, canvasId);
    }
  
    public async runSort() {
      super.runSort();
      for (let i = 1; i < this.arr.length; i++) {
        let j = i;
        let x = -1;
        while (j > 0 && x < 0) {
          x = await this.compareData(j, j - 1);
          if (x < 0) {
            await this.swapData(j, j - 1);
            j--;
          }
        }
      }
    }
  }