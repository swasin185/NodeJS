// npm install big.js
// npm install --save-dev @types/big.js
import Big from "big.js";

class Prime {
    private static fileName = 'prime.txt';
    private static one = new Big(1);
    private static primeArray: Big[] = [Big(2), Big(3), Big(5), Big(7), Big(11), Big(13), Big(17), Big(19), Big(23)];
    private static n: number = Prime.primeArray.length;
    public static readFile(): void {
        let fs = require("fs");
        try {
            let readData = fs.readFileSync(Prime.fileName, 'utf-8');
            let p = readData.split('\n');
            if (Prime.n < p.length - 1) {
                Prime.n = p.length - 1;
                Prime.primeArray = new Array(Prime.n);
                for (let i = 0; i < Prime.n; i++)
                    Prime.primeArray[i] = new Big(p[i]);
            }
            console.log('read prime file')
        } catch (err) {
            console.log(Prime.fileName + ' Error! ' + err);
        }

    }

    public static saveFile(): void {
        let fs = require("fs");
        let data: string = '';
        for (let i = 0; i < Prime.n; i++)
            data += Prime.primeArray[i].toFixed() + '\n';
        fs.writeFileSync(Prime.fileName, data, 'utf-8');
        console.log('save to prime file')
    }

    public static isPrime(x: Big): Big {
        let sqrt: Big = x.sqrt();
        let lastPrime = Prime.primeArray[this.n - 1];
        let oldSize = Prime.n;
        while (lastPrime.lt(sqrt)) {
            lastPrime = lastPrime.add(1);
            if (Prime.isPrime(lastPrime).eq(Prime.one)) {
                if (Prime.primeArray.length == Prime.n) {
                    let oldArray = Prime.primeArray;
                    Prime.primeArray = new Array(Prime.n * 2);
                    for (let i=0; i < oldArray.length; i++)
                        Prime.primeArray[i] = oldArray[i];
                }
                Prime.primeArray[Prime.n++] = lastPrime;
            }
        }

        if (oldSize != Prime.n)
            Prime.saveFile();

        let i = 0;
        // Binary Search
        let found = -1
        let lo = 0;
        let hi = Prime.n - 1;
        let mid = 0;
        while (lo <= hi && found == -1) {
            mid = Math.floor((hi + lo) / 2);
            console.log('search', ++i, lo, hi, Prime.primeArray[mid].toFixed());
            if (x.eq(Prime.primeArray[mid]))
                found = mid;
            else
                if (x.lt(Prime.primeArray[mid]))
                    hi = mid - 1;
                else
                    lo = mid + 1;
        }

        if (found > -1) {
            console.log(x.toFixed(), "found in prime");
            i = Prime.n;
        } else {
            console.log(x.toFixed(), "NOT found in prime");
            i = 0;
        }

        let prime: Big = Prime.primeArray[i];
        while (i < this.n && prime.lt(sqrt) && !x.mod(prime).eq(0)) {
            console.log(x.toFixed(), "can not be devided by", prime.toFixed());
            prime = Prime.primeArray[++i];
        }

        if (i >= Prime.n || prime.gt(sqrt))
            return Prime.one;
        else
            return prime;
    }
    public static getPrime(i: number): Big {
        return Prime.primeArray[i];
    }
    public static getLength(): number {
        return this.n;
    }
}

Prime.readFile();
console.log('last prime =', Prime.getLength(), Prime.getPrime(Prime.getLength() - 1).toFixed());
let x = Big(152855);
console.log('x =', x.toFixed(), 'is divided by', Prime.isPrime(x).toFixed());