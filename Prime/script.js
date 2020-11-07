var dataX;
var dataY;
var chart1;
//var Chart = require('Chart');

//var url = './prime.txt';
var url = 'http://localhost:8000/api/primeFile';
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
			//let histPrime = new Array(32);
			//histPrime.fill(0);
            for (let i = 0; i < data.length - 1; i++) {
                x = Number(data[i]);
                let z = x;
                let j = 0;
				//for (let k = 0; k<z.length && k < 10; k++)
				//	if (z.charAt(k)=='1') 
				//		j++;
                while (z > 1 && j++ < iteration) {
                    if (z % 2 == 0)
                        z = z / 2;
                   else
                        z = z * 3 + 1;
                }
                dataX[i] = x;
                dataY[i] = j;
				//histPrime[j] ++;
            }
			
			//console.log(histPrime);

            chart1 = new Chart('chart1', dataX, dataY);
        });
    });



