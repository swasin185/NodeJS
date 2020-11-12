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
    res.json({ x: x, goldbacx: Prime.conjGoldbach(x) })
  })

  server.get(apiURL + 'goldbacx', (req, res) => {
    const urlParams = new URLSearchParams(new URL('http:/' + req.url).search)
    let x = '2'
    if (urlParams && urlParams.get('x')) { x = urlParams.get('x') }
    const n = Number(x)
    let i = Math.round(n / 2)
    if (i % 2 !== 0) { i++ }
    let gb : string[]
    let min :number = i
    let max : number = 0
    let minX : number = 1
    let maxX : number = n
    let text : string = '<h1>Goldbach\'s conjecture</h1>'
    while (i <= n) {
      gb = Prime.conjGoldbach(String(i))
      if (gb.length / i < min) {
        min = gb.length / i
        minX = i
      }
      if (gb.length / i > max) {
        max = gb.length / i
        maxX = i
      }
      i += 2
    }
    const dash = '─'
    let asc = '┌'
    let des = ''
    let p = 1
    const half = n / 2
    for (let k = 3; k < n; k++) {
      while (Prime.getPrime(p).toNumber() < k) p++
      if (n === k + 1) des = '└' + des
      else if (Prime.getPrime(p).toNumber() === k) {
        if (half > k) asc += '┬'
        else des = '┴' + des
      } else {
        if (half > k) {
          if (k % 2 !== 0) asc += dash
        } else {
          if (k % 2 !== 0) des = dash + des
        }
      }
    }

    const pair : number[] = new Array(gb.length)
    let row: string = ''
    for (const z of gb) {
      const px = n - Number(z)
      pair[pair.length++] = px
      row = dash
      for (let j = 3; j < px; j += 2) {
        const found = pair.indexOf(j)
        if (found !== -1) { row += '┼' } else { row += dash }
      }
      row += '┐' + px + ' + ' + z + '<br>'
      text += row
    }
    text += '\t' + asc + '<br> ' + des + '<br>'
    text += 'x = ' + x + '\t gb = ' + gb.length + ' == ' + gb.toString() + '<p>'
    text += 'Min x = ' + minX + ' gl = ' + min + '\tMax x = ' + maxX + ' gl = ' + max + '<p>'
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
    //      gb = Prime.conjGoldbach(String(i))
      y = Prime.primePop(i + 1).toNumber()
      line += Prime.getPrime(i) + ' ' + y + '\n'
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
