import express from "express";
import bodyParser from "body-parser";
import mathServ from "./services/math.js";
import Prime from './lib/Prime.js';

//These CommonJS variables are not available in ES modules.
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __fileName = fileURLToPath(import.meta.url);
// const __dirName = dirname(__fileName);
// console.log('file', __fileName);
// console.log('dir', __dirName);

const listenPort = process.env.PORT || 8000
const apiURL = "/api/"

export class ServerREST {
    private server = express();
    constructor() {
        this.server.use(bodyParser.json())         // รับส่งข้อมูลไฟล์ JSON 
        // Application Middleware Function Allow CORS 
        // ทำให้สามารถเรียกใช้ service ข้าม domain ได้
        this.server.use(function (req, res, next) {
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
    }
    public start(): void {
        this.server.listen(listenPort, () => {
            console.log('start Services Server PORT :' + listenPort)
        });
    }
}
const serve = new ServerREST().start();