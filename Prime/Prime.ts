// npm install big.js
// npm install --save-dev @types/big.js
import Big from "big.js";

class Prime {
    private static fileName = 'prime.txt';
    public static ONE = new Big(1);
    private static primeArray: Big[] = [Big(2), Big(3), Big(5), Big(7), Big(11), Big(13), Big(17), Big(19), Big(23)];
    private static n: number = Prime.primeArray.length;
    private static n_old = 0;
    public static readFile(): void {
        let fs = require("fs");
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
            console.log('read prime file', Prime.getLength(), Prime.getPrime(Prime.getLength() - 1).toFixed());
        } catch (err) {
            console.log(Prime.fileName + ' Error! ' + err);
        }
    }

    public static saveFile(): void {
        if (Prime.n != Prime.n_old) {
            let fs = require("fs");
            let data: string = '';
            for (let i = 0; i < Prime.n; i++)
                data += Prime.primeArray[i].toFixed() + '\n';
            fs.writeFileSync(Prime.fileName, data, 'utf-8');
            console.log('save to prime file', Prime.getLength(), Prime.getPrime(Prime.getLength() - 1).toFixed());
        } else {
            console.log('Prime file is not modified');
        }
    }

    private static searchPrime(x: Big): boolean {
        let i = 0;
        // Binary Search
        let found = -1
        let lo = 0;
        let hi = Prime.n - 1;
        let mid = 0;
        while (lo <= hi && found == -1) {
            i++;
            mid = Math.floor((hi + lo) / 2);
            if (x.eq(Prime.primeArray[mid]))
                found = mid;
            else
                if (x.lt(Prime.primeArray[mid]))
                    hi = mid - 1;
                else
                    lo = mid + 1;
        }
        console.log('Array Searching...', i);
        if (found > -1) {
            console.log(x.toFixed(), "is founded");
        } else {
            console.log(x.toFixed(), "is not found!");
        }
        return found != -1;
    }

    public static isPrime(x: Big): Big {
        let dividend = Prime.one;
        if (!Prime.searchPrime(x)) {
            let sqrt: Big = x.sqrt();
            let lastPrime = Prime.primeArray[this.n - 1];
            while (lastPrime.lt(sqrt)) {
                lastPrime = lastPrime.add(1);
                if (Prime.isPrime(lastPrime).eq(Prime.one)) {
                    if (Prime.primeArray.length == Prime.n) {
                        let oldArray = Prime.primeArray;
                        Prime.primeArray = new Array(Prime.n * 2);
                        for (let i = 0; i < oldArray.length; i++)
                            Prime.primeArray[i] = oldArray[i];
                    }
                    Prime.primeArray[Prime.n++] = lastPrime;
                }
            }
            let i = 0;
            dividend = Prime.primeArray[i];
            while (i < this.n && dividend.lt(sqrt) && !x.mod(dividend).eq(0)) {
                //console.log(x.toFixed(), "can not be devided by", dividend.toFixed());
                dividend = Prime.primeArray[++i];
            }
            if (i >= Prime.n || dividend.gt(sqrt))
                dividend = Prime.one;
        }
        return dividend;
    }
    public static getPrime(i: number): Big {
        return Prime.primeArray[i];
    }
    public static getLength(): number {
        return this.n;
    }
}

Prime.readFile();
let x = Big(1528543);
console.log('x =', x.toFixed(), 'is divided by', Prime.isPrime(x).toFixed());

Prime.saveFile();
