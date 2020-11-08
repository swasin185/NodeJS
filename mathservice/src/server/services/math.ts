import Prime from '../lib/Prime.js';
import url from "url";
import Big from "big.js"

export default (server: any, apiURL: string) => {
    Prime.readFile();
    console.log('Math Services register...');

    server.get(apiURL + "getPrimes", (req, res) => {
        const queryObj = url.parse(req.url, true).query;
        let n = Prime.getLength();
        if (queryObj && queryObj.n)
            n = Number(queryObj.n);
        if (n > Prime.getLength())
            Prime.createPrimeArrayCount(n);
        //{ // calculate new prime for count = n
        // let p = Number(Prime.getLastPrime());
        // let ratio = n / p * Math.log(p);
        // let lp = Math.floor(Prime.getLength() * Math.log(p));
        // p = Math.floor(lp * ratio);
        // console.log('new P = ', p);
        // Prime.createPrimeArray(String(p));
        //}
        const allPrimes: any[] = new Array(n);
        for (let i = 0; i < n; i++)
            allPrimes[i] = { p: Prime.getPrime(i).toFixed() };
        res.json(allPrimes);
    })

    server.get(apiURL + "isPrime", (req, res) => {
        const queryObj = url.parse(req.url, true).query;
        let x = '1';
        if (queryObj && queryObj.x)
            x = String(queryObj.x);
        res.json({ x: x.toString(), prime: Prime.isPrime(x) })
    })

    server.get(apiURL + "primeFile", (req, res) => {
        res.setHeader('Content-type', "text/plain");
        res.setHeader('Content-disposition', 'attachment; filename=prime.txt');
        res.sendFile(process.cwd() + '/' + Prime.fileName);
    })

    server.get(apiURL + "gcd", (req, res) => {
        const queryObj = url.parse(req.url, true).query;
        let a = new Big('1');
        let b = new Big('1');
        if (queryObj && queryObj.a)
            a = new Big(String(queryObj.a));
        if (queryObj && queryObj.b)
            b = new Big(String(queryObj.b));
        let gcd = b;
        if (b.gt(a)) {
            b = a;
            a = gcd;
            gcd = b;
        }
        while (!b.eq(0)) {
            gcd = a.mod(b);
            a = b;
            b = gcd;
        }
        gcd = a;
        res.json({ a: String(queryObj.a), b: String(queryObj.b), gcd: gcd.toString() })
    })

    server.get(apiURL + "logout", (req, res) => {
        req.session.destroy()
        res.send("Logout")
    })
}
