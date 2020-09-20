// Class 
class Circle {
    static COLORS = ['magenta', 'cyan', 'blue', 'green', 'yellow', 'orange', 'red'];
    // private static cv = document.getElementById("myCanvas") as HTMLCanvasElement;
    // private static  cx = Circle.cv.getContext("2d") as CanvasRenderingContext2D;
    static PI2 = Math.PI * 2;

    x: number;
    y: number;
    radius: number = 10;
    r2: number;
    color: string = 'Grey';
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.floor(Math.random() * 30) + 11;
        this.color = Circle.COLORS[Math.floor(Math.random() * Circle.COLORS.length)];
        this.r2 = this.radius * this.radius;
    }
    draw() {
        cx.shadowBlur = 10;
        cx.shadowColor = "Grey";
        cx.fillStyle = this.color;
        cx.beginPath()
        cx.arc(this.x, this.y, this.radius, 0, Circle.PI2);
        cx.closePath();
        cx.fill();
    }
    isClickIn(x: number, y: number): boolean {
        let c2 = (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y);
        return c2 <= this.r2;
    }
}

// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
const cv = document.getElementById("myCanvas") as HTMLCanvasElement;
const cx = cv.getContext("2d") as CanvasRenderingContext2D;

var data: Circle[] = new Array(10);
var size: number = 0;

// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------

// Function
// ----------------------------------------------------------------------------
// async function calculate() {
//     paint();
//     await new Promise(r => setTimeout(r, 10));
// }

function clickXY(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
//    console.log(x, y);
    // เช็คว่าคลิกโดนวงกลมวงใดวงหนึ่งหรือไม่
    let found: number = -1;
    for (let i = 0; i < size && found == -1; i++) {
        if (data[i].isClickIn(x, y))
            found = i;
    }
    if (found == -1) {
        // ถ้าคลิกไม่โดนวงกลม ให้เพิ่มวงใหม่
        // ถ้าขนาดอาเรย์ เต็มแล้วให้ขยายไปยังอาเรย์ตัวใหม่ ใหญขึ้น 2 เท่า
        if (size == data.length) {
            let newData: Circle[] = new Array(data.length * 2);
            for (let i = 0; i < size; i++)
                newData[i] = data[i];
            data = newData;
        }
        // เพิ่มวงกลมวงใหม่
        data[size++] = new Circle(x, y);
    } else {
        // ลบวงกลมที่คลิกโดน
        for (let i = found + 1; i < size; i++)
            data[i - 1] = data[i];
        size--;
    }

    paint();
}

function paint() {
    cx.clearRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < size; i++)
        data[i].draw();
}
