#include <stdio.h>
#include <stdlib.h>
#include <time.h>
void main() {
    clock_t etime = clock();
    int n = 9999;
    int dividend = 1;
    int digits[50];    
    for (int divisor = 1; divisor <= n; divisor++) {
        int quotient = dividend / divisor;
        int remainder = dividend % divisor;
        printf("[%3d/%-3d]\t %d.", dividend, divisor, quotient);
        int p = 0;
        while (remainder != 0 && p < 50 || p == 0) {
            remainder *= 10;
            digits[p] = remainder / divisor;
            remainder = remainder % divisor;
            printf("%d", digits[p]);
            p++;
        }
        printf("\n");
    }
    etime = clock() - etime;
    printf("elapse time = %f sec\n", (double)etime / CLOCKS_PER_SEC);
} 