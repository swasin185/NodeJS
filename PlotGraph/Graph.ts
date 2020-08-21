// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
const cv: any = document.getElementById("myGraph") // as HTMLCanvasElement;
const cx: any = cv.getContext("2d") // as CanvasRenderingContext2D;

const n = 10;
const sx = Math.floor(cv.width / n);
const sy = Math.floor(cv.height / n);
const hx = Math.floor(sx / 2);
const hy = Math.floor(sy / 2);


// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
for (let x = 0; x < n; x++) {
    cx.moveTo(x * sx, 0);
    cx.lineTo(cv.width, cv.height - (x * sy));

    cx.moveTo((x + 1) * sx, 0);
    cx.lineTo(0, (x + 1) * sy);

    cx.moveTo(0, (x + 1) * sy);
    cx.lineTo(cv.width - (x + 1) * sx, cv.height);

    cx.moveTo((x + 1) * sx, cv.height);
    cx.lineTo(cv.width, (x + 1) * sy);

    let X = x * sx + hx;
    for (let y = 0; y < n; y++) {
        let Y = y * sy + hy;
        cx.moveTo(X, Y - 10);
        cx.lineTo(X, Y + 10);
        cx.moveTo(X - 10, Y);
        cx.lineTo(X + 10, Y);
        if (x > 0 && y > 0) {
            cx.moveTo(X - hx, Y - hy - 10);
            cx.lineTo(X - hx, Y - hy + 10);
            cx.moveTo(X - hx - 10, Y - hy);
            cx.lineTo(X - hx + 10, Y - hy);
        }
    }
}
cx.stroke();

function getXY(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
    console.log("X=", x, " Y=", y);
}