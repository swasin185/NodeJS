import Big from "big.js";

class Complex {
    public static SIZE = 15;
    private re: Big;
    private im: Big;
    public constructor(re: number, im: number) {
        this.re = new Big(re);
        this.im = new Big(im);
    }
    public absolute(): number {
        return this.re.pow(2).round(ComplexNumber.SIZE, 1).add(this.im.pow(2).round(ComplexNumber.SIZE, 1)).
            sqrt().round(ComplexNumber.SIZE, 1).toNumber();
        // return this.re.abs().add(this.im.abs()).toNumber();
        // return Math.hypot(this.re, this.im); // to too complicated for Mandelbrot
        //return Math.abs(this.re.toNumber()) + Math.abs(this.im.toNumber()); // too easy
    }

    public add(x: Complex): void {
        // this.re = Math.round((this.re + x.re) * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
        // this.im = Math.round((this.im + x.im) * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
        this.re = this.re.add(x.re);
        this.im = this.im.add(x.im);
    }

    public getImage(): number {
        return this.im.toNumber();
    }
    public getReal(): number {
        return this.re.toNumber();
    }

    public multiply(x: Complex): void {
        // let re = (this.re * x.re) - (this.im * x.im);
        // let im = (this.re * x.im) + (this.im * x.re);
        // this.re = Math.round(re * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
        // this.im = Math.round(im * ComplexNumber.PRECISION) / ComplexNumber.PRECISION;
        let re = this.re.times(x.re).round(ComplexNumber.SIZE, 1).minus(this.im.times(x.im).round(ComplexNumber.SIZE, 1));
        let im = this.re.times(x.im).round(ComplexNumber.SIZE, 1).add(this.im.times(x.re).round(ComplexNumber.SIZE, 1));
        this.re = re;
        this.im = im;
    }

    public power2(): void {
        this.multiply(this);
    }
}
