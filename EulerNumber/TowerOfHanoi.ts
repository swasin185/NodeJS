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

towerOfHanoi(4, 'A', 'B', 'C')

function towerOfHanoi(dish, from, temp, to) {
    let count = 1
    const loop = Math.pow(2, dish)
    const dishIsEvent = dish % 2 === 0
    let x = 0
    let pole = 0
    while (count < loop) {
        let rightMostBit = 1
        while (count % Math.pow(2, rightMostBit) === 0) rightMostBit++
        if (dishIsEvent && x < 2) {
            if (x === 0) { pole = 1 } else { pole = 0 }
        } else {
            pole = x
        }
        console.log(count.toString(2), '\t', rightMostBit, '\t', x)
        count++
        x = (x + 1) % 3
    }
}
