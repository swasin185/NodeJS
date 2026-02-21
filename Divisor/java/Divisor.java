public class Divisor {
    public static void main(String[] args) {
        if (args.length < 1) {
            return;
        }

        int n;
        try {
            n = Integer.parseInt(args[0]);
        } catch (NumberFormatException e) {
            return;
        }

        int maxPrecision = n * 2;
        int maxDisplay = 45;

        int[] arrayX = new int[n];
        int[] arrayY = new int[n];
        for (int i = 0; i < n; i++) {
            arrayX[i] = 1;
            arrayY[i] = i + 1;
        }

        int[] digits = new int[maxPrecision];

        for (int i = 1; i <= n; i++) {
            int x = arrayX[i - 1];
            int y = arrayY[i - 1];

            String col1 = String.format("[%d]", i);
            String col2 = String.format("[%d/%d]", x, y);

            // Right alignment: widths 7 and 10
            System.out.printf("%7s\t%10s", col1, col2);

            int z = x / y;
            x = (x % y) * 10;

            int head = 0;
            int tail = 0;
            int repeat = 0;
            int length = 0;

            while (tail == 0 || (tail < maxPrecision && x > 0 && (repeat < 10 || repeat < length))) {
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

            System.out.print("\t" + z + ".");

            if (repeat > 0) {
                for (int j = 0; j < head - repeat && j < maxDisplay; j++) {
                    System.out.print(digits[j]);
                }
                System.out.print("|");
                for (int j = head - repeat; j < tail - repeat && j < maxDisplay; j++) {
                    System.out.print(digits[j]);
                }
                if (tail - repeat < maxDisplay) {
                    System.out.print("|");
                } else {
                    System.out.print("..");
                }
            } else {
                for (int j = 0; j < tail && j < maxDisplay; j++) {
                    System.out.print(digits[j]);
                }
            }
            System.out.println();
        }
    }
}
