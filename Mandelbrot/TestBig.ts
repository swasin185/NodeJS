import Big from 'big.js';
var bigA = new Big(0.1);
var bigB= new Big(0.2);
var bigC = bigA.add(bigB);
console.log(bigA.toString(), '+', bigB.toString(), '=', bigC.toNumber())