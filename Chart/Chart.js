var Chart = /** @class */ (function () {
    function Chart(canvasName, dataX, dataY) {
        this.cv = document.getElementById(canvasName);
        this.cx = this.cv.getContext("2d");
        this.imgData = this.cx.createImageData(this.cv.width, this.cv.height);
        this.color = Chart.COLORS[Math.floor(Math.random() * 8)];
        this.createChart(dataX, dataY);
    }
    Chart.prototype.createChart = function (dataX, dataY) {
        this.dataX = dataX;
        this.dataY = dataY;
        this.findMinMax();
        this.dx = this.cv.width / (this.maxX - this.minX) * 0.9;
        this.dy = this.cv.height / (this.maxY - this.minY) * 0.9;
        console.log('dx =', this.dx, 'dy =', this.dy);
        this.xAxis = Math.floor(this.cv.height / 2) + Math.floor((this.maxY + this.minY) / 2 * this.dy);
        this.yAxis = Math.floor(this.cv.width / 2) - Math.floor((this.maxX + this.minX) / 2 * this.dx);
        this.plot();
    };
    Chart.prototype.findMinMax = function () {
        this.minX = this.dataX[0];
        this.maxX = this.dataX[0];
        this.minY = this.dataY[0];
        this.maxY = this.dataY[0];
        for (var i = 1; i < this.dataX.length; i++) {
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
    };
    Chart.prototype.plot = function () {
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
        var x = 0;
        var y = 0;
        for (var i = 0; i < this.dataX.length; i++) {
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
    };
    Chart.prototype.clickXY = function (event) {
        var x = event.offsetX - this.yAxis;
        var y = this.xAxis - event.offsetY;
        x = Math.round(x / this.dx * 100) / 100;
        y = Math.round(y / this.dy * 100) / 100;
        alert("X = [ " + x + " ]          Y = [ " + y + " ]");
    };
    Chart.prototype.createTestData1 = function () {
        var n = 800;
        var pc = n / 4;
        var x = -n / 2;
        var y = 0;
        this.dataX = new Array(n);
        this.dataY = new Array(n);
        var i = 0;
        while (x < n / 2) {
            y = Math.sin(Math.PI / pc * x);
            this.dataX[i] = x;
            this.dataY[i] = y;
            i++;
            x++;
        }
        this.createChart(this.dataX, this.dataY);
    };
    Chart.prototype.createTestData2 = function () {
        var n = 1000;
        this.dataX = new Array(n);
        this.dataY = new Array(n);
        for (var i = 0; i < n; i++) {
            this.dataX[i] = Math.cos(2 * Math.PI * (i + 1) / n);
            this.dataY[i] = Math.sin(2 * Math.PI * (i + 1) / n);
        }
        this.createChart(this.dataX, this.dataY);
    };
    Chart.COLORS = ['magenta', 'cyan', 'lime', 'white', 'yellow', 'orange', 'pink'];
    return Chart;
}());
function clickClick(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    console.log("X=", x, " Y=", y);
}
