// Class 
class Circle {
    private static colors = ['magenta', 'cyan', 'blue', 'green', 'yellow', 'orange', 'red'];
    // private static cv = document.getElementById("myCanvas") as HTMLCanvasElement;
    // private static  cx = Circle.cv.getContext("2d") as CanvasRenderingContext2D;
    private static pi2 = Math.PI * 2;

    private x: number;
    private y: number;
    private radius: number = 10;
    private color: string = 'Grey';
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.floor(Math.random() * 30) + 11;
        this.color = Circle.colors[Math.floor(Math.random() * Circle.colors.length)];
    }
    public paint() {
        cx.shadowBlur = 10;
        cx.shadowColor = "Grey";
        cx.fillStyle = this.color;
        cx.beginPath()
        cx.arc(this.x, this.y, this.radius, 0, Circle.pi2);
        cx.closePath();
        cx.fill();
    }
    public isClickIn(x: number, y: number): boolean {
        let a2 = x - this.x;
        a2 *= a2;
        let b2 = y - this.y;
        b2 *= b2;
        let c2 = this.radius * this.radius;
        return (a2 + b2) <= c2;
    }
}

// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
const cv = document.getElementById("myCanvas") as HTMLCanvasElement;
const cx = cv.getContext("2d") as CanvasRenderingContext2D;

const WIDTH = cv.width;
const HEIGHT = cv.height;
const MID_WIDTH = cv.width / 2;
const MID_HEIGHT = cv.height / 2;

var data: Circle[] = new Array(100);
var size: number = 0;

// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
calculate();

// ฟังก์ชั่น
// ----------------------------------------------------------------------------
async function calculate() {
    // paint();
    // for (let i = 0; i < 150; i++) {
    //     ball.y += 5;
    //     //ball.paint();
    //     paint();
    //     await new Promise(r => setTimeout(r, 10));
    // }
}

function clickXY(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
    let found: number = -1;
    for (let i = 0; i < size && found == -1; i++) {
        if (data[i].isClickIn(x, y))
            found = i;
    }
    if (found == -1) {
        if (size = data.length) {
            let newData: Circle[] = new Array(data.length * 2);
            for (let i = 0; i < size; i++)
                newData[i] = data[i]
            data = newData;
        }
        data[size++] = new Circle(x, y);
    } else {
        for (let i = found + 1; i < size; i++)
            data[i - 1] = data[i]
        size--;
    }
    paint();
}

function paint() {
    cx.clearRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < size; i++)
        data[i].paint();
}
