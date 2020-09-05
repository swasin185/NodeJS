class Invoice {
    static VAT = 0.07;
    invRef: string;
    customer: string;
    created: string;
    totalItem: number;
    totalVat: number;
    totalAmt: number;
    items: InvItem[];
    public calculate(): void {
        for (let it of this.items) {
            it.calculate();
            this.totalAmt += it.totalAmt;
        }
        this.totalAmt = around(this.totalAmt, 2);
        this.totalItem = around(this.totalAmt / (1 + Invoice.VAT), 2);
        this.totalVat = around(this.totalAmt - this.totalItem, 2);
    }
    public toString(): string {
        let st: string = 'ref:' + this.invRef + '\tdate:' + this.created + '\tcustomer:' + this.customer + '\n';
        st += 'Total Item:\t' + this.totalItem + '\n';
        st += 'Total VAT:\t' + this.totalVat + '\n';
        st += 'Total Amount:\t' + this.totalAmt + '\n';
        return st;
    }
}

class InvItem {
    descript: string;
    quantity: number;
    price: number;
    totalItem: number;
    totalVat: number;
    totalAmt: number;
    public calculate(): void {
        this.totalAmt = around(this.quantity * this.price, 6);
        this.totalItem = around(this.totalAmt / (1 + Invoice.VAT), 6);
        this.totalVat = around(this.totalAmt - this.totalItem, 6);
    }
}

const base10 = [1, 10, 1E2, 1E3, 1E4, 1E5, 1E6, 1E7, 1E8, 1E9];

function around(n: number, digit: number): number {
    return Math.round(n * base10[digit]) / base10[digit];
}

var invoices: Invoice[] = [
    {
        invRef: '001', customer: 'Tom', created: '26/08/2020  8:36', totalItem: 0, totalVat: 0, totalAmt: 0, items:
            [{ descript: 'Sandwich Hamcheese', quantity: 1, price: 22, totalItem: 0, totalVat: 0, totalAmt: 0, calculate: InvItem.prototype.calculate },
            { descript: 'MEJI Milk Cafe S', quantity: 10, price: 12, totalItem: 0, totalVat: 0, totalAmt: 0, calculate: InvItem.prototype.calculate },
            { descript: 'Monfuer Water', quantity: 20, price: 12.50, totalItem: 0, totalVat: 0, totalAmt: 0, calculate: InvItem.prototype.calculate }],
        calculate: Invoice.prototype.calculate, toString: Invoice.prototype.toString
    },
    {
        invRef: '002', customer: 'CFour', created: '27/08/2020 10:48', totalItem: 0, totalVat: 0, totalAmt: 0, items:
            [{ descript: 'Sun Snack Original', quantity: 2, price: 10, totalItem: 0, totalVat: 0, totalAmt: 0, calculate: InvItem.prototype.calculate },
            { descript: 'SCOTT carepop', quantity: 4, price: 15.50, totalItem: 0, totalVat: 0, totalAmt: 0, calculate: InvItem.prototype.calculate },
            { descript: 'NESCAFE Co Brew', quantity: 3, price: 39, totalItem: 0, totalVat: 0, totalAmt: 0, calculate: InvItem.prototype.calculate },
            { descript: 'CORN', quantity: 1, price: 20, totalItem: 0, totalVat: 0, totalAmt: 0, calculate: InvItem.prototype.calculate }],
        calculate: Invoice.prototype.calculate, toString: Invoice.prototype.toString
    },
    {
        invRef: '003', customer: 'Tae', created: '28/08/2020  9:24', totalItem: 0, totalVat: 0, totalAmt: 0, items:
            [{ descript: 'MEJI Milk L', quantity: 1, price: 22.50, totalItem: 0, totalVat: 0, totalAmt: 0, calculate: InvItem.prototype.calculate },
            { descript: 'PureLife Water', quantity: 1, price: 13, totalItem: 0, totalVat: 0, totalAmt: 0, calculate: InvItem.prototype.calculate },
            { descript: 'MAMA Pig', quantity: 3, price: 4.50, totalItem: 0, totalVat: 0, totalAmt: 0, calculate: InvItem.prototype.calculate },
            { descript: 'BANANA', quantity: 2, price: 9, totalItem: 0, totalVat: 0, totalAmt: 0, calculate: InvItem.prototype.calculate },
            { descript: 'Sun Sanck Original', quantity: 5, price: 10, totalItem: 0, totalVat: 0, totalAmt: 0, calculate: InvItem.prototype.calculate }],
        calculate: Invoice.prototype.calculate, toString: Invoice.prototype.toString
    }
];

for (let inv of invoices) {
    inv.calculate();
    console.log(inv.toString());
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
