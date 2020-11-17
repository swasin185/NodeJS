import BinaryArray from './BinaryArray.js'

/** Tower Of Hanoi
 *    move all dishs from "A" to "C"
 *    one by one and smaller on top
 * 
 *        From      Temp       To
 *        pole      pole      pole
 *          A         B         C
 *          |         |         |
 *     1    #         |         |
 *     2   ###        |         |
 *     3  #####       |         |  
 *     4 #######      |         |  
 * --------------------------------------
 */

export default class TowerHanoi {
  public static count: number = 0
  public static barr: BinaryArray
  public static poleOfDishs: number[]
  public static poles: string[]
  public static recurMove(dish: number, from: string, to: string, temp: string): void {
    if (dish > 0) {
      TowerHanoi.recurMove(dish - 1, from, temp, to)
      console.log(++this.count, '\tdish', dish, '\tfrom', from, '\tto', to, '\t =', Number(to) + Number(from) - 1)
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
    this.poleOfDishs.fill(0)
    this.poles = [from, to, temp]
    let moveDish: number = -1
    let pole: number = 0
    const dishIsEvent = dish % 2 === 0
    let x = 0 // x = to + from
    while (this.barr.next()) {
      moveDish = this.barr.mostRight()
      if (dishIsEvent && x < 2) {
        if (x === 0) { pole = 1 } else { pole = 0 }
      } else {
        pole = x
      }
      pole = pole - this.poleOfDishs[moveDish - 1] + 1
      console.log(++this.count, '\tdish', moveDish, '\tfrom', this.poleOfDishs[moveDish - 1], '\tto', pole, '\t', this.barr.toString())
      this.poleOfDishs[moveDish - 1] = pole
      x = (x + 1) % 3
    }
  }
}

console.log('Tower of Hanoi')
TowerHanoi.binaryMove(5, '0', '1', '2')
