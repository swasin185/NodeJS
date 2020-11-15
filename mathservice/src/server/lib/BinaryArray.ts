export default class BinaryArray {
  private static BITS = 30
  private static FULL = (1 << BinaryArray.BITS) - 1
  private static LEFT = 1 << (BinaryArray.BITS - 1)
  private bits: number
  private arr: number[]
  public constructor(bits: number) {
    this.bits = bits
    this.arr = new Array(Math.ceil(bits / BinaryArray.BITS))
    this.arr.fill(0)
  }

  public toString(): string {
    let s = ''
    let b = ''
    let j = 0
    for (let i = 0; i < this.arr.length; i++) {
      if (this.bits >= (i + 1) * BinaryArray.BITS) { j = BinaryArray.BITS } else { j = this.bits % BinaryArray.BITS }
      b = this.arr[i].toString(2)
      while (b.length < j) b = '0' + b
      s = b + ' ' + s
    }
    return s
  }

  public next(): boolean {
    let carry: number = 1
    for (let i = 0; i < this.arr.length && carry !== 0; i++) {
      if (carry !== 0) {
        for (let j = 0;
          ((j <= (this.bits - 1) % BinaryArray.BITS) || ((j < BinaryArray.BITS) && i !== (this.arr.length - 1)))
          && carry !== 0; j++) {
          carry &= this.arr[i]
          carry <<= 1
        }

        if (carry !== 0) {
          this.arr[i] = 0
          carry = 1
        } else this.arr[i]++
      }
    }
    return carry === 0
  }

  public jump(): void {
    let c = this.count()
    let i = this.bits
    for (let i = this.arr.length - 1; i >= 0; i--) {
      if (c === 1 && i < this.arr.length - 1) {
        this.arr[i] = BinaryArray.FULL
      } else {
        let mask = BinaryArray.LEFT
        while (mask >= 1) {
          if (c === 1) this.arr[i] |= mask
          else
            if ((this.arr[i] & mask) !== 0)
              c--
          mask >>= 1
        }
      }
    }
  }

  public isExists(bit: number): boolean { // n - 1 bit
    return (this.arr[Math.floor(bit / BinaryArray.BITS)] & (1 << bit % BinaryArray.BITS)) > 0
  }

  public age(): number { // n - 1 bit
    let c = 0
    for (let i = this.arr.length - 1; i >= 0 && c===0; i--) {
      let mask = BinaryArray.LEFT
      for (let j = BinaryArray.BITS; j > 0 && c===0; j--) {
        if ((this.arr[i] & mask) > 0) c = (i * BinaryArray.BITS) + j + 1
        mask >>= 1
      }
    }
    return c
  }

  public count(): number {
    let c = 0
    for (let i = 0; i < this.arr.length; i++) {
      let mask = 1
      for (let j = 0; j < BinaryArray.BITS; j++) {
        if ((this.arr[i] & mask) > 0) { c++ }
        mask <<= 1
      }
    }
    return c
  }
}
