const n = 1 << 20;
const rate = 1;
const t = 1;
const periodRate = rate / n;
var fn = 1;

for (let i = 0; i < n * t; i++) 
    fn += fn * periodRate;

console.log('n =\t', n);
console.log('fn =\t', fn);

console.log('Math.E', '\t', Math.E);