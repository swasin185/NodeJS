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
towerOfHanoi2(3, 'A', 'B', 'C')

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

function towerOfHanoi2(rings, from, temp, to) {
    const poles = [from, temp, to]
    const loop = Math.pow(2, rings)
    count = 1
    const step = 2 - (rings % 2)
    let fromIdx = 0
    let toIdx = 0
    let tempIdx = step
    while (count < loop) {
        rings = 1
        toIdx = 3 - fromIdx - tempIdx
        console.log(count.toString(2), '\tmove O', rings, 'from |', fromIdx, 'to |', toIdx, 'temp =', tempIdx)
        
        count++
        tempIdx = (tempIdx + step) % 3
    }
}
