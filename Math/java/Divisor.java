public class Divisor {
    private static int N = 49999;
    private static int MAX_PRECISION = N * 2;
    private static int MAX_DISPLAY = 45;

    public static void main(String[] args) {
        int[] array_x = new int[N];
        int[] array_y = new int[N];
        for (int i = 0; i < N; i++) {
            array_x[i] = 1;
            array_y[i] = i + 1;
        }
        char[] digits = new char[MAX_PRECISION];
        for (int i = 1; i <= N; i++) {
            int x = array_x[i - 1];
            int y = array_y[i - 1];
            System.out.print(String.format("[%5d][%4d/%4d]", i, x, y));
            int z = x / y;
            x = (x % y) * 10;
            int head = 0;
            int tail = 0;
            int repeat = 0;
            int length = 0;
            while (tail == 0 || (tail < MAX_PRECISION && x > 0 &&
                    (repeat < 10 || repeat < length))) {
                digits[tail] = (char) ('0' + (x / y));
                x = (x % y) * 10;
                if (tail > 0) {
                    int search = 0;
                    while (search < tail && digits[head] != digits[tail]) {
                        search++;
                        head++;
                        head %= tail;
                        repeat = 0; // if miss just one point reset repeat to 0;
                    }
                    if (head < tail && digits[head] == digits[tail]) {
                        length = tail - head;
                        repeat++;
                        if (repeat == 1) // if start count repeat, check left most position
                            while (repeat <= head &&
                                    digits[head - repeat] == digits[tail - repeat])
                                repeat++;
                        head++;
                    } else {
                        repeat = 0;
                        length = 0;
                        head = 0;
                    }
                }
                tail++;
            }
            System.out.print(String.format("[%4d]%4d.", repeat, z));
            if (repeat <= 1) {
                for (int j = 0; j < tail && j < MAX_DISPLAY; j++)
                    System.out.print(String.format("%c", digits[j]));
            } else {
                for (int j = 0; j < head - repeat && j < MAX_DISPLAY; j++)
                    System.out.print(String.format("%c", digits[j]));
                System.out.print("|");
                for (int j = head - repeat; j < tail - repeat && j < MAX_DISPLAY; j++)
                    System.out.print(String.format("%c", digits[j]));
                if (tail - repeat < MAX_DISPLAY)
                    System.out.print("|");
                else
                    System.out.print("..");
            }
            System.out.println();
        }
    }
}