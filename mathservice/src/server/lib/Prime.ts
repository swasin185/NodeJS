// npm install big.js
// npm install --save-dev @types/big.js
import Big from "big.js";
import fs from "fs";

export default class Prime {
    private static fileName = 'prime.txt';
    public static ONE = new Big(1);

    private static primeArray: Big[] = [Big(2), Big(3), Big(5), Big(7), Big(11), Big(13), Big(17), Big(19), Big(23)];
    private static n: number = Prime.primeArray.length;

    private static n_old = 0;
    public static readFile(): void {
        //let fs = require("fs");
        try {
            let readData = fs.readFileSync(Prime.fileName, 'utf-8');
            let p = readData.split('\n');
            if (Prime.n < p.length - 1) {
                Prime.n = p.length - 1;
                Prime.n_old = Prime.n;
                Prime.primeArray = new Array(Prime.n);
                for (let i = 0; i < Prime.n; i++)
                    Prime.primeArray[i] = new Big(p[i]);
            }
            console.log('read prime file', Prime.getLength(), Prime.getLastPrime().toFixed());
        } catch (err) {
            console.log(Prime.fileName + ' Error! ' + err);
            Prime.createPrimeArray("10000");
        }
    }

    public static saveFile(): void {
        if (Prime.n != Prime.n_old) {
            //let fs = require("fs");
            let data: string = '';
            for (let i = 0; i < Prime.n; i++)
                data += Prime.primeArray[i].toFixed() + '\n';
            fs.writeFileSync(Prime.fileName, data, 'utf-8');
            console.log('save to prime file', Prime.getLength(), Prime.getLastPrime().toFixed());
        } else {
            console.log('Prime file is not modified');
        }
    }

    private static searchPrime(x: Big): boolean {
        let found = -1
        let hi = Prime.n - 1;
        if (x.lte(Prime.primeArray[hi])) {
            let lo = 0;
            let mid = 0;
            while (lo <= hi && found == -1) {  // Binary Search
                mid = Math.floor((hi + lo) / 2);
                if (x.eq(Prime.primeArray[mid]))
                    found = mid;
                else
                    if (x.lt(Prime.primeArray[mid]))
                        hi = mid - 1;
                    else
                        lo = mid + 1;
            }
        }
        return found != -1;
    }

    public static findDivisor(x: Big): Big {
        let divisor = Prime.ONE;
        if (!Prime.searchPrime(x)) { // if not prime find divisor
            let sqrt: Big = x.sqrt();
            Prime.createPrimeArray(sqrt.toString());
            let i = 0;
            divisor = Prime.primeArray[i];
            while (i < Prime.n && divisor.lt(sqrt) && !x.mod(divisor).eq(0))
                divisor = Prime.primeArray[++i];
            if (i >= Prime.n || divisor.gt(sqrt))
                divisor = Prime.ONE;
        }
        return divisor;
    }

    public static isPrime(s: string): boolean {
        let x = new Big(s);
        return this.findDivisor(x).eq(1);
    }

    public static getPrime(i: number): Big {
        return Prime.primeArray[i];
    }
    public static getLastPrime() {
        return Prime.primeArray[Prime.n - 1];
    }

    public static getLength(): number {
        return this.n;
    }

    private static diffArray: number[];
    private static diffFile = 'primegap.txt';
    public static gapHistogram() {
        console.log("Prime Gap")
        Prime.diffArray = new Array(Prime.n);
        let diff = 0;
        Prime.diffArray[0] = 0;
        for (let i = 1; i < Prime.n; i++) {
            diff = Prime.primeArray[i].sub(Prime.primeArray[i - 1]).toNumber();
            diff = Math.floor(diff / 2);
            Prime.diffArray[i] = diff;
        }
        console.log(Prime.diffArray);
        let fs = require("fs");
        let data: string = '';
        for (let i = 0; i < Prime.n; i++)
            data += Prime.diffArray[i].toFixed() + '\n';
        fs.writeFileSync(Prime.diffFile, data, 'utf-8');
        console.log('save to prime gap file');
    }

    public static createPrimeArrayCount(n: number) {
        let time: number = (new Date()).getTime();
        let lp = Prime.getLastPrime();
        while (Prime.getLength() < n) {
            lp = lp.add(2);
            this.createPrimeArray(lp.toFixed());
        }
        time = ((new Date()).getTime() - time) / 1000;
        console.log("Calculate Prime = ", time, ' seconds');
        this.saveFile();
    }

    public static createPrimeArray(n: string) {
        let x: Big = new Big(n);
        let lastPrime: Big = Prime.getLastPrime();
        if (lastPrime.lt(x)) {
            let y = lastPrime;
            while (lastPrime.lt(x)) {
                y = y.add(1);
                if (Prime.findDivisor(y).eq(Prime.ONE)) {
                    if (Prime.primeArray.length == Prime.n) {
                        let oldArray = Prime.primeArray;
                        Prime.primeArray = new Array(Prime.n * 2);
                        console.log("Extend array size = ", Prime.primeArray.length);
                        for (let i = 0; i < oldArray.length; i++)
                            Prime.primeArray[i] = oldArray[i];
                    }
                    // console.log(Prime.n, '\t', ' prime\t=\t', y.toFixed());
                    lastPrime = y;
                    Prime.primeArray[Prime.n++] = lastPrime;
                    if (Prime.n % 1000 == 0) {
                        console.log('primes count =', Prime.n)
                    }
                }
            }
        }
    }

    public static goldbachConjecture() {
        console.log("Goldbach's conjecture");
        let size = 22;
        let head: string = '';
        for (let i = 1; i < size * 2 / 3; i++) {
            head += '\t' + Prime.getPrime(i).toFixed();
        }
        console.log(head);
        for (let i = 1; i < size; i++) {
            let row: string = Prime.getPrime(i).toFixed();
            for (let j = 1; j <= i * 2 / 3; j++) {
                row += '\t' + Prime.getPrime(i).add(Prime.getPrime(j)).toFixed();
            }
            console.log(row);
        }
    }

    private static histogram: number[] = new Array(20);
    public static primeHistogram() {
        Prime.histogram.fill(0);
        let interval = Math.floor(Prime.getLastPrime().toNumber() / Prime.histogram.length);
        let c = 0;
        let x = 0;
        let z = new Big(interval);
        for (let i = 0; i < Prime.n; i++) {
            if (Prime.primeArray[i].gt(z)) {
                //Prime.histogram[c] = Math.round((i - x) / Prime.n * 10000) / 100;
                Prime.histogram[c] = (i - x);
                x = i;
                c++;
                z = new Big(interval).mul(c + 1);
            }
        }
        console.log('Histogram interval=', interval, ' count=', Prime.n);
        console.log(Prime.histogram)
    }
}