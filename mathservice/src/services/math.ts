export const mathService = (server: any, baseURL: string) => {
    console.log('MathService register');
    server.get(baseURL + "gcd", (req, res) => {
        let gcd = 1;
        res.json({gcd : gcd});
    })

    server.get(baseURL + "hello", (req, res) => {
        res.json({ message: 'Hello!' })
    })

    server.get(baseURL + "isPrime", (req, res) => {
        let x = 0;
        res.json({ n: x, prime: true })
    })


    server.get(baseURL + "logout", (req, res) => {
        req.session.destroy()
        res.send("Logout")
    })

}   