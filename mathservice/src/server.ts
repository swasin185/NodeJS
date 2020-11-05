import express from "express";
import bodyParser from "body-parser";

// const express = require("express")
const server = express()

// รับส่ง cookie ระหว่าง client/server ผ่าน CORS Credential 
const session = require('express-session')
const sess = {
    secret: 'TomNJerry',
    resave: true,
    saveUninitialized: true,
    expires: 60000
}
server.use(session(sess))

// const bodyParser = require('body-parser')
server.use(bodyParser.json())

// Application Middleware Function Allow CORS 
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

const baseURL = "/api/"
server.use(express.static(__dirname + '/../dist'));
server.get("/", (req, res) => {
    res.sendFile(__dirname + '/../dist/index.html');
})

// const loginService = require("./services/login.js")
// loginService(sess, app, baseURL)
require("./services/math.ts")(server, baseURL)

// run command : PORT=XXXX node server.js
const listenPort = process.env.PORT || 8000
server.listen(listenPort, () => {
    console.log('Services Server PORT :' + listenPort)
})