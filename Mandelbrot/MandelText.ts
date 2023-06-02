const size = 50
var x = -2.0
var y = 1.0
const dx = x / size
const dy = y / size * 2 

for (let row = 0; row < size; row++) {
    x = -2.0
    for (let col = 0; col < size * 1.5; col++) {
        let xn = x
        let yn = y
        let x_ = 0
        let n = 0
        while (n < size && (xn * xn + yn * yn) < 4) {
            x_ = (xn * xn - yn * yn) + x 
            yn = (xn * yn + yn * xn) + y 
            xn = x_
            n++
        } 
        x -= dx
        if (n == size)
	    process.stdout.write(' ') 
        else
	    process.stdout.write('+')
    }
    y -= dy
    process.stdout.write('\n')
}

