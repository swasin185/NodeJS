var Average = /** @class */ (function () {
    function Average() {
    }
    Average.avg = function (data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++)
            sum += data[i];
        return Math.round(sum / data.length * 1E6) / 1E6;
    };
    Average.incAvg = function (data) {
        var avg = 0;
        for (var i = 0; i < data.length; i++)
            avg = avg * (i / (i + 1)) + data[i] / (i + 1);
        return Math.round(avg * 1E6) / 1E6;
    };
    return Average;
}());
(function () {
    console.log("Incremental Average Sum");
    var n = 9999;
    var dataList = new Array(n);
    for (var i = 0; i < dataList.length; i++) {
        dataList[i] = Math.random() * n;
    }
    console.log("avg    = ", Average.avg(dataList));
    console.log("IncAvg = ", Average.incAvg(dataList));
})();
