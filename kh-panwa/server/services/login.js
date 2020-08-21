const Library = require("../library.js")
const Client = require("../../src/client.js")
const Database = require("../database.js")

module.exports =
    loginService = (app, baseURL) => {

        app.post(baseURL + "getSession", (req, res) => {
            let sess = req.session
            let data = sess.id
            if (req.body.var) {
                if (req.body.var == 'date') {
                    data = new Date(s)
                } else {
                    data = sess[req.body.var]
                }
            } else {
                data = sess
            }
            res.json(data)
        })

        app.post(baseURL + "login", async (req, res) => {
            let sess = req.session
            let result = await Database.selectUser(req.body.user)
            console.log(result[0].userName)
            if (req.body.user == result[0].userName) {
                sess.user = req.body.user
                sess.name = 'ชื่อจากฐานข้อมูล'
            }
            res.json({ user: sess.user, name: sess.name })
        })

        app.post(baseURL + "logout", (req, res) => {
            req.session.destroy()
            res.send("Logout")
        })

        app.post(baseURL + "connectServer", (req, res) => {
            let sess = req.session
            let now = new Date()

            if (sess.user == undefined)
                sess.user = ""

            console.log(Client.formatTime(now) + "\t" + sess.user +
                " \t" + req.body.caller + "\t" + req.ip)

            let portDB = Library.getServiceDB(process.env.PORT)

            res.json({
                comDB: portDB.db, company: portDB.name,
                today: Client.formatDate(now), user: sess.user, color: portDB.color
            })
        })

        app.post(baseURL + "getPermissions", (req, res) => {
            let sess = req.session
            let permissions = []
            if (sess.user = 'admin') {
                Library.menuGroup.forEach(function (group) {
                    let menuItem = []
                    Library.menuProgram.forEach(function (item) {
                        if (item.groupName == group.name)
                            menuItem.push({
                                name: item.name, title: item.title,
                                icon: item.icon, active: item.active, level: 9
                            })
                    })
                    permissions.push({ name: group.name, icon: group.icon, programs: menuItem })
                })
            }
            res.json(permissions)
        })
    }   