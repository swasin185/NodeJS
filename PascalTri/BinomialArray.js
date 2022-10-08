function lifeGoOn(bArray, age) {
    var i = 0;
    var j = 0;
    for (var x_1 = 0; x_1 < age; x_1++) {
        if (bArray[i][j])
            bArray[i][j]++;
        else
            bArray[i][j] = 1;
        if (Math.random() < 0.5)
            i++;
        else
            j++;
    }
}
var age = 30;
var bArray = new Array(age);
for (var i = 0; i < age; i++) {
    bArray[i] = [];
}
for (var x_2 = age * 10; x_2 > 0; x_2--)
    lifeGoOn(bArray, age);
for (var _i = 0, bArray_1 = bArray; _i < bArray_1.length; _i++) {
    var row = bArray_1[_i];
    for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {
        var x_3 = row_1[_a];
        process.stdout.write(" ");
        if (x_3 < 10)
            process.stdout.write(" ");
        if (x_3 < 100)
            process.stdout.write(" ");
        if (x_3)
            process.stdout.write(x_3.toFixed());
        else
            process.stdout.write("   ");
    }
    if (row.length > 0)
        process.stdout.write("\n");
}
