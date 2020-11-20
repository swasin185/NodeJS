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
    public static recurMove (dish: number, from: string, temp: string, to: string): void {
        if (dish > 0) {
            TowerHanoi.recurMove(dish - 1, from, to, temp)
            console.log(++this.count, '\tdish', dish, '\tfrom', from, '\tto', to)
            TowerHanoi.recurMove(dish - 1, temp, from, to)
        }
    }

    public static binaryMove (ring: number, from: string, temp: string, to: string): void {
        TowerHanoi.count = 0
        TowerHanoi.recurMove(ring, from, to, temp)
        console.log('===========================================')

        TowerHanoi.count = 0
        this.barr = new BinaryArray(ring)
        this.poleOfDishs = new Array(ring)
        this.poleOfDishs.fill(0)
        this.poles = [from, to, temp]
        let target: number = 0
        const next = 2 - (ring % 2)
        let x = next
        while (this.barr.next()) {
            ring = this.barr.mostRight() - 1
            target = 3 - this.poleOfDishs[ring] - x
            console.log(++this.count, '\tmove ring', ring + 1, '\tfrom',
                this.poles[this.poleOfDishs[ring]], '\tto', this.poles[target], '\t', this.barr.toString())
            this.poleOfDishs[ring] = target
            x = (x + next) % 3
        }
    }
}

console.log('Tower of Hanoi')
TowerHanoi.binaryMove(3, 'A', 'B', 'C')
