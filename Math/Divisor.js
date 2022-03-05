var N = Number(process.argv[2]);
var MAX_PRECISION = N * 2;
var MAX_DISPLAY = 45;
var array_x = new Array(N);
var array_y = new Array(N);
for (var i = 0; i < N; i++) {
    array_x[i] = 1;
    array_y[i] = i + 1;
}
var digits = new Array(MAX_PRECISION);
for (var i = 1; i <= N; i++) {
    var x = array_x[i - 1];
    var y = array_y[i - 1];
    process.stdout.write("[" + i + "][" + x + "/" + y + "]");
    var z = Math.floor(x / y);
    x = (x % y) * 10;
    var head = 0;
    var tail = 0;
    var repeat = 0;
    var length_1 = 0;
    while (tail == 0 || (tail < MAX_PRECISION && x > 0 &&
        (repeat < 10 || repeat < length_1))) {
        digits[tail] = Math.floor(x / y);
        x = (x % y) * 10;
        if (tail > 0) {
            var search = 0;
            while (search < tail && digits[head] != digits[tail]) {
                search++;
                head++;
                head %= tail;
                repeat = 0; // if miss just one point reset repeat to 0;
            }
            if (head < tail && digits[head] == digits[tail]) {
                length_1 = tail - head;
                repeat++;
                if (repeat == 1) // if start count repeat, check left most position
                    while (repeat <= head &&
                        digits[head - repeat] == digits[tail - repeat])
                        repeat++;
                head++;
            }
            else {
                repeat = 0;
                length_1 = 0;
                head = 0;
            }
        }
        tail++;
    }
    process.stdout.write("[" + repeat + "]\t" + z + ".");
    if (repeat <= 1) {
        for (var j = 0; j < tail && j < MAX_DISPLAY; j++)
            process.stdout.write(String(digits[j]));
    }
    else {
        for (var j = 0; j < head - repeat && j < MAX_DISPLAY; j++)
            process.stdout.write(String(digits[j]));
        process.stdout.write("|");
        for (var j = head - repeat; j < tail - repeat && j < MAX_DISPLAY; j++)
            process.stdout.write(String(digits[j]));
        if (tail - repeat < MAX_DISPLAY)
            process.stdout.write("|");
        else
            process.stdout.write("..");
    }
    process.stdout.write("\n");
}
