import BinaryArray from './BinaryArray.js'

export default class TowerHanoi {
  public static count: number = 0
  public static barr: BinaryArray
  public static poleOfDishs: number[]
  public static poles: string[]
  public static recurMove (dish: number, from: string, to: string, temp: string): void {
    if (dish > 0) {
      TowerHanoi.recurMove(dish - 1, from, temp, to)
      console.log(++this.count, '\tdish', dish, '\tfrom', from, '\tto', to)
      TowerHanoi.recurMove(dish - 1, temp, to, from)
    }
  }

  public static binaryMove (dish: number, from: string, to: string, temp: string): void {
    TowerHanoi.count = 0
    TowerHanoi.recurMove(dish, from, to, temp)

    TowerHanoi.count = 0
    this.barr = new BinaryArray(dish)
    this.poleOfDishs = new Array(dish)
    this.poles = new Array(3)
    this.poles[0] = from
    this.poles[1] = to
    this.poles[2] = temp
    this.poleOfDishs.fill(0)
    let moveDish: number = -1
    let pole: number = 1
    let flag = (dish - 1) % 2
    while (this.barr.next()) {
      moveDish = this.barr.mostRight()
      if (this.barr.count() === 1) flag = (moveDish - 1) % 2
      else flag = (flag + 1) % 2
      pole = this.poleOfDishs[moveDish - 1] + 1 + flag
      pole %= 3
      console.log(++this.count, '\tdish', moveDish, '\tfrom', this.poleOfDishs[moveDish - 1], '\tto', pole,
        '\t', this.barr.toString())

      this.poleOfDishs[moveDish - 1] = pole
    }
  }
}

console.log('Tower of Hanoi')
TowerHanoi.binaryMove(4, '0', '1', '2')
// there are pattern of pole choose
// 1 2 2 1 0 1 1 2 2 0 0
// 2 1 1 2 0 2 2 1 1 0 0
