import PascalArray from './PascalArray.js'
import Prime from './Prime.js'

Prime.readFile()
//Prime.createPrimeArrayCount(200)
const bin = new PascalArray(30)
console.log("=> ")
let x = 1024;
for (let i = 1; i <= x; i++) {
    //if (Prime.isPrime(i.toFixed()))       
        bin.put(i)
}
bin.toString()

