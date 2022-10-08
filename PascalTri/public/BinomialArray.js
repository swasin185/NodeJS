function lifeGoOn(bArray, age) {
    var i = 0;
    var j = 0;
    for (var x_1 = 0; x_1 < age; x_1++) {
        // if (i == bArray.length)  {
        // } else {
        //     if (bArray[i] == undefined) {
        //         bArray[i] = [0];
        //     } else if (j == bArray[i].length)  {
        //         bArray[i] = bArray[i].concat([0])
        //     }
        // }
        bArray[i][j]++;
        if (Math.random() < 0.5) {
            i++;
        }
        else {
            j++;
        }
    }
}
var z = [0, 0, 0];
z.fill(0);
var age = 10;
var bArray = new Array(age);
for (var i = 0; i < age; i++) {
    bArray[i] = new Array(age);
    bArray[i].fill(0);
}
lifeGoOn(bArray, age);
console.log(bArray);
