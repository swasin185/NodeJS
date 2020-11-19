import Big from 'big.js'

export default class Converter {
    private static digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '!', '"', '#', '$', '%', '&', '(', ')', '*', '+', ',', '-', '/',
        ']', ':', ';', '<', '=', '>', '?', '[', '\\', ']', '^', '_', '{',
        '|', '}', '~', '\'', '"', '`']

    public static convert (numInput : string, baseIn:number, baseOut:number) : string {
        let point = numInput.length
        for (let i = 0; i < numInput.length && point === numInput.length; i++) {
            if (Converter.valueOf(numInput[i], baseIn) === -1) point = i
        }

        const x = numInput.substring(0, point)
        const y = numInput.substring(point, numInput.length)
        let value = new Big(0)
        // console.log(x)
        for (let i = 0; i < x.length; i++) {
        // console.log(value.toFixed(), 'x', baseIn, '+', Converter.valueOf(x[i], baseIn))
            value = value.mul(baseIn)
            value = value.add(Converter.valueOf(x[i], baseIn))
        }
        let fraction = new Big(0)
        // console.log(y)
        for (let i = y.length - 1; i > 0; i--) {
        // console.log(fraction.toFixed(), '+', Converter.valueOf(y[i], baseIn), '/', baseIn)
            fraction = fraction.add(Converter.valueOf(y[i], baseIn))
            fraction = fraction.div(baseIn)
        }

        let a = value
        let numConvert : string = ''
        console.log(value)
        while (a.gt(0) && x.length < Big.DP) {
            console.log(a.mod(baseOut).toNumber(), '\t', a.toFixed(), '/', baseOut)
            numConvert = Converter.digits[a.mod(baseOut).toNumber()] + numConvert
            if (baseOut > 1) { a = a.div(baseOut).round(0, 0) } else { a = a.minus(baseOut) }
        }
        //   let z = ''
        //   for (let i = x.length - 1; i >= 0; i--) {
        //     z = x[i] + z
        //     if ((x.length - i) % 4 == 0) { z = ' ' + z }
        //   }
        //   if (z === '') {  = '0' } else { x = z }
        let b = fraction
        if (b.gt(0)) {
            numConvert += '.'
            // console.log(b.toFixed())
            const precision = numConvert.length + 50
            while (b.gt(0) && numConvert.length < precision) {
                // console.log(b.toFixed(), 'x', baseOut)
                b = b.mul(baseOut) // fraction(mod 1) x base
                numConvert += Converter.digits[b.round(0, 0).toNumber()]
                b = b.mod(1)
            }
            if (b.gt(0)) {
                numConvert += '...'
            }
        }
        return numConvert
    }

    private static valueOf (digit: string, base: number): number {
        let found = -1
        for (let i = 0; i < Converter.digits.length && found === -1; i++) {
            if (digit === Converter.digits[i] && i < base) found = i
        }
        if (found === -1 && digit !== '.') { throw new Error('Digit Error!!') }
        return found
    }

    public static gcd (aText: string, bText:string) : string {
        const A = new Big(aText)
        const B = new Big(bText)
        let a = A
        let b = B
        let gcd = b
        if (b.gt(a)) {
            b = a
            a = gcd
            gcd = b
        }
        let r = ''
        while (!b.eq(0)) {
            if (r === '' && a.div(b).gt(b.mul(1000))) {
                r = A.div(a).round(0, 0).toFixed() + '/' + B.div(a).round(0, 0).toFixed()
            }
            gcd = a.mod(b)
            a = b
            b = gcd
        }
        if (r === '') {
            r = A.div(a).round(0, 0).toFixed() + '/' + B.div(a).round(0, 0).toFixed()
        }
        console.log('ratio = ', r)
        return a.toFixed()
    }
}
