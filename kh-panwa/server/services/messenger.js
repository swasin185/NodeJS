module.exports =
    messengerService = (app, baseURL) => {
        app.post(baseURL + "getAllSessions", (req, res) => {
            let data = new Array(10)
            for (let i=0; i<1000; i++) {
                data[i] = {title:'', icon:''}
                data[i].title = "ชื่อ" + (i + 1) 
                data[i].icon = "icon" + (i + 1) 
            }
            res.json(data)
        })
    }
