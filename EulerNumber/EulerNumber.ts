const n = 1 << 20;
const rate = 1;
const t = 2;
const periodRate = rate / n;
var fn = 1;

for (let i = 0; i < n * t; i++) 
    fn += fn * periodRate;

console.log('n =\t\t', n);
console.log('fn =\t\t', fn);

console.log('EulerFn =', '\t', Math.pow(1 + rate / n, n * t));

console.log('E Power =', '\t', Math.pow(Math.E, t));

console.log('Math.E =', '\t', Math.E);