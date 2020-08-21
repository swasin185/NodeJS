// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
var canvas1 = document.getElementById("myCanvas"); // as HTMLCanvasElement;
var ctx1 = canvas1.getContext("2d"); // as CanvasRenderingContext2D;
// การทำงานเริ่มต้น
// ----------------------------------------------------------------------------
ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
ctx1.moveTo(canvas1.width, 0);
ctx1.lineTo(0, 0);
ctx1.lineTo(0, canvas1.height);
ctx1.stroke();
ctx1.fillText("width", canvas1.width / 2, 10);
ctx1.fillText("height", 5, canvas1.height / 2);
ctx1.fillStyle = 'blue';
ctx1.fillRect(0, 0, 20, 20);
ctx1.strokeStyle = 'red';
ctx1.strokeRect(50, 50, 30, 20);
ctx1.strokeStyle = 'green';
ctx1.beginPath();
ctx1.arc(100, 100, 10, 0, 2 * Math.PI, false);
ctx1.stroke();
function getXY(event) {
    var rect = canvas1.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    x = event.offsetX;
    y = event.offsetY;
    console.log("X=", x, " Y=", y);
}
