import { readFileSync } from "fs"
import MDBReader from "mdb-reader"

const buffer = readFileSync("att2000.mdb")
const reader = new MDBReader(buffer)

const table = reader.getTable("CHECKINOUT")
const data = table.getData();
const fromDate = new Date("2021-06-01 00:00")
const toDate = new Date("2021-06-05 00:00")
for (let record of data) {
    if (record.CHECKTIME > fromDate && record.CHECKTIME < toDate) {
        const checkDate = new Date(record.CHECKTIME.toString());
        const date = checkDate.toISOString().substring(0,10)
        const time = checkDate.toISOString().substring(11,19)
        console.log(record.USERID, '\t', 
        date, '\t', time, '\t',
         record.SENSORID)
    }
}
