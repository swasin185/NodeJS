export default class BinaryArray {
  private static BITS = 8
  private static FULL = (1 << BinaryArray.BITS) - 1
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
          // 1-8    1-8      // 9-16   1-8        // 17-24  1-8
          ((j <= (this.bits-1) % BinaryArray.BITS) || ((j < BinaryArray.BITS) && i !== (this.arr.length - 1))) && carry !== 0; j++) {
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
    let i = this.arr.length - 1
    while (this.arr[i] === 0 && i >= 0) i--
    let mask = 1 << (BinaryArray.BITS - 1)
    while ((mask & this.arr[i]) === 0) mask >>= 1
    this.arr[i] = (mask << 1) - 1
    for (i--; i >= 0; i--) this.arr[i] = BinaryArray.FULL
  }

  public isExists(bit: number): boolean {
    return (bit <= this.bits) &&
      (this.arr[Math.floor((bit-1) / BinaryArray.BITS)] & (1 << (bit - 1) % BinaryArray.BITS)) > 0
  }

  public count(): number {
    let c = 0
    for (let i = 0; i < this.arr.length; i++) {
      let mask = 1
      for (let j = 0; j < this.bits; j++) {
        if ((this.arr[i] & mask) > 0) { c++ }
        mask <<= 1
      }
    }
    return c
  }
}
