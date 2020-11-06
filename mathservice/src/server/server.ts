import express from "express";
import bodyParser from "body-parser";
import mathServ from "./services/math.js";

// These CommonJS variables are not available in ES modules.
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const listenPort = process.env.PORT || 8000;
const apiURL = "/api/";

export class ServerREST {
    private server = express();
    constructor() {
        this.server.use(bodyParser.json())         // รับส่งข้อมูลไฟล์ JSON 
        this.server.get("/", (req, res) => {
            var text = "Math Services";
            res.setHeader('Content-type', "text/plain");  //res.setHeader('Content-disposition', 'attachment; filename=file.txt');
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