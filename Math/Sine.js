main()
async function main() {
    c = 50
    a = -c
    b = 0
    while (a <= c) {
        b = Math.round(Math.sqrt(c * c - a * a) - 1)
        console.log(
            "#".padStart(c - b) +
            "#".padStart(2 * b)
        )
        await new Promise(r => setTimeout(r, 100))
        a += 4
    }
}