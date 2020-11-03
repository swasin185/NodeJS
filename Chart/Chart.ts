class Chart {
    private static COLORS = ['magenta', 'cyan', 'lime', 'white', 'yellow', 'orange', 'pink'];
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

    private imgData;
    private color: string;

    constructor(canvasName: string, dataX: number[], dataY: number[]) {
        this.cv = document.getElementById(canvasName) as HTMLCanvasElement;
        this.cx = this.cv.getContext("2d") as CanvasRenderingContext2D;
        this.imgData = this.cx.createImageData(this.cv.width, this.cv.height);
        this.color = Chart.COLORS[Math.floor(Math.random() * 8)];
        this.createChart(dataX, dataY);
    }

    public createChart(dataX: number[], dataY: number[]) {
        this.dataX = dataX;
        this.dataY = dataY;
        this.findMinMax();
        this.dx = this.cv.width / (this.maxX - this.minX) * 0.9;
        this.dy = this.cv.height / (this.maxY - this.minY) * 0.9;
        console.log('dx =', this.dx, 'dy =', this.dy);
        this.xAxis = Math.floor(this.cv.height / 2) + Math.floor((this.maxY + this.minY) / 2 * this.dy);
        this.yAxis = Math.floor(this.cv.width / 2) - Math.floor((this.maxX + this.minX) / 2 * this.dx);
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
        this.cx.strokeStyle = "grey";
        this.cx.clearRect(0, 0, this.cv.width, this.cv.height);
        this.cx.beginPath();
        this.cx.moveTo(0, this.xAxis);
        this.cx.lineTo(this.cv.width, this.xAxis);
        this.cx.moveTo(this.yAxis, 0);
        this.cx.lineTo(this.yAxis, this.cv.height);
        this.cx.closePath();
        this.cx.stroke();

        this.cx.strokeStyle = this.color;
        this.cx.beginPath();
        this.cx.closePath();
        // let img = this.imgData.data;
        // let coor = 0;
        let x = 0;
        let y = 0;

        for (let i = 0; i < this.dataX.length; i++) {
            x = this.yAxis + this.dataX[i] * this.dx;
            y = this.xAxis - this.dataY[i] * this.dy;
            // if (i == 0)
            //     this.cx.moveTo(x, y);
            // else
            //     this.cx.lineTo(x, y);
            this.cx.moveTo(x - 1, y);
            this.cx.lineTo(x + 1, y);
            this.cx.moveTo(x, y - 1);
            this.cx.lineTo(x, y + 1);

            // coor = Math.round(y * this.cv.width * 0.9) + x * 4;
            // img[coor] = 255; // RED
            // img[++coor] = 255; // GREEN
            // img[++coor] = 128; // BLUE
            // img[++coor] = 255; // ALPHA
        }
        //this.cx.closePath();
        this.cx.stroke();

        //this.cx.putImageData(this.imgData, 0, 0);
    }

    public clickXY(event: MouseEvent) {
        let x = event.offsetX - this.yAxis;
        let y = this.xAxis - event.offsetY;
        x = Math.round(x / this.dx * 100) / 100;
        y = Math.round(y / this.dy * 100) / 100;
        alert("X = [ " + x + " ]          Y = [ " + y + " ]");
    }

    public createTestData1(): void {
        let n = 800;
        let pc = n / 4;
        let x = -n / 2;
        let y = 0;

        this.dataX = new Array(n);
        this.dataY = new Array(n);
        let i = 0;
        while (x < n / 2) {
            y = Math.sin(Math.PI / pc * x);
            this.dataX[i] = x;
            this.dataY[i] = y;
            i++;
            x++;
        }
        this.createChart(this.dataX, this.dataY);
    }

    public createTestData2(): void {
        let n = 1000;
        this.dataX = new Array(n);
        this.dataY = new Array(n);
        for (let i = 0; i < n; i++) {
            this.dataX[i] = Math.cos(2 * Math.PI * (i + 1) / n);
            this.dataY[i] = Math.sin(2 * Math.PI * (i + 1) / n);
        }
        this.createChart(this.dataX, this.dataY);
    }

}

function clickClick(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
    console.log("X=", x, " Y=", y);
}