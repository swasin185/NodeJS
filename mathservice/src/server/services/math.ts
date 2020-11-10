import Converter from '../lib/Converter.js'
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
    res.json({ x: x, goldbacx: Prime.goldbachConjecture(x) })
  })

  server.get(apiURL + 'primeFile', (req, res) => {
    res.setHeader('Content-type', 'text/plain')
    res.setHeader('Content-disposition', 'attachment; filename=prime.txt')
    res.sendFile(process.cwd() + '/' + Prime.fileName)
  })

  server.get(apiURL + 'chart', (req, res) => {
    res.setHeader('Content-type', 'text/javscript')
    res.setHeader('Content-disposition', 'attachment; filename=prime.txt')
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

  server.get(apiURL + 'logout', (req, res) => {
    req.session.destroy()
    res.send('Logout')
  })
}
