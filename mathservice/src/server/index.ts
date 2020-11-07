import express from "express";
import bodyParser from "body-parser";
import mathServ from "./services/math.js";
import Prime from './lib/Prime.js';

const listenPort = process.env.PORT || 8000
const apiURL = "/api/"

export class ServerREST {
    private server = express();
    constructor() {
        this.server.use(bodyParser.json())              // รับส่งข้อมูลไฟล์ JSON 
        this.server.use(function (req, res, next) {     // Application Middleware Function Allow CORS 
            res.header("Access-Control-Allow-Origin", req.headers.origin);
            next();
        });

        this.server.get("/", (req, res) => {
            res.setHeader('Content-type', "text/html");
            let text = "<h1>Math Services</h1>";
            text += '\n<br><a href="http://' + req.get('host') + '/api/primeFile">' + 'ไฟล์ text จำนวนเฉพาะ' + '</a>';
            text += '\n<br><a href="http://' + req.get('host') + '/api/getPrimes?n=' + Prime.getLength() + '">' + 'JSON จำนวนเฉพาะ n ตัว' + '</a>';
            text += '\n<br><a href="http://' + req.get('host') + '/api/isPrime?x=' + Prime.getLastPrime() + '">' + 'JSON เช็ค x เป็นจำนวนเฉพาะหรือไม่' + '</a>';
            text += '\n<br><a href="http://' + req.get('host') + '/api/gcd?a=81&b=63">' + 'JSON ตัวหารร่วมมากของ a และ b' + '</a>';
            res.send(text);
        });
        mathServ(this.server, apiURL);
        process.on('exit', (code) => {
            console.log('exit!')
            Prime.saveFile();
        });
    }
    public start(): void {
        this.server.listen(listenPort, () => {
            console.log('start Services Server PORT :' + listenPort)
        });
    }
}
const serve = new ServerREST().start();