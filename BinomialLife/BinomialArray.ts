function lifeGoOn(bArray: number[][], age: number) {
    let i = 0
    let j = 0
    for (let x = 0; x < age; x++) {
        if (bArray[i][j])
            bArray[i][j]++
        else
            bArray[i][j] = 1
        if (Math.random() < 0.5)
            i++
        else
            j++
    }
}

let age: number = 30
let bArray: number[][] = new Array(age)
for (let i = 0; i < age; i++) {
    bArray[i] = []
}
for (let x = age * 10; x > 0 ; x--)
    lifeGoOn(bArray, age);

for (let row of bArray) {
    for (let x of row) {
        process.stdout.write(" ")
        if (x < 10)
            process.stdout.write(" ")
        if (x < 100)
            process.stdout.write(" ")
        if (x)
            process.stdout.write(x.toFixed())
        else
            process.stdout.write("   ")
    }
    if (row.length > 0)
        process.stdout.write("\n")
}