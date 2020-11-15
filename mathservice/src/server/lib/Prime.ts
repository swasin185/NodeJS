import Big from 'big.js';
import fx from 'fs';
import BinaryArray from './BinaryArray.js';

export default class Prime {
  public static fileName = 'prime.txt';
  public static ZERO = new Big(0);
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

  public static searchMaxPrime(x: Big): number {
    let found = -1
    if (x.gt(1) && x.lte(Prime.getLastPrime())) {
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
    } else {
      found = Prime.n - 1
    }
    return found
  }

  public static searchPrime(x: Big): boolean {
    return Prime.primeArray[Prime.searchMaxPrime(x)].eq(x)
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

  public static conjGoldbach(n: string): string[] {
    const n2 = new Big(n)
    if (n2.mod(2).gt(0) || n2.lte(4)) {
      return undefined
    }
    let len = 0
    const goldbach: string[] = new Array(1)
    const half = n2.div(2)
    const lp = Prime.searchMaxPrime(n2.minus(2))
    let y = 1
    let result: Big
    for (let i = lp; Prime.primeArray[i].gte(half); i--) {
      result = n2.minus(Prime.primeArray[i]) // คำนวณคู่บวก จากผลลบ
      while (result.gt(Prime.primeArray[y])) y++ // หา prime ถัดไปที่ไม่น้อยกว่าผลลบ
      if (result.eq(Prime.primeArray[y])) { // ถ้าผลลบ == prime เก็บผลลัพธ์
        goldbach[len++] = Prime.primeArray[i].toString()
        y++
      }
    }
    return goldbach
  }

  public static sumReciprocal(n: number, x: Big): Big {
    let sum = Prime.ZERO
    if (n > 0 && x.abs().gte(Prime.primeArray[n - 1])) {
      let line = ' '
      let y
      for (let i = 0; i < n; i++) {
        y = x.div(Prime.primeArray[i]).round(0, 0)
        sum = sum.add(y)
        line += '+' + y
        y = this.sumReciprocal(i, y.mul(-1))
        sum = sum.add(y)
        line += '+' + y
      }
      console.log(line, '->', sum.toFixed())
    }
    return sum
  }

  public static primePop(n: number): number {
    const lp = Prime.primeArray[n - 1].toNumber()
    const n2 = lp * lp
    let m = 0
    let time: number = (new Date()).getTime()
    const barr = new BinaryArray(n)
    let line: string = ''
    let x = 1
    let k = 0
    while (barr.next()) {
      line = ''
      x = 1
      for (let i = 0; i < n && x <= n2; i++) {
        if (barr.isExists(i + 1)) {
          x *= Prime.primeArray[i].toNumber()
          if (x > n2) {
            barr.jump()
          } else {
            line += ' ' + Prime.primeArray[i]
          }
        } else {
          line += '  '
        }
      }
      if (x <= n2) {
        k++
        x = Math.floor(n2 / x)
        if (barr.count() % 2 === 0) x = -x
        m += x
      } else
        line = '-------------'
      console.log(k, '\t', barr.toString(), '\t', m, '\t', x, '\t', line)
    }
    time = ((new Date()).getTime() - time) / 1000
    console.log(n, '\t', 'prime=', lp, 'p^2=', n2, 'prime count =', n2 - m + n - 1, ' run =', k, '\ttime =', time, ' seconds')
    return n2 - m + n - 1
  }
}

// +2 ลงตัว      60  = 2 - 120
// +3 ลงตัว      40  = 3 - 120
// -3x2 ลงตัว   -20  = 6 - 120
// +5 ลงตัว     +24  = 5 - 120
// -5x2 ลงตัว   -12  = 15 - 120
// -5x3 ลงตัว    -8  = 15 - 120
// +5x3x2 ลงตัว  +4  = 30 60 90 120
// +7 ลงตัว     +17  = 7 - 119
// -7x2 ลงตัว    -8  = 14 - 112
// -7x3 ลงตัว    -5  = 21 42 63 84 105
// +7x3x2 ลงตัว  +2  = 42 84
// -7x5 ลงตัว    -3  = 35 70 105
// +7x5x2 ลงตัว  -3  = 70
// +7x5x3           = 105
// -7x5x3x2         = 210
// 11               = 11 22 121
// 11x2             = 22 44 66 88 110
// 11x3             = 33 66 99
// 11x3x2           = 66
// 11x5             = 55 110
// 11x5x2           = 110
// 11x5x3         X =
// 11x5x3x2       X =
// 11x7             = 77
// 11x7x2         X =
// 11x7x3         X =
// 11x7x3x2       X =
// 11x7x5         X =
// 11x7x5x2       X =
// 11x7x5x3       X =
// 11x7x5x3x2     X =

/*
1         00001+
2         00010+
21        00011-
3         00100+
31        00101-
32        00110-
321       00111+ x
4         01000+
41        01001-
42        01010-
421       01011+ x
43        01100-
431       01101+
432       01110+
4321      01111- x 7 5 3 2 210
*/
