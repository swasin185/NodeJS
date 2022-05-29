export default abstract class Sort {
  protected arr: number[];
  private canvasId: string;
  private canvas: any;
  private ctx: any;
  protected swap: number = 0;
  protected compare: number = 0;
  private temp: number = 0;
  constructor(n: number, canvasId: string) {
    this.canvasId = canvasId;
    this.arr = new Array(n);
    for (let i = 0; i < this.arr.length; i++) this.arr[i] = i + 1;
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

  protected repaint(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.arr.length; i++) {
      //this.ctx.fillRect(x, y, width, height)
      this.ctx.fillRect(10 + i * 3, 150, 2, -this.arr[i]);
    }
    this.ctx.fillText(
      "compare=" + this.compare + " swap=" + this.swap,
      30,
      190
    );
  }

  protected async swapData(i: number, j: number) {
    this.swap++;
    this.temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = this.temp;
    this.repaint();
    await new Promise((r) => setTimeout(r, 10));
  }

  protected async compareData(x: number, y: number) {
    this.compare++;
    await new Promise((r) => setTimeout(r, 10));
    return this.arr[x] - this.arr[y];
  }

  protected runSort(): void {
    this.swap = 0;
    this.compare = 0;
  }
}

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
        await this.compareData(j, j - 1).then(async (result) => {
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
        await this.compareData(max, j).then((result) => {
          if (result < 0) max = j;
        });
      }
      this.compare++;
      await this.compareData(i, max).then(async (result) => {
        if (result < 0) await super.swapData(i, max);
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
        await this.compareData(j, j - 1).then(async (result) => {
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
    let pivot = Math.floor((lo + hi) / 2);
    let l = lo;
    let h = hi;
    let x = -1;
    while (l < h) {
      while (await this.compareData(pivot, h) < 0) 
        h--;
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
