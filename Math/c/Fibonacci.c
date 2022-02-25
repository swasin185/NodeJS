#include<stdio.h>
#include<math.h>
int main() {
    int a = 0;
    int b = 1;
    printf("%.30f\n", 0.1 + 0.2);
    for (int i=1; i<=34; i++) {
        b += a;
        a = b - a;
        printf("%d\t%d\t%d\t:\t%.30f\n", i, a, b, (double) b / a);
        printf("\t\t\t:\t%.20f\n", round(1E15 * (double) b / a)/1E15);
    }
    return 0;
}
