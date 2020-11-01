class Chart {
    private cv: HTMLCanvasElement;
    private cx: CanvasRenderingContext2D;
    private dataX: number[];
    private dataY: number[];
    private xAxis: number;
    private yAxis: number;
    private dx: number;
    private dy: number;

    private minX: number;
    private maxX: number;

    private minY: number;
    private maxY: number;

    constructor(canvasName: string, dataX: number[], dataY: number[]) {
        this.cv = document.getElementById(canvasName) as HTMLCanvasElement;
        this.cx = this.cv.getContext("2d") as CanvasRenderingContext2D;
        this.dataX = dataX;
        this.dataY = dataY;
        this.findMinMax();
        this.dx = Math.floor(this.cv.width / (this.maxX - this.minX + 1));
        this.dy = Math.floor(this.cv.height / (this.maxY - this.minY + 1));
        console.log('dx =', this.dx, 'dy =', this.dy);
        console.log(Math.floor((this.maxY + this.minY + 1) / 2) * this.dy);
        this.xAxis = Math.floor(this.cv.height / 2) + Math.floor((this.maxY + this.minY + 1) / 2) * this.dy;
        this.yAxis = Math.floor(this.cv.width / 2) - Math.floor((this.maxX + this.minX + 1) / 2) * this.dx;
        this.plot();
    }

    private findMinMax(): void {
        this.minX = this.dataX[0];
        this.maxX = this.dataX[0];
        this.minY = this.dataY[0];
        this.maxY = this.dataY[0];
        for (let i = 1; i < this.dataX.length; i++) {
            if (this.dataX[i] < this.minX)
                this.minX = this.dataX[i];
            if (this.dataY[i] < this.minY)
                this.minY = this.dataY[i];
            if (this.dataX[i] > this.maxX)
                this.maxX = this.dataX[i];
            if (this.dataY[i] > this.maxY)
                this.maxY = this.dataY[i];
        }
        console.log('min X =', this.minX, 'max X =', this.maxX);
        console.log('min Y =', this.minY, 'max Y =', this.maxY);
    }

    public plot(): void {
        this.cx.fillStyle = "orange";
        this.cx.strokeStyle = "grey";
        this.cx.clearRect(0, 0, this.cv.width, this.cv.height);
        this.cx.beginPath();
        this.cx.moveTo(0, this.xAxis);
        this.cx.lineTo(this.cv.width, this.xAxis);
        this.cx.moveTo(this.yAxis, 0);
        this.cx.lineTo(this.yAxis, this.cv.height);
        this.cx.closePath();
        this.cx.stroke();

        let x = 0;
        let y = 0;
        //        this.cx.beginPath();
        for (let i = 0; i < this.dataX.length; i++) {
            x = this.yAxis + Math.round(this.dataX[i] * this.dx);
            y = this.xAxis - Math.round(this.dataY[i] * this.dy);
            this.cx.fillRect(x - 1, y - 1, 2, 2);
        }
        //        this.cx.closePath();
        this.cx.fill();
    }

    public clickXY(event: MouseEvent) {
        let x = event.offsetX - this.yAxis;
        let y = this.xAxis - event.offsetY;
        x = Math.round(x / this.dx * 100) / 100;
        y = Math.round(y / this.dy * 100) / 100;
        alert("X=" + x + " Y=" + y);
    }
}

function clickClick(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
    console.log("X=", x, " Y=", y);
}