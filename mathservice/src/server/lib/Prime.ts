// npm install big.js
// npm install --save-dev @types/big.js
import Big from 'big.js'
import * as fx from 'fs'

export default class Prime {
  public static fileName = 'prime.txt';
  public static ONE = new Big(1);

  private static primeArray: Big[] = [Big(2), Big(3), Big(5), Big(7), Big(11), Big(13), Big(17), Big(19), Big(23)];
  private static n: number = Prime.primeArray.length;

  private static nOld = 0;
  public static readFile(): void {
    try {
      const readData = fx.readFileSync(Prime.fileName, 'utf-8')
      const p = readData.split('\n')
      if (Prime.n < p.length - 1) {
        Prime.n = p.length - 1
        Prime.nOld = Prime.n
        Prime.primeArray = new Array(Prime.n)
        for (let i = 0; i < Prime.n; i++) { Prime.primeArray[i] = new Big(p[i]) }
      }
      console.log('read prime file', Prime.getLength(), Prime.getLastPrime().toFixed())
    } catch (err) {
      console.log(Prime.fileName + ' Error! ' + err)
      Prime.createPrimeArray('10000')
      Prime.saveFile()
    }
  }

  public static saveFile(): void {
    if (Prime.n !== Prime.nOld) {
      let data: string = ''
      for (let i = 0; i < Prime.n; i++) { data += Prime.primeArray[i].toFixed() + '\n' }
      fx.writeFileSync(Prime.fileName, data, 'utf-8')
      console.log('save to prime file', Prime.getLength(), Prime.getLastPrime().toFixed())
    } else {
      console.log('Prime file is not modified')
    }
  }

  private static searchMaxPrime(x: Big): number {
    let found = -1
    let hi = Prime.n - 1
    if (x.lte(Prime.primeArray[hi])) {
      let lo = 0
      let mid = 0
      while (lo <= hi && found === -1) { // Binary Search
        mid = Math.floor((hi + lo) / 2)
        if (x.eq(Prime.primeArray[mid])) { found = mid } else
          if (x.lt(Prime.primeArray[mid])) { hi = mid - 1 } else { lo = mid + 1 }
      }
      if (found === -1) {
        if (hi < mid) found = hi
        else found = mid
      }
    }
    return found
  }

  private static searchPrime(x: Big): boolean {
    return Prime.primeArray[Prime.searchMaxPrime(x)].eq(x);
  }

  public static findDivisor(x: Big): Big {
    let divisor = Prime.ONE
    if (!Prime.searchPrime(x)) { // if not prime find divisor
      const sqrt: Big = x.sqrt()
      Prime.createPrimeArray(sqrt.toString())
      let i = 0
      divisor = Prime.primeArray[i]
      while (i < Prime.n && divisor.lt(sqrt) && !x.mod(divisor).eq(0)) { divisor = Prime.primeArray[++i] }
      if (i >= Prime.n || divisor.gt(sqrt)) { divisor = Prime.ONE }
    }
    return divisor
  }

  public static isPrime(s: string): boolean {
    return this.findDivisor(new Big(s)).eq(1)
  }

  public static getPrime(i: number): Big {
    return Prime.primeArray[i]
  }

  public static getLastPrime() {
    return Prime.primeArray[Prime.n - 1]
  }

  public static getLength(): number {
    return this.n
  }

  private static diffArray: number[];
  private static diffFile = 'primegap.txt';
  public static gapHistogram() {
    console.log('Prime Gap')
    Prime.diffArray = new Array(Prime.n)
    let diff = 0
    Prime.diffArray[0] = 0
    for (let i = 1; i < Prime.n; i++) {
      diff = Prime.primeArray[i].sub(Prime.primeArray[i - 1]).toNumber()
      diff = Math.floor(diff / 2)
      Prime.diffArray[i] = diff
    }
    console.log(Prime.diffArray)
    let data: string = ''
    for (let i = 0; i < Prime.n; i++) { data += Prime.diffArray[i].toFixed() + '\n' }
    fx.writeFileSync(Prime.diffFile, data, 'utf-8')
    console.log('save to prime gap file')
  }

  public static createPrimeArrayCount(n: number) {
    // { // calculate new prime for count = n
    // let p = Number(Prime.getLastPrime());
    // let ratio = n / p * Math.log(p);
    // let lp = Math.floor(Prime.getLength() * Math.log(p));
    // p = Math.floor(lp * ratio);
    // console.log('new P = ', p);
    // Prime.createPrimeArray(String(p));
    // }

    let time: number = (new Date()).getTime()
    let lp = Prime.getLastPrime()
    while (Prime.getLength() < n) {
      lp = lp.add(2)
      this.createPrimeArray(lp.toFixed())
    }
    time = ((new Date()).getTime() - time) / 1000
    console.log('Calculate Prime = ', time, ' seconds')
    this.saveFile()
  }

  public static createPrimeArray(n: string) {
    const x: Big = new Big(n)
    let lastPrime: Big = Prime.getLastPrime()
    if (lastPrime.lt(x)) {
      let y = lastPrime
      while (lastPrime.lt(x)) {
        y = y.add(2)
        if (Prime.findDivisor(y).eq(Prime.ONE)) {
          if (Prime.primeArray.length === Prime.n) {
            const oldArray = Prime.primeArray
            Prime.primeArray = new Array(Math.ceil(Prime.n * 1.5))
            console.log('Extend array size = ', Prime.primeArray.length)
            for (let i = 0; i < oldArray.length; i++) { Prime.primeArray[i] = oldArray[i] }
          }
          lastPrime = y
          Prime.primeArray[Prime.n++] = lastPrime
          if (Prime.n % 1000 === 0) {
            console.log('primes count to', Prime.n)
          }
        }
      }
    }
  }

  public static goldbachConjecture(n: string): string[] {
    let n2 = new Big(n)
    if (n2.mod(2).gt(0) || n2.lte(4)) {
      return undefined
    }
    console.log('Goldbach\'s conjecture', n2.toFixed())
    //const goldbach: string[] = new Array(n2.div(10).round(0, 0).toNumber())
    let goldbach: string[] = new Array(1)
    let len = 0
    const half = n2.div(2)
    const lp = Prime.searchMaxPrime(n2)
    let y = 1
    let result: Big
    console.log(lp)
    for (let i = lp; Prime.primeArray[i].gte(half); i--) {
      result = Prime.ONE // todo คำนวณคู่ prime ถัดไป จากผลลบ น่าจะทำงานได้เร็วกว่า
      for (let j = y; Prime.primeArray[j].lt(half) && result.lt(n2); j++) {
        result = Prime.primeArray[i].add(Prime.primeArray[j])
        if (result.eq(n2)) 
          goldbach[len++] = Prime.primeArray[i].toString()
        if (!result.gt(n2)) 
          y++
      }
    }

    let asc = ''
    let des = ''
    let k = 1
    for (let i = 0; Prime.primeArray[i].lt(n2); i++) {
      while (Prime.primeArray[i].gt(k)) {
        if (half.gt(k)) { asc += '.' } else { des = '.' + des }
        k++
      }
      if (half.gt(k)) { asc += 'V' } else { des = 'A' + des }
      k++
    }
    while (n2.gt(k)) {
      if (half.gt(k)) { asc += '.' } else { des = '.' + des }
      k++
    }

    console.log(asc)
    console.log(des)
    let i = 1
    let row: string = ''
    while (Prime.primeArray[i].lt(half)) {
      row += '\t' + Prime.getPrime(i).toFixed()
      i++
    }
    console.log(row)
    i = lp
    y = 1
    while (Prime.primeArray[i].gte(half)) {
      row = Prime.getPrime(i).toFixed()
      result = Prime.ONE
      for (let j = 1; j < y; j++)
        row += '\t'
      for (let j = y; Prime.primeArray[j].lt(half) && result.lt(n2); j++) {
        result = Prime.getPrime(i).add(Prime.getPrime(j))
        if (result.eq(n2)) {
          row += '\tO'
          y++
        } else if (result.gt(n2)) {
          row += '\t+'
        }
        else {
          row += '\t-'
          y++
        }
      }
      i--
      console.log(row)
    }

    return goldbach
  }

  private static histogram: number[] = new Array(20);
  public static primeHistogram() {
    Prime.histogram.fill(0)
    const interval = Math.floor(Prime.getLastPrime().toNumber() / Prime.histogram.length)
    let c = 0
    let x = 0
    let z = new Big(interval)
    for (let i = 0; i < Prime.n; i++) {
      if (Prime.primeArray[i].gt(z)) {
        // Prime.histogram[c] = Math.round((i - x) / Prime.n * 10000) / 100;
        Prime.histogram[c] = (i - x)
        x = i
        c++
        z = new Big(interval).mul(c + 1)
      }
    }
    console.log('Histogram interval=', interval, ' count=', Prime.n)
    console.log(Prime.histogram)
  }
}
