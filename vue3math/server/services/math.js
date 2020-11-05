module.exports =
    mathService = (app, baseURL) => {

        app.get(baseURL + "gcd", (req, res) => {
            let gcd = 1;
            res.json({ gcd: gcd })
        })

        app.get(baseURL + "hello", async (req, res) => {
            res.json({ message: 'Hello!' })
        })

        app.get(baseURL + "isPrime", async (req, res) => {
            let x = 0;
            res.json({ n: x,  prime: true })
        })


        app.get(baseURL + "logout", (req, res) => {
            req.session.destroy()
            res.send("Logout")
        })

    }   