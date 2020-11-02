let fileName = './prime.txt';
let n = 1000;
let primeArray;
var dataX = new Array(n);
var dataY = new Array(n);
for (let i = 0; i < n; i++) {
    dataX[i] = i;
    dataY[i] = i * i
}


// let fs = require("fs");
// try {
//     let readData = fs.readFileSync(fileName, 'utf-8');
//     let p = readData.split('\n');
//     if (n < p.length - 1) {
//         n = p.length - 1;
//         primeArray = new Array(n);
//         for (let i = 0; i < n; i++)
//             primeArray[i] = new Big(p[i]);
//     }
//     console.log('read prime file', n);
// } catch (err) {
//     console.log(fileName + ' Error! ' + err);
// }
