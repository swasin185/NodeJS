var size = 50;
var x = -2.0;
var y = 1.0;
var dx = x / size;
var dy = y / size * 2;
for (var row = 0; row < size; row++) {
    x = -2.0;
    for (var col = 0; col < size * 1.5; col++) {
        var xn = x;
        var yn = y;
        var x_ = 0;
        var n = 0;
        while (n < size && (xn * xn + yn * yn) < 4) {
            x_ = (xn * xn - yn * yn) + x;
            yn = (xn * yn + yn * xn) + y;
            xn = x_;
            n++;
        }
        x -= dx;
        if (n == size)
            process.stdout.write(' ');
        else
            process.stdout.write('+');
    }
    process.stdout.write('\n');
    y -= dy;
}
