#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define N 49999
#define MAX_PRECISION N * 2
#define MAX_DISPLAY 45
void main()
{
    //    clock_t etime = clock();
    int array_x[N];
    int array_y[N];
    //    srand(time(0));
    for (int i = 0; i < N; i++)
    {
        //        array_x[i] = rand() % 9999 + 1;
        //        array_y[i] = rand() % 9999 + 1;
        array_x[i] = 1;
        array_y[i] = i + 1;
    }
    char digits[MAX_PRECISION];
    for (int i = 1; i <= N; i++)
    {
        int x = array_x[i - 1];
        int y = array_y[i - 1];
        printf("[%5d][%4d/%4d]", i, x, y);
        int z = x / y;
        x = (x % y) * 10;
        int head = 0;
        int tail = 0;
        int repeat = 0;
        int length = 0;
        while (tail == 0 || (tail < MAX_PRECISION && x > 0 &&
               (repeat < 10 || repeat < length)))
        {
            digits[tail] = '0' + (x / y);
            x = (x % y) * 10;
            if (tail > 0)
            {
                int search = 0;
                while (search < tail && digits[head] != digits[tail])
                {
                    search++;
                    head++;
                    head %= tail;
                    repeat = 0; // if miss just one point reset repeat to 0;
                }
                if (head < tail && digits[head] == digits[tail])
                {
                    length = tail - head;
                    repeat++;
                    if (repeat == 1) // if start count repeat, check left most position
                        while (repeat <= head &&
                               digits[head - repeat] == digits[tail - repeat])
                            repeat++;
                    head++;
                }
                else
                {
                    repeat = 0;
                    length = 0;
                    head = 0;
                }
            }
            tail++;
        }

        printf("[%4d]%4d.", repeat, z);
        if (repeat <= 1)
        {
            for (int j = 0; j < tail && j < MAX_DISPLAY; j++)
                printf("%c", digits[j]);
        }
        else
        {
            for (int j = 0; j < head - repeat && j < MAX_DISPLAY; j++)
                printf("%c", digits[j]);
            printf("|");
            for (int j = head - repeat; j < tail - repeat && j < MAX_DISPLAY; j++)
                printf("%c", digits[j]);
            if (tail - repeat < MAX_DISPLAY)
                printf("|");
            else
                printf("..");
            // for (int j=tail-repeat; j<tail && j<MAX_DISPLAY; j++)
            //     printf("%c", digits[j]);
        }
        printf("\n");
    }
    //    etime = clock() - etime;
    //    printf("elapse time = %f sec\n", (double)etime / CLOCKS_PER_SEC);
}
