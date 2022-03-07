import Big from "big.js";
Big.DP = 100;
export default class Complex {
    private re: Big;
    private im: Big;
    
    public constructor(re: Big, im: Big) {
        this.re = re;
        this.im = im;
    }

    public absolute(): Big {
        return this.re.pow(2).add(this.im.pow(2)).sqrt();
    }

    public add(x: Complex): void {
        this.re = this.re.add(x.re);
        this.im = this.im.add(x.im);
    }

    public getImage(): Big {
        return this.im;
    }

    public getReal(): Big {
        return this.re;
    }

    public multiply(x: Complex): void {
        let re = this.re.times(x.re).minus(this.im.times(x.im));
        let im = this.re.times(x.im).add(this.im.times(x.re));
        this.re = re;
        this.im = im;
    }

    public power2(): void {
        this.multiply(this);
    }

    public equals(x: Complex): boolean {
        return this.re.eq(x.re) && this.im.eq(x.im);
    }
}
