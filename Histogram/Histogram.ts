const range = 10;
const n = Math.pow(2, range-1) * 3;
const size = 100000;

var frequency: number[] = new Array(range);
frequency.fill(0);
var data: number;
for (let i = 0; i < size; i++) {
    data = Math.floor(Math.random() * n);
    frequency[countBit1(data)]++;
    //frequency[leadDigit(data)]++;
}
console.log('range=', range);
console.log('n=',n);
console.log(frequency);

var percents: number[] = new Array(range);
for (let i=0; i<frequency.length; i++) {
    percents[i] = Math.round((frequency[i] / size * 100) * 100 ) / 100;
}
console.log(percents);

function countBit1(x: number): number {
    let bit = 0;
    let s: string = x.toString(2);
    for (let i = 0; i < s.length; i++)
        if (s.charAt(i) == '1')
            bit++;
    return bit;
}

function leadDigit(x: number): number {
    let s: string = x.toString();
    return Number(s.charAt(0));
}