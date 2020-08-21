var Student = /** @class */ (function () {
    function Student() {
    }
    return Student;
}());
var fs = require("fs");
var obj;
var students = new Array(2);
students[0] = new Student();
students[0].id = "1";
students[0].name = "Tom";
students[0].score = 100;
students[1] = new Student();
students[1].id = "2";
students[1].name = "Jerry";
students[1].score = 80;
var fileName = 'hello.csv';
fs.writeFileSync(fileName, JSON.stringify(students));
console.log("create file " + fileName);
var readData = fs.readFileSync(fileName, 'utf-8');
console.log("String = ", readData);
obj = JSON.parse(readData);
console.log("Object = ", obj);
// fs.writeFile("hello.csv", data, (err) => {
//     if (err) console.log(err);
//     console.log("Successfully Written to File.");
// });
