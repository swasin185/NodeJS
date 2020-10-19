const baseInput = document.getElementById("baseInput") as HTMLInputElement;
const numInput = document.getElementById("numInput") as HTMLInputElement;
const baseConvert = document.getElementById("baseConvert") as HTMLInputElement;
const numConvert = document.getElementById("numConvert") as HTMLInputElement;
const fracConvert = document.getElementById("fracConvert") as HTMLInputElement;

const aText = document.getElementById("a") as HTMLInputElement;
const bText = document.getElementById("b") as HTMLInputElement;
const gcdText = document.getElementById("gcd") as HTMLInputElement;



Big.DP = 50;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function calculate() {
    let base = Number(baseInput.value);
    let input = numInput.value;
    let point = input.length;
    for (let i = 0; i < input.length && point == input.length; i++)
        if (valueOf(input[i], base) == -1)
            point = i;

    let x = input.substring(0, point);
    let y = input.substring(point, input.length);
    let value = new Big(0);
    console.log(x);
    for (let i = 0; i < x.length; i++) {
        console.log(value.toFixed(), 'x', base, '+', valueOf(x[i], base));
        value = value.mul(base);
        value = value.add(valueOf(x[i], base));
    }
    console.log('value=', value.toFixed());
    let fraction = new Big(0);
    console.log(y);
    for (let i = y.length - 1; i > 0; i--) {
        console.log(fraction.toFixed(), '+', valueOf(y[i], base), '/', base);
        fraction = fraction.add(valueOf(y[i], base));
        fraction = fraction.div(base);
    }
    console.log('fraction=', fraction.toFixed());
    value = value.add(fraction);
    console.log('value10 = ', value.toFixed());

    base = Number(baseConvert.value);
    console.log('convert...');

    let a = value.round(0, 0);
    let b = value.minus(a);
    x = '';
    console.log(a.toFixed());
    while (a.gt(0) && x.length < Big.DP) {
        console.log(a.mod(base).toNumber(), '\t', a.toFixed(), '/', base);
        x = digits[a.mod(base).toNumber()] + x;
        a = a.div(base).round(0, 0);
    }
    console.log(x);
    let z = '';
    for (let i = x.length - 1; i >= 0; i--) {
        z = x[i] + z;
        if ((x.length - i) % 4 == 0)
            z = ' ' + z;
    }
    if (z == '')
        x = '0';
    else
        x = z;
        
    y = '.';
    console.log(b.toFixed());
    let i = 0;
    while (b.gt(0) && y.length < Big.DP) {
        i++;
        console.log(b.toFixed(), 'x', base);
        b = b.mul(base); // fraction(mod 1) x base
        y += digits[b.round(0, 0).toNumber()];
        if (i % 4 == 0)
            y += ' ';
        b = b.mod(1);
    }
    if (b.gt(0)) {
        y += '...';
    }
    console.log(y)
    numConvert.value = x;
    fracConvert.value = y;
}

function valueOf(digit: string, base: number): number {
    let found = - 1;
    for (let i = 0; i < digits.length && found == -1; i++)
        if (digit.toUpperCase() == digits[i] && i < base)
            found = i;
    if (found == -1 && digit != '.')
        throw new Error("Digit Error!!");
    return found;
}

function gcd() {
    let a = new Big(aText.value);
    let b = new Big(bText.value);
    let gcd = b;
    if (b.gt(a))  {
        b = a;
        a = gcd;
        gcd = b;
    }
    //gcd = a.mod(b);
    while (!b.eq(0)) {
        gcd = a.mod(b);
        a = b;
        b = gcd;
        console.log(a.toFixed(), b.toFixed());
    }
    gcdText.value = a.toFixed().toString();
}