#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        return 0;
    }

    int n = atoi(argv[1]);
    if (n <= 0) {
        return 0;
    }

    int max_precision = n * 2;
    int max_display = 45;

    int *array_x = malloc(n * sizeof(int));
    int *array_y = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        array_x[i] = 1;
        array_y[i] = i + 1;
    }

    int *digits = malloc(max_precision * sizeof(int));

    for (int i = 1; i <= n; i++) {
        int x = array_x[i - 1];
        int y = array_y[i - 1];

        char col1[20], col2[40];
        sprintf(col1, "[%d]", i);
        sprintf(col2, "[%d/%d]", x, y);

        // Right alignment: widths 7 and 10
        printf("%7s\t%10s", col1, col2);

        int z = x / y;
        x = (x % y) * 10;

        int head = 0;
        int tail = 0;
        int repeat = 0;
        int length = 0;

        while (tail == 0 || (tail < max_precision && x > 0 && (repeat < 10 || repeat < length))) {
            digits[tail] = x / y;
            x = (x % y) * 10;

            if (tail > 0) {
                int search = 0;
                while (search < tail && digits[head] != digits[tail]) {
                    search++;
                    head++;
                    head %= tail;
                    repeat = 0;
                }

                if (head < tail && digits[head] == digits[tail]) {
                    length = tail - head;
                    repeat++;
                    if (repeat == 1) {
                        while (repeat <= head && digits[head - repeat] == digits[tail - repeat]) {
                            repeat++;
                        }
                    }
                    head++;
                } else {
                    repeat = 0;
                    length = 0;
                    head = 0;
                }
            }
            tail++;
        }

        printf("\t%d.", z);

        if (repeat > 0) {
            for (int j = 0; j < head - repeat && j < max_display; j++) {
                printf("%d", digits[j]);
            }
            printf("|");
            for (int j = head - repeat; j < tail - repeat && j < max_display; j++) {
                printf("%d", digits[j]);
            }
            if (tail - repeat < max_display) {
                printf("|");
            } else {
                printf("..");
            }
        } else {
            for (int j = 0; j < tail && j < max_display; j++) {
                printf("%d", digits[j]);
            }
        }
        printf("\n");
    }

    free(array_x);
    free(array_y);
    free(digits);

    return 0;
}
