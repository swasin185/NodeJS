var dataX;
var dataY;
var chart1;
//var Chart = require('Chart');

var url = './prime.txt';
var storedText;

fetch(url)
    .then(function (response) {
        response.text().then(function (text) {
            let p = text.split('\n');
            dataX = new Array(p.length - 1);
            dataY = new Array(p.length - 1);
            for (let i = 0; i < p.length - 1; i++) {
                dataX[i] = Number(p[i]);
                dataY[i] = i;
            }
            chart1 = new Chart('chart1', dataX, dataY);
        });
    });


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
