function main() {
    for (let divisor = 1; divisor <= 9999; divisor++) {
        let dividend = 1;
        let point = 0;
        let digits = [];
        let history = new Map();
        let hist = []
        let recur = -1;
        do {
            let quotient = Math.floor(dividend / divisor);
            dividend = dividend % divisor * 10;
            if (point == 0)
                digits.push(".")
            else
                digits.push(quotient);
            point++;
            if (dividend != 0) {
                recur = hist.indexOf(dividend)
                if (recur == -1)
                    hist.push(dividend)
            }
            //recur = history.get(dividend);
            //if (history.size < 20)
            //    history.set(dividend, point);
        } while (dividend != 0 && recur == -1);

        if (dividend != 0)               
            digits.splice(recur+1, 0, "|");
        
        console.log('1 /', divisor,  "[" + (point-recur) + "]\t[" + (point-1) + "]\t",  
          digits.splice(0, 50).join(""));
    }
}

console.time();
main();
console.timeEnd();