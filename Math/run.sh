cd c
cc divisor.c -lm
time ./a.out > output.txt
cd ..
tsc Divisor.ts
time node Divisor.js > output.txt
cd java
javac Divisor.java
time java Divisor > output.txt
