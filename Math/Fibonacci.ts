let a : number = 0;
let b : number = 1;
console.log(0.1 + 0.2);
for (let i=1; i<=34; i++) { 
  b += a;
  a = b - a;
  console.log(i + "\t" + a + "\t\t" + b + "\t\t:\t" + (b / a));
  console.log(i + "\t\t\t\t\t\t" + (Math.round(1E15 * b / a) / 1E15));
} 
