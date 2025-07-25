import Converter from '../lib/Converter.js'
import LongDivision from '../lib/LongDivision.js'
import Prime from '../lib/Prime.js'

export default (server: any, apiURL: string) => {
    Prime.readFile()
    console.log('Math Services register...')

    server.get(apiURL + 'getPrimes', (req, res) => {
        const urlParams = new URLSearchParams(new URL('http:/' + req.url).search)
        let n = Prime.getLength()
        if (urlParams && urlParams.get('n')) { n = Number(urlParams.get('n')) }
        if (n > Prime.getLength()) { Prime.createPrimeArrayCount(n) }
        const allPrimes: any[] = new Array(n)
        for (let i = 0; i < n; i++) { allPrimes[i] = { p: Prime.getPrime(i).toFixed() } }
        res.json(allPrimes)
    })

    server.get(apiURL + 'isPrime', (req, res) => {
        const urlParams = new URLSearchParams(new URL('http:/' + req.url).search)
        let x = '1'
        if (urlParams && urlParams.get('x')) { x = String(urlParams.get('x')) }
        res.json({ x: x.toString(), prime: Prime.isPrime(x) })
    })

    server.get(apiURL + 'goldbach', (req, res) => {
        const urlParams = new URLSearchParams(new URL('http:/' + req.url).search)
        let x = '2'
        if (urlParams && urlParams.get('x')) { x = urlParams.get('x') }
        res.json({ x: x, goldbacx: Prime.conjGoldbach(x) })
    })

    server.get(apiURL + 'goldbacx', (req, res) => {
        const urlParams = new URLSearchParams(new URL('http:/' + req.url).search)
        let x = '2'
        if (urlParams && urlParams.get('x')) { x = urlParams.get('x') }
        const n = Number(x)
        Prime.createPrimeArray(x)
        if (n % 2 != 0 && n > 2)
            return "Event number greater than 2 is required !"
        let gb: string[] = []
        gb = Prime.conjGoldbach(String(n))
        const dash = '─'
        let asc = '─'
        let des = ''
        let p = 1
        const half = n / 2
        if (n == 4) {
            asc += '┐'
            des = '┘'
        }
        for (let k = 3; k < n; k += 2) {
            while (Prime.getPrime(p).toNumber() < k) p++
            if (Prime.getPrime(p).toNumber() == k) {
                if (half > k)
                    asc += '┬'
                if (half == k) {
                    asc += '┐'
                    des = '┘'
                }
                if (half < k) des = '┴' + des
            } else {
                if (half >= k) asc += dash
                if (half <= k) des = dash + des
            }
        }
        let text: string = '<h1>Goldbach\'s conjecture</h1>'
        text += '<h5>Every even number greater than 2 can be expressed as the sum of two prime numbers. * 1 is not prime!</h5>'
        const pair: number[] = new Array(gb.length)
        let i = 0
        let row: string = ''
        for (const z of gb) {
            const px = n - Number(z)
            pair[i++] = px
            row = dash
            for (let j = 3; j < px; j += 2) {
                const found = pair.indexOf(j)
                if (found != -1)
                    row += '┼'
                else
                    row += dash
            }
            row += '┐' + px + ' + ' + z + '<br>'
            text += row
        }
        text += asc + '<br>' + des + '<br>'
        text += 'x = ' + x + '\t gb = ' + gb.length + '<br>'
        res.send(text)
    })

    server.get(apiURL + 'primeGraph', (req, res) => {
        const urlParams = new URLSearchParams(new URL('http:/' + req.url).search)
        let x = '2'
        if (urlParams && urlParams.get('x')) { x = urlParams.get('x') }
        const n = Number(x)
        // let gb : String[]
        let line = ''
        let h = n / 2
        if (h % 2 !== 0) h++
        let y = 0
        for (let i = 0; i < n; i++) {
            // y = Prime.sumReciprocal(i + 1)
            // line += Prime.getPrime(i) + ' ' + y + '\n'
            y = Prime.primeCount(i + 1)
            line += Prime.getPrime(i) + ' ' + y + '\n'
            // line += (i + 1) + ' ' + y + '\n'
        }
        res.setHeader('Content-type', 'text/plain')
        res.setHeader('Content-disposition', 'attachment; filename=gdata.txt')
        res.send(line)
    })

    server.get(apiURL + 'primeFile', (req, res) => {
        res.setHeader('Content-type', 'text/plain')
        res.setHeader('Content-disposition', 'attachment; filename=prime.txt')
        res.sendFile(process.cwd() + '/' + Prime.fileName)
    })

    server.get(apiURL + 'chart', (req, res) => {
        res.setHeader('Content-type', 'text/javscript')
        res.setHeader('Content-disposition', 'attachment; filename=Chart.js')
        res.sendFile(process.cwd() + '/dist/client/lib/Chart.js')
    })

    server.get(apiURL + 'gcd', (req, res) => {
        const urlParams = new URLSearchParams(new URL('http:/' + req.url).search)
        if (urlParams && urlParams.get('a') && urlParams.get('b')) {
            const a = urlParams.get('a')
            const b = urlParams.get('b')
            res.json({ a: a, b: b, gcd: Converter.gcd(a, b) })
        } else {
            res.status(500).json({ error: 'input error' })
        }
    })

    server.get(apiURL + 'baseConvert', (req, res) => {
        const urlParams = new URLSearchParams(new URL('http:/' + req.url).search)
        if (urlParams && urlParams.get('x') && urlParams.get('baseIn') && urlParams.get('baseOut')) {
            const x = urlParams.get('x')
            const baseIn = Number(urlParams.get('baseIn'))
            const baseOut = Number(urlParams.get('baseOut'))
            res.json({ x: x, baseIn: baseIn, baseOut: baseOut, y: Converter.convert(x, baseIn, baseOut) })
        } else {
            res.status(500).json({ error: 'input error' })
        }
    })

    server.get(apiURL + 'longDivision', (req, res) => {
        const urlParams = new URLSearchParams(new URL('http:/' + req.url).search)
        if (urlParams && urlParams.get('dividend') && urlParams.get('divisor')) {
            const dividend = Number(urlParams.get('dividend'))
            const divisor = Number(urlParams.get('divisor'))
            let result = new LongDivision(dividend, divisor);
            //res.json(JSON.stringify(result))
            res.json(result)
        } else {
            res.status(500).json({ error: 'input error' })
        }
    })

    server.get(apiURL + 'logout', (req, res) => {
        req.session.destroy()
        res.send('Logout')
    })
}
