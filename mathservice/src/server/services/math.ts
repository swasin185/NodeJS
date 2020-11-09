import Prime from '../lib/Prime.js'

import Big from 'big.js'

export default (server: any, apiURL: string) => {
  Prime.readFile()
  console.log('Math Services register...')

  server.get(apiURL + 'getPrimes', (req, res) => {
    const urlParams = new URLSearchParams(new URL('http:/' + req.url).search)
    let n = Prime.getLength()
    if (urlParams && urlParams.get('n')) { n = Number(urlParams.get('n')) }
    if (n > Prime.getLength()) { Prime.createPrimeArrayCount(n) }
    // { // calculate new prime for count = n
    // let p = Number(Prime.getLastPrime());
    // let ratio = n / p * Math.log(p);
    // let lp = Math.floor(Prime.getLength() * Math.log(p));
    // p = Math.floor(lp * ratio);
    // console.log('new P = ', p);
    // Prime.createPrimeArray(String(p));
    // }
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

  server.get(apiURL + 'primeFile', (req, res) => {
    res.setHeader('Content-type', 'text/plain')
    res.setHeader('Content-disposition', 'attachment; filename=prime.txt')
    res.sendFile(process.cwd() + '/' + Prime.fileName)
  })

  server.get(apiURL + 'chart', (req, res) => {
    res.setHeader('Content-type', 'text/javscript')
    res.sendFile(process.cwd() + '/dist/client/lib/Chart.js')
  })

  server.get(apiURL + 'gcd', (req, res) => {
    const urlParams = new URLSearchParams(new URL('http:/' + req.url).search)
    let a = new Big('1')
    let b = new Big('1')
    if (urlParams && urlParams.get('a')) { a = new Big(urlParams.get('a')) }
    if (urlParams && urlParams.get('b')) { b = new Big(urlParams.get('b')) }
    let gcd = b
    if (b.gt(a)) {
      b = a
      a = gcd
      gcd = b
    }
    while (!b.eq(0)) {
      gcd = a.mod(b)
      a = b
      b = gcd
    }
    gcd = a
    res.json({ a: urlParams.get('a'), b: urlParams.get('b'), gcd: gcd.toString() })
  })

  server.get(apiURL + 'logout', (req, res) => {
    req.session.destroy()
    res.send('Logout')
  })
}
