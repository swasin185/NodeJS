import Sort from "./Sort.js"

export default class QuickSort extends Sort {
    public constructor(n: number, canvasId: string) {
      super(n, canvasId);
    }
  
    public async runSort() {
      super.runSort();
      await this.quickSort(0, this.arr.length - 1);
    }
  
    private async quickSort(lo: number, hi: number) {
      let pivot = Math.floor((lo + hi) / 2);
      let l = lo;
      let h = hi;
      let x = -1;
      while (l < h) {
        while (x < 0)
          await this.compareData(pivot, h).then((result) => {
            if (result < 0) h--;
            x = result;
          });
        while (l < h && x >= 0)
          await this.compareData(pivot, l).then((result) => {
            if (result >= 0) l++;
            x = result;
          });
        if (l < h) {
          if (h == pivot) pivot = l;
          await this.swapData(l, h);
        }
      }
      if (pivot < h) {
        await this.compareData(pivot, h).then(async (result) => {
          if (result !== 0) await super.swapData(h, pivot);
        });
        pivot = h;
      }
      if (lo < pivot - 1) await this.quickSort(lo, pivot - 1);
      if (hi > pivot + 1) await this.quickSort(pivot + 1, hi);
    }
  }