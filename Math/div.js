function main() {
    for (var divisor = 1; divisor <= 9999; divisor++) {
        var dividend = 1;
        var point = 0;
        var digits = [];
        var history_1 = new Map();
        var recur = -1;
        do {
            var quotient = Math.floor(dividend / divisor);
            dividend = dividend % divisor * 10;
            if (point == 0)
                digits.push(".");
            else
                digits.push(quotient);
            point++;
            recur = history_1.get(dividend);
            if (history_1.size < 20)
                history_1.set(dividend, point);
        } while (dividend != 0 && point < divisor && recur == undefined);
        if (dividend != 0)
            digits.splice(recur, 0, "|");
        console.log('1 /', divisor, "[" + (point - recur) + "]\t[" + (point - 1) + "]\t", digits.splice(0, 50).join(""));
    }
}
console.time();
main();
console.timeEnd();
