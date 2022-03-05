data=9999
cd c
#cc divisor.c -lm -O3
time ./a.out $data > output.txt
echo C
cd ..
#tsc Divisor.ts
time node Divisor.js $data > output.txt
echo NodeJS
cd java
#javac Divisor.java
time java Divisor $data > output.txt
echo JAVA
cd ../lua
time lua divisor.lua $data > output.txt
echo LUA
