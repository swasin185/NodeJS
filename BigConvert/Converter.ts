const baseInput = document.getElementById("baseInput") as HTMLInputElement;
const numInput = document.getElementById("numInput") as HTMLInputElement;
const baseConvert = document.getElementById("baseConvert") as HTMLInputElement;
const numConvert = document.getElementById("numConvert") as HTMLInputElement;

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
    console.log(x)
    y = '.';
    console.log(b.toFixed());
    while (b.gt(0) && y.length < Big.DP) {
        console.log(b.toFixed(), 'x', base);
        b = b.mul(base); // fraction(mod 1) x base
        y += digits[b.round(0, 0).toNumber()];
        b = b.mod(1);
    }
    if (y == '.')
        y = '';
    else if (b.gt(0)) {
        y += '...';
    }
    console.log(y)
    numConvert.value = x + y;
}

function valueOf(digit: string, base: number): number {
    let found = - 1;
    for (let i = 0; i < digits.length && found == -1; i++)
        if (digit.toUpperCase() == digits[i] && i <= base)
            found = i;

    if (found == -1 && digit != '.')
        throw new Error("Digit Error!!");

    return found;
}
