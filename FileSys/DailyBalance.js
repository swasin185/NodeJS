let fs = require("fs");

let inName = "Tinfoil-Portfolio-manager-Account-equity.csv";
let outName = "output.csv";

let readData = fs.readFileSync(inName, "utf-8");
let records = readData.split("\n");
let record = [];
let balances = [];
let date = undefined;
let curDate = undefined;
let unit = "";
let bal = 0;
let data = records[0] + "\n";
for (let i = 1; i < records.length; i++) {
    record = records[i].split(",");
    date = new Date(record[0]);
    unit = record[1];
    bal = record[2];
    if (curDate === undefined || curDate.getTime() === date.getTime()) {
        balances[unit] = {
            unit: unit,
            bal: bal,
            unitAcc: record[3],
            conv: record[4],
            valueUSD: record[5],
        };
        if (curDate === undefined) curDate = date;
    } else writeRecord();
}
date.setDate(date.getDate() + 1);
writeRecord();

fs.writeFileSync(outName, data, "utf-8");
console.log("create file " + outName);

function writeRecord() {
    while (curDate < date) {
        for (let rec of balances)
            if (rec !== undefined) {
                data +=
                    curDate.getFullYear() +
                    "-" +
                    curDate.getMonth() +
                    "-" +
                    curDate.getDate() +
                    ", " +
                    rec.unit +
                    ", " +
                    rec.bal +
                    ", " +
                    rec.unitAcc +
                    ", " +
                    rec.conv +
                    ", " +
                    rec.valueUSD +
                    "\n";
            }
        curDate.setDate(curDate.getDate() + 1);
    }
}
