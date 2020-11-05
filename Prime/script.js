var dataX;
var dataY;
var chart1;
//var Chart = require('Chart');

var url = './prime.txt';
var storedText;

fetch(url)
    .then(function (response) {
        response.text().then(function (text) {
            let data = text.split('\n');
            dataX = new Array(data.length - 1);
            dataY = new Array(data.length - 1);
            let p = 0;
            // for (let i = 0; i < data.length - 1; i++) {
            //     p = Number(data[i]);
            //     dataX[i] = Math.cos(p) * p;
            //     dataY[i] = Math.sin(p) * p;
            // }
            let iteration = 1000;
            let x = 1;
            for (let i = 0; i < data.length - 1; i++) {
                x = Number(data[i]);
                let z = x;
                let j = 0;
                while (z > 1 && j++ < iteration) {
                    if (z % 2 == 0)
                        z = z / 2;
                    else
                        z = z * 3 + 1;
                }
                dataX[i] = x;
                dataY[i] = j;
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
