#!/bin/bash

N=10000
echo "Benchmarking Divisor algorithm with N=$N..."
echo "Language,Time(s)" > results.csv

# NodeJS
echo "NodeJS..."
START=$(date +%s.%N)
node Divisor.js $N > /dev/null
END=$(date +%s.%N)
DIFF=$(echo "$END - $START" | bc)
echo "NodeJS,$DIFF" >> results.csv

# Python
echo "Python..."
START=$(date +%s.%N)
python3 python/Divisor.py $N > /dev/null
END=$(date +%s.%N)
DIFF=$(echo "$END - $START" | bc)
echo "Python,$DIFF" >> results.csv

# Go
echo "Go..."
# Compile first
go build -o go_divisor go/Divisor.go
START=$(date +%s.%N)
./go_divisor $N > /dev/null
END=$(date +%s.%N)
DIFF=$(echo "$END - $START" | bc)
echo "Go,$DIFF" >> results.csv
rm go_divisor

# Java
echo "Java..."
# Compile first
javac java/Divisor.java
START=$(date +%s.%N)
java -cp java Divisor $N > /dev/null
END=$(date +%s.%N)
DIFF=$(echo "$END - $START" | bc)
echo "Java,$DIFF" >> results.csv

# C
echo "C..."
# Compile first
gcc c/Divisor.c -o c_divisor
START=$(date +%s.%N)
./c_divisor $N > /dev/null
END=$(date +%s.%N)
DIFF=$(echo "$END - $START" | bc)
echo "C,$DIFF" >> results.csv
rm c_divisor

# Rust
echo "Rust..."
# Compile first
rustc -O rust/divisor.rs -o rust_divisor
START=$(date +%s.%N)
./rust_divisor $N > /dev/null
END=$(date +%s.%N)
DIFF=$(echo "$END - $START" | bc)
echo "Rust,$DIFF" >> results.csv
rm rust_divisor

cat results.csv
