import Big from 'big.js';
import fx from 'fs';

export default class Prime {
  public static fileName = 'prime.txt';
  public static ZERO = new Big(0);
  public static ONE = new Big(1);

  private static primeArray: Big[] = [Big(2), Big(3), Big(5), Big(7), Big(11), Big(13), Big(17), Big(19), Big(23)];
  private static n: number = Prime.primeArray.length;

  private static nOld = 0;
  public static readFile (): void {
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

  public static saveFile (): void {
    if (Prime.n !== Prime.nOld) {
      let data: string = ''
      for (let i = 0; i < Prime.n; i++) { data += Prime.primeArray[i].toFixed() + '\n' }
      fx.writeFileSync(Prime.fileName, data, 'utf-8')
      console.log('save to prime file', Prime.getLength(), Prime.getLastPrime().toFixed())
    } else {
      console.log('Prime file is not modified')
    }
  }

  public static searchMaxPrime (x: Big): number {
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

  public static searchPrime (x: Big): boolean {
    return Prime.primeArray[Prime.searchMaxPrime(x)].eq(x)
  }

  public static findDivisor (x: Big): Big {
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

  public static isPrime (s: string): boolean {
    return this.findDivisor(new Big(s)).eq(1)
  }

  public static getPrime (i: number): Big {
    return Prime.primeArray[i]
  }

  public static getLastPrime () {
    return Prime.primeArray[Prime.n - 1]
  }

  public static getLength (): number {
    return this.n
  }

  private static diffArray: number[];
  private static diffFile = 'primegap.txt';
  public static gapHistogram () {
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

  public static createPrimeArrayCount (n: number) {
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

  public static createPrimeArray (n: string) {
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

  public static conjGoldbach (n: string): string[] {
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

  public static sumReciprocal (n: number, x: Big): Big {
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

  public static primePop (n: number): Big {
    const max = Prime.primeArray[n - 1].mul(Prime.primeArray[n - 1])
    let sum = Prime.ZERO
    let recip = Prime.ZERO
    console.log('n^2 = ', max.toFixed())
    let minus = Prime.ZERO
    for (let i = 0; i < n; i++) {
      recip = max.div(Prime.primeArray[i]).round(0, 0)
      console.log('+', recip.toFixed(), ' - ')
      minus = Prime.sumReciprocal(i, recip)
      sum = sum.add(recip.sub(minus))
    }
    const pp = max.sub(sum.sub(n - 1))
    return pp
  }
}
//  60  = 2 - 120   หาร 2 ลงตัว
//  40  = 3 - 120   หาร 3 ลงตัว
// -20  = 6 - 120   หาร 3x2 ลงตัว
// +24  = 5 - 120   หาร 5 ลงตัว
// -12  = 15 - 120  หาร 5x2 ลงตัว
//  -8  = 15 - 120  หาร 5x3 ลงตัว
// +17  = 7 - 119   หาร 7 ลงตัว
//  -8  = 14 - 112  หาร 7x2 ลงตัว
//  -5  = 21 - 105  หาร 7x3 ลงตัว
//  -3  = 35 - 105  หาร 7x5 ลงตัว

// -8 = 6 12 18 24 30 36 42 48
// 9  = 5 10 15 20 25 30 35 40 45
// -4 = 10 20 30 40
// -3 = 15 30 45
//  1 = 30
// 7  = 7 14 21 28 35 42 49
// -3 = 14 28 42
// -2 = 21 42
// -1 = 35
//  1 = 42
