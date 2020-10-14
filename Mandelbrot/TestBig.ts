import Big from 'big.js';
var bigA = new Big(0.1);
var bigB = new Big(0.2);
var bigC = bigA.add(bigB);
console.log(bigA, bigB);
console.log(bigA.toString(), '+', bigB.toString(), '=', bigC.toNumber())

bigC = bigA;
for (let i = 0; i < 20; i++)
    bigC = bigC.mul(bigB);
console.log(bigA.toString(), 'x', bigB.toString(), '=', bigC.toNumber())
console.log(bigC.round(20));