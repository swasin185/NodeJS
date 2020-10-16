import Big from 'big.js';
Big.DP = 40;
var bigA = new Big(0.1);
var bigB = new Big(0.2);
var bigC = bigA.add(bigB);
console.log(bigA.toString(), '+', bigB.toString(), '=', bigC.toNumber())

bigC = bigA;
for (let i = 0; i < 20; i++)
    bigC = bigC.mul(bigB);
console.log(bigC.round(20).toFixed());

const baseDigit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let n = new Big('1234.65625');

let a = n.round(0, 0);
let b = n.minus(a);
let base = 16;
let x = '';
while (a.gt(0)) {
    x = baseDigit[a.mod(base).toNumber()] + x;
    a = a.div(base).round(0, 0);
}
x += '.';

while (b.gt(0) && x.length < 40) {
    b = b.mul(base);
    let d = b.round(0, 0);
    x += baseDigit[d.mod(base).toNumber()];
    b = b.minus(d);

}

console.log(n.toFixed(), x, b.toFixed());