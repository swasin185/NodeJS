class Invoice {
    invRef: string;
    customer: string;
    created: string;
    totalItem: number;
    totalVat: number;
    totalAmt: number;
}

class InvItem {
    invRef: string;
    descript: string;
    quantity: number;
    price: number;
    totalItem: number;
    totalVat: number;
    totalAmt: number;
}

const vat = 0.07;

const base10 = [1, 10, 1E2, 1E3, 1E4, 1E5, 1E6, 1E7, 1E8, 1E9];

function around(n: number, digit: number): number {
    return Math.round(n * base10[digit]) / base10[digit];
}

var invoices: Invoice[] = [
    { invRef: '001', customer: 'Tom', created: '26/08/2020  8:36', totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '002', customer: 'CFour', created: '27/08/2020 10:48', totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '003', customer: 'Tae', created: '28/08/2020  9:24', totalItem: 0, totalVat: 0, totalAmt: 0 }
];

var invitems: InvItem[] = [
    { invRef: '001', descript: 'Sandwich Hamcheese', quantity: 1, price: 22, totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '001', descript: 'MEJI Milk Cafe S', quantity: 100000, price: 12, totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '001', descript: 'Monfuer Water', quantity: 20000, price: 12.50, totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '002', descript: 'Sun Snack Original', quantity: 2, price: 10, totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '002', descript: 'SCOTT carepop', quantity: 4, price: 15.50, totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '002', descript: 'NESCAFE Co Brew', quantity: 3, price: 39, totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '002', descript: 'CORN', quantity: 1, price: 20, totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '003', descript: 'MEJI Milk L', quantity: 1, price: 22.50, totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '003', descript: 'PureLife Water', quantity: 1, price: 13, totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '003', descript: 'MAMA Pig', quantity: 3, price: 4.50, totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '003', descript: 'BANANA', quantity: 2, price: 9, totalItem: 0, totalVat: 0, totalAmt: 0 },
    { invRef: '003', descript: 'Sun Sanck Original', quantity: 5, price: 10, totalItem: 0, totalVat: 0, totalAmt: 0 }
];

let item = 0;
let vatx = 1 + vat;
for (let i = 0; i < invoices.length; i++) {
    let inv = invoices[i];
    console.log(inv.invRef, inv.created, inv.customer);
    let cnt = 0;
    let sumItem = 0;
    let sumVat = 0;
    while (item < invitems.length && invitems[item].invRef == inv.invRef) {
        cnt++;
        let it = invitems[item];
        it.totalAmt = around(it.quantity * it.price, 6);
        it.totalItem = around(it.totalAmt / vatx, 6);
        it.totalVat = around(it.totalAmt - it.totalItem, 6);
        console.log('\t', cnt, it.descript, '\t', it.quantity, '\t', it.price);
        sumItem += it.totalItem;
        sumVat += it.totalVat;
        inv.totalAmt += around(it.totalAmt, 6);
        item++;
    }
    inv.totalItem = around(inv.totalAmt / vatx, 2);
    inv.totalVat = around(inv.totalAmt - inv.totalItem, 2);
    inv.totalAmt = around(inv.totalAmt, 2);
    console.log('\ttotal =', inv.totalAmt, inv.totalItem, inv.totalVat);
    console.log('\ttotalX =', inv.totalAmt, around(sumItem, 2), around(sumVat, 2));
}



// var MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb://192.168.1.10:27017/mydb";
// var client = new MongoClient(uri, { useUnifiedTopology: true });


// client.connect(function (err, db) {
//     if (err) throw err;
//     let dbObj = db.db('mydb');
//     dbObj.collection('invoices').query(invoices,
//         function (err, res) {
//             console.log('insert');
//             db.close();
//         }
//     );
// });
