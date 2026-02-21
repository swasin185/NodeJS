use std::env;
use std::io::{self, Write};

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        eprintln!("Usage: {} <N>", args[0]);
        std::process::exit(1);
    }

    let n: usize = args[1].parse().expect("N must be a positive integer");
    let max_precision = n * 2;
    let max_display = 45;

    let array_x: Vec<i64> = vec![1; n];
    let array_y: Vec<i64> = (1..=(n as i64)).collect();

    let mut digits = vec![0i64; max_precision];
    let stdout = io::stdout();
    let mut out = io::BufWriter::new(stdout.lock());

    for i in 1..=n {
        let mut x = array_x[i - 1];
        let y = array_y[i - 1];

        let col1 = format!("[{}]", i);
        let col2 = format!("[{}/{}]", x, y);
        write!(out, "{:>7}\t{:>10}", col1, col2).unwrap();

        let z = x / y;
        x = (x % y) * 10;

        let mut head: usize = 0;
        let mut tail: usize = 0;
        let mut repeat: usize = 0;
        let mut length: usize = 0;

        while tail == 0
            || (tail < max_precision && x > 0 && (repeat < 10 || repeat < length))
        {
            digits[tail] = x / y;
            x = (x % y) * 10;

            if tail > 0 {
                let mut search = 0usize;
                while search < tail && digits[head] != digits[tail] {
                    search += 1;
                    head += 1;
                    head %= tail;
                    repeat = 0;
                }

                if head < tail && digits[head] == digits[tail] {
                    length = tail - head;
                    repeat += 1;
                    if repeat == 1 {
                        while repeat <= head
                            && digits[head - repeat] == digits[tail - repeat]
                        {
                            repeat += 1;
                        }
                    }
                    head += 1;
                } else {
                    repeat = 0;
                    length = 0;
                    head = 0;
                }
            }
            tail += 1;
        }

        write!(out, "\t{}.", z).unwrap();

        if repeat > 0 {
            let non_rep_end = head.saturating_sub(repeat);
            for j in 0..non_rep_end {
                if j >= max_display { break; }
                write!(out, "{}", digits[j]).unwrap();
            }
            write!(out, "|").unwrap();
            for j in non_rep_end..(tail.saturating_sub(repeat)) {
                if j >= max_display { break; }
                write!(out, "{}", digits[j]).unwrap();
            }
            if tail.saturating_sub(repeat) < max_display {
                write!(out, "|").unwrap();
            } else {
                write!(out, "..").unwrap();
            }
        } else {
            for j in 0..tail {
                if j >= max_display { break; }
                write!(out, "{}", digits[j]).unwrap();
            }
        }
        writeln!(out).unwrap();
    }
}
