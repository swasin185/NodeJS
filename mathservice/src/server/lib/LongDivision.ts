export default class LongDivision {
    private dividend: number;
    private divisor: number;
    private decimal: String;
    private quotient: number;
    private repeatPoint: number;

    private remainderList: number[];

    constructor(dividend: number, divisor: number) {
        console.time("LongDivision");
        this.dividend = dividend;
        this.divisor = divisor;
        this.quotient = Math.floor(dividend / divisor);
        let remainder = dividend % divisor;
        let output = [];
        this.remainderList = [];
        this.repeatPoint = 0;
        let limit = Math.floor(Math.log(divisor) * 4)
        for (let point = 0; remainder != 0 && this.repeatPoint == 0; point++) {
            this.remainderList.push(remainder)
            remainder *= 10;
            output.push(Math.floor(remainder / divisor))
            remainder %= divisor;
            if (remainder != 0) {
                for (let i = 0; i < point  && i < limit && this.repeatPoint == 0; i++)
                    if (this.remainderList[i] == remainder)
                        this.repeatPoint = i + 1;
            }
        }
        this.decimal = output.join("");
        console.info(dividend, divisor);
        console.timeEnd("LongDivision");
    }
        
    public getRemainderList(): number[] {
        return this.remainderList;
    }

    public getRepeatPoint(): number {
        return this.repeatPoint;
    }

    public getDecimalLength(): number {
        return this.decimal.length;
    }

    public getQuotient(): number {
        return this.quotient;
    }

    public toString() {
        if (this.decimal.length == 0)
            return this.quotient;
        else
            return this.quotient + "." + this.decimal;
    }

}

// const n = 20
// const result = new LongDivision(51, 97);
// console.log(result.toString());
// console.log(result.getDecimalLength());
// console.log(result.getRepeatPoint());
// console.log(result.getRemainderList());