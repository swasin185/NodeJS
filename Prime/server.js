var express = require('express');
var app = express();
var PORT = 3000;
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(PORT, function () { return console.log("Server listening on port: " + PORT); });
