import bodyParser from 'body-parser'
import express from 'express'
// import loginServ from './services/login.js'

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

        this.server.use(express.static(process.cwd() + '/dist'))
        this.server.get('/', (req, res) => {
            res.sendFile(process.cwd() + '/dist/index.html')
        })
        // loginServ(this.server, apiURL)
    }

    public start (): void {
        this.server.listen(listenPort, () => {
            console.log('start Services Server PORT :' + listenPort)
        })
    }
}

new Server().start()
