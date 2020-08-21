export abstract class Sort {
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

    protected repaint(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let i = 0; i < this.arr.length; i++) {
            //this.ctx.fillRect(x, y, width, height)
            this.ctx.fillRect(10 + (i * 3), 150, 2, -this.arr[i]);
        }
        this.ctx.fillText("compare=" + this.compare + " swap=" + this.swap, 30, 190);
    }

    protected async swapData(i: number, j: number) {
        this.swap++;
        this.temp = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = this.temp;
        this.repaint();
        await new Promise(r => setTimeout(r, 10));
    }

    protected async compareData(x: number, y: number) {
        this.compare++;
        await new Promise(r => setTimeout(r, 10));
        return this.arr[x] - this.arr[y]
    }


    protected runSort(): void {
        this.swap = 0;
        this.compare = 0;
    }
}

