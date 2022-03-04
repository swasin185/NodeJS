let N: number = 49999;
let MAX_PRECISION: number = N * 2;
let MAX_DISPLAY: number = 45;
let array_x: number[] = new Array(N);
let array_y: number[] = new Array(N);
let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
for (let i: number = 0; i < N; i++) {
    array_x[i] = 1;
    array_y[i] = i + 1;
}
let digits: number[] = new Array(MAX_PRECISION);
for (let i: number = 1; i <= N; i++) {
    let x: number = array_x[i - 1];
    let y: number = array_y[i - 1];
    process.stdout.write("[" + i + "][" + x + "/" + y + "]");
    let z: number = Math.floor(x / y);
    x = (x % y) * 10;
    let head: number = 0;
    let tail: number = 0;
    let repeat: number = 0;
    let length: number = 0;
    while (tail == 0 || (tail < MAX_PRECISION && x > 0 &&
        (repeat < 10 || repeat < length))) {
        digits[tail] = Math.floor(x / y);
        x = (x % y) * 10;
        if (tail > 0) {
            let search: number = 0;
            while (search < tail && digits[head] != digits[tail]) {
                search++;
                head++;
                head %= tail;
                repeat = 0;   // if miss just one point reset repeat to 0;
            }
            if (head < tail && digits[head] == digits[tail]) {
                length = tail - head;
                repeat++;
                if (repeat == 1) // if start count repeat, check left most position
                    while (repeat <= head &&
                        digits[head - repeat] == digits[tail - repeat])
                        repeat++;
                head++;
            } else {
                repeat = 0;
                length = 0;
                head = 0;
            }
        }
        tail++;
    }
    
    process.stdout.write("[" + repeat  + "]\t" + z + ".");
    if (repeat <= 1) {
        for (let j=0; j<tail && j<MAX_DISPLAY; j++)
            process.stdout.write(chars[digits[j]]);
    } else {
        for (let j=0; j<head-repeat && j<MAX_DISPLAY; j++)
            process.stdout.write(chars[digits[j]]);
        process.stdout.write("|");
        for (let j=head-repeat; j<tail-repeat && j<MAX_DISPLAY; j++)
            process.stdout.write(chars[digits[j]]);
        if (tail-repeat < MAX_DISPLAY) 
            process.stdout.write("|");
        else
            process.stdout.write("..");
    }
    process.stdout.write("\n");
}
