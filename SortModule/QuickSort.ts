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
      let x: any = -1;
      while (l < h) {
        while (x < 0) {
          x = await this.compareData(pivot, h);
          if (x < 0) h--;
        }
        while (l < h && x >= 0) {
          x = await this.compareData(pivot, l)
          if (x >= 0) l++;
        }
        if (l < h) {
          if (h == pivot) pivot = l;
          await this.swapData(l, h);
        }
      }
      if (pivot < h) {
        x = await this.compareData(pivot, h);
        if (x !== 0) await super.swapData(h, pivot);
        pivot = h;
      }
      if (lo < pivot - 1) await this.quickSort(lo, pivot - 1);
      if (hi > pivot + 1) await this.quickSort(pivot + 1, hi);
    }
  }