var fs = require("fs");

var data = "Hello, World, CSV, File\nNew, Line, Hello, World";
var fileName = 'hello.csv'

fs.writeFileSync(fileName, data, 'utf-8');
console.log("create file " + fileName);

var readData = fs.readFileSync(fileName, 'utf-8');
console.log(readData);
let rows = readData.split('\n');

for (let i=0; i<rows.length; i++)
    console.log(rows[i].split(','));
// fs.writeFile("hello.csv", data, (err) => {
//     if (err) console.log(err);
//     console.log("Successfully Written to File.");
// });
console.log(Math.ceil(Math.log(8)/Math.log(2)), Math.log(8)/Math.log(2))