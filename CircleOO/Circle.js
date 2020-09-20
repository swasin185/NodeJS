// Class 
var Circle = /** @class */ (function () {
    function Circle(x, y) {
        this.radius = 10;
        this.color = 'Grey';
        this.x = x;
        this.y = y;
        this.radius = Math.floor(Math.random() * 30) + 11;
        this.color = Circle.COLORS[Math.floor(Math.random() * Circle.COLORS.length)];
        this.r2 = this.radius * this.radius;
    }
    Circle.prototype.draw = function () {
        cx.shadowBlur = 10;
        cx.shadowColor = "Grey";
        cx.fillStyle = this.color;
        cx.beginPath();
        cx.arc(this.x, this.y, this.radius, 0, Circle.PI2);
        cx.closePath();
        cx.fill();
    };
    Circle.prototype.isClickIn = function (x, y) {
        var c2 = (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y);
        return c2 <= this.r2;
    };
    Circle.COLORS = ['magenta', 'cyan', 'blue', 'green', 'yellow', 'orange', 'red'];
    // private static cv = document.getElementById("myCanvas") as HTMLCanvasElement;
    // private static  cx = Circle.cv.getContext("2d") as CanvasRenderingContext2D;
    Circle.PI2 = Math.PI * 2;
    return Circle;
}());
// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
var cv = document.getElementById("myCanvas");
var cx = cv.getContext("2d");
var data = new Array(10);
var size = 0;
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
// Function
// ----------------------------------------------------------------------------
// async function calculate() {
//     paint();
//     await new Promise(r => setTimeout(r, 10));
// }
function clickXY(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    //    console.log(x, y);
    // เช็คว่าคลิกโดนวงกลมวงใดวงหนึ่งหรือไม่
    var found = -1;
    for (var i = 0; i < size && found == -1; i++) {
        if (data[i].isClickIn(x, y))
            found = i;
    }
    if (found == -1) {
        // ถ้าคลิกไม่โดนวงกลม ให้เพิ่มวงใหม่
        // ถ้าขนาดอาเรย์ เต็มแล้วให้ขยายไปยังอาเรย์ตัวใหม่ ใหญขึ้น 2 เท่า
        if (size == data.length) {
            var newData = new Array(data.length * 2);
            for (var i = 0; i < size; i++)
                newData[i] = data[i];
            data = newData;
        }
        // เพิ่มวงกลมวงใหม่
        data[size++] = new Circle(x, y);
    }
    else {
        // ลบวงกลมที่คลิกโดน
        for (var i = found + 1; i < size; i++)
            data[i - 1] = data[i];
        size--;
    }
    paint();
}
function paint() {
    cx.clearRect(0, 0, cv.width, cv.height);
    for (var i = 0; i < size; i++)
        data[i].draw();
}
