import Big from 'big.js';
let loop = Number(process.argv[2])+1;
Big.DP = 1000;
let x = new Big(1.0);
let y = new Big(1.0);
while (y.lt(loop)) {
    console.log(y + " : " + x.div(y).toFixed(50));
    y = y.add(1);
}
