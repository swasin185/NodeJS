import BinaryArray from './BinaryArray.js'

export default class TowerHanoi {
  public static count: number = 0
  public static barr: BinaryArray
  public static poleOfDishs: number[]
  public static poles: string[]
  public static recurMove(dish: number, from: string, to: string, temp: string): void {
    if (dish > 0) {
      TowerHanoi.recurMove(dish - 1, from, temp, to)
      console.log(++this.count, '\tdish', dish, '\tfrom', from, '\tto', to, '\t =', Number(from) + Number(to) - 1)
      TowerHanoi.recurMove(dish - 1, temp, to, from)
    }
  }

  public static binaryMove(dish: number, from: string, to: string, temp: string): void {
    TowerHanoi.count = 0
    TowerHanoi.recurMove(dish, from, to, temp)
    console.log('===========================================')

    TowerHanoi.count = 0
    this.barr = new BinaryArray(dish)
    this.poleOfDishs = new Array(dish)
    this.poles = new Array(3)
    this.poles[0] = from
    this.poles[1] = to
    this.poles[2] = temp
    this.poleOfDishs.fill(0)
    let moveDish: number = -1
    let pole: number = 0
    let flag = dish % 2
    let x = 0                  // x = to + from 
    while (this.barr.next()) {
      moveDish = this.barr.mostRight()
      pole = x
      if (flag === 0 && x < 2)
        if (pole === 0) pole = 1
        else pole = 0
      pole = pole - this.poleOfDishs[moveDish - 1] + 1
      console.log(++this.count, '\tdish', moveDish, '\tfrom', this.poleOfDishs[moveDish - 1], '\tto', pole, '\t', this.barr.toString())
      this.poleOfDishs[moveDish - 1] = pole
      x = (x + 1) % 3
    }
  }
}

console.log('Tower of Hanoi')
TowerHanoi.binaryMove(4, '0', '1', '2')