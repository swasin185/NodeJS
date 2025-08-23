// Fisher–Yates shuffle
function shuffle(arr) {
    let j = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == i || arr[arr[i]] == i) {
            do j = Math.floor(Math.random() * arr.length)
            while (i == j)
            swap(arr, i, j)
        }
    }
}

function swap(arr, i, j) {
    if (i == j) return
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function findCycles(array) {
    const visited = new Array(array.length).fill(false)
    const cycles = []
    // const x = []
    for (let i = 0; i < array.length; i++) {
        if (!visited[i]) {
            let cycleLength = 0
            let current = i
            // x.push([]);
            while (!visited[current]) {
                // x[x.length - 1].push(current)
                visited[current] = true
                current = array[current]
                cycleLength++
            }
            cycles.push(cycleLength)
        }
    }
    // console.log(x)
    return cycles
}

// Monte Carlo simulation
function estimateProbability(n = 100, trials = 10000, max = 50) {
    let success = 0
    let arr = []
    for (let t = 0; t < trials; t++) {
        arr = Array.from({ length: n }, (_, i) => i)
        shuffle(arr)
        const cycles = findCycles(arr)
        const maxCycle = Math.max(...cycles)
        if (maxCycle <= max) success++
        // success += maxCycle
        // console.log(cycles)
        // console.log(arr)
    }
    // console.log(arr)
    return Math.round((success / trials) * 10000) / 100
}

function histogramTest(n = 100, trials = 10000) {
    const hist = Array.from({ length: n }, (_, i) => 0)

    for (let t = 0; t < trials; t++) {
        const arr = Array.from({ length: n }, (_, i) => i)
        shuffle(arr)
        for (let pos = 0; pos < n; pos++) 
            hist[pos] += arr[pos]
    }
    for (let pos = 0; pos < n; pos++) {
        hist[pos] /= trials
        hist[pos] = hist[pos].toFixed(2)
    }
    return hist
}
// console.log('Histogram TEST:', histogramTest(100, 100))
console.log('Estimated probability:', estimateProbability(100, 10000, 50))
