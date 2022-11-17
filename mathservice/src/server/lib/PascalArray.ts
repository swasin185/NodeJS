export default class PascalArray {
    private arr: number[][] = [[0]]
    constructor(bits : number) {
        for (let i = 0; i < bits; i++)
            this.arr[i] = []
    }
    public toString():void {
        for (let row of this.arr) {
            for (let x of row) {
                process.stdout.write(" ")
                if (x < 10)
                    process.stdout.write(" ")
                if (x < 100)
                    process.stdout.write(" ")
                if (x < 1000)
                    process.stdout.write(" ")
                if (x)
                    process.stdout.write(x.toFixed())
                else
                    process.stdout.write("    ")
            }
            if (row.length > 0)
                process.stdout.write("\n")
        }
    }
    public put(n: number): void {
        let mark: number = 1
        let x : number = 0
        let i = 0;
        let j = 0;
        this.arr[i][j]++;
        while (mark < n) {
            x = n & mark
            if (x == 0) 
                i++
            else
                j++
            if (this.arr[i][j])
                this.arr[i][j]++
            else
                this.arr[i][j] = 1
            mark <<= 1
        }
    }
}