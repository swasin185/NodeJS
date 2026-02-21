let N = Number(process.argv[2]);
let MAX_PRECISION = N * 2;
let MAX_DISPLAY = 45;
let array_x = new Array(N);
let array_y = new Array(N);
for (let i = 0; i < N; i++) {
    array_x[i] = 1;
    array_y[i] = i + 1;
}
let digits = new Array(MAX_PRECISION);
for (let i = 1; i <= N; i++) {
    let x = array_x[i - 1];
    let y = array_y[i - 1];
    let col1 = ("[" + i + "]").padStart(7);
    let col2 = ("[" + x + "/" + y + "]").padStart(10);
    process.stdout.write(col1 + "\t" + col2);
    let z = Math.floor(x / y);
    x = (x % y) * 10;
    let head = 0;
    let tail = 0;
    let repeat = 0;
    let length = 0;
    let search = 0;
    while (tail == 0 || (tail < MAX_PRECISION && x > 0 &&
        (repeat < 10 || repeat < length))) {
        digits[tail] = Math.floor(x / y);
        x = (x % y) * 10;
        if (tail > 0) {
            search = 0;
            while (search < tail && digits[head] != digits[tail]) {
                search++;
                head++;
                head %= tail;
                repeat = 0; // if miss just one point reset repeat to 0
            }
            if (head < tail && digits[head] == digits[tail]) {
                length = tail - head;
                repeat++;
                if (repeat == 1) // if start count repeat, check left most position
                    while (repeat <= head &&
                        digits[head - repeat] == digits[tail - repeat])
                        repeat++;
                head++;
            }
            else {
                repeat = 0;
                length = 0;
                head = 0;
            }
        }
        tail++;
    }
    process.stdout.write("\t" + z + ".");
    if (repeat > 0) {
        for (let j = 0; j < head - repeat && j < MAX_DISPLAY; j++)
            process.stdout.write(String(digits[j]));
        process.stdout.write("|");
        for (let j = head - repeat; j < tail - repeat && j < MAX_DISPLAY; j++)
            process.stdout.write(String(digits[j]));
        if (tail - repeat < MAX_DISPLAY)
            process.stdout.write("|");
        else
            process.stdout.write("..");
    } else {
        for (let j = 0; j < tail && j < MAX_DISPLAY; j++)
            process.stdout.write(String(digits[j]));
    }
    process.stdout.write("\n");
}
