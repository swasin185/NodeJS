import bodyParser from 'body-parser'
import express from 'express'
import mathServ from './services/math.js'

const listenPort = process.env.PORT || 8000
const apiURL = '/api/'

export default class Server {
    private server = express();
    constructor () {
      this.server.use(bodyParser.json()) // รับส่งข้อมูลไฟล์ JSON
      this.server.use(function (req, res, next) { // Application Middleware Function Allow CORS
        res.header('Access-Control-Allow-Origin', req.headers.origin)
        next()
      })

      this.server.use(express.static(process.cwd() + '/dist/client'))
      this.server.get('/', (req, res) => {
        res.sendFile(process.cwd() + '/dist/client/goldbach.html')
      })
      // this.server.get('/', (req, res) => {
      //   res.setHeader('Content-type', 'text/html')
      //   let text = '<h1>Math Services</h1>'
      //   text += '\n<br><a href="http://' + req.get('host') + '/api/primeFile">' + 'ไฟล์ text จำนวนเฉพาะ' + '</a>'
      //   text += '\n<br><a href="http://' + req.get('host') + '/api/getPrimes?n=' + Prime.getLength() + '">' + 'JSON จำนวนเฉพาะ n ตัว' + '</a>'
      //   text += '\n<br><a href="http://' + req.get('host') + '/api/isPrime?x=' + Prime.getLastPrime() + '">' + 'JSON เช็ค x เป็นจำนวนเฉพาะหรือไม่' + '</a>'
      //   text += '\n<br><a href="http://' + req.get('host') + '/api/gcd?a=81&b=63">' + 'JSON ตัวหารร่วมมากของ a และ b' + '</a>'
      //   res.send(text)
      // })
      mathServ(this.server, apiURL)
    }

    public start (): void {
      this.server.listen(listenPort, () => {
        console.log('start Services Server PORT :' + listenPort)
      })
    }

    public getExpress () : any {
      return this.server
    }
}

new Server().start()
