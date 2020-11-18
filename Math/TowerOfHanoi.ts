/** Tower Of Hanoi
 *    move all rings from |A to |C
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
let count = 1
toh(3, '0', '1', '2')
console.log("*************** Non Recursive ToH ***************")
towerOfHanoi(5, 'A', 'B', 'C')

function toh(rings, from, temp, to) {
    if (rings > 0) {
        toh(rings - 1, from, to, temp)
        console.log(count.toString(2), '\tmove O', rings, 'from |', from, 'to |', to,
            'temp =', temp, 'to =', 3 - Number(from) - Number(temp))
        count++
        toh(rings - 1, temp, from, to)
    }
}

function towerOfHanoi(rings, from, temp, to) {
    const poles = [from, temp, to]
    const poleOfRings = new Array(rings)
    poleOfRings.fill(0)
    const loop = Math.pow(2, rings)
    count = 1
    const next = 2 - (rings % 2)
    temp = next
    while (count < loop) {
        rings = 1
        while (count % Math.pow(2, rings) === 0) rings++
        to = 3 - poleOfRings[rings - 1] - temp
        console.log(count.toString(2), '\tmove O', rings, 'from |', poles[poleOfRings[rings - 1]], 'to |',
            poles[to], 'temp =', poles[temp], 'to =', to)
        poleOfRings[rings - 1] = to
        count++
        temp = (temp + next) % 3
    }
}
