public class Div {
    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        int n = 9999;
        if (args.length == 1)
            n = Integer.parseInt(args[0]);
        int dividend = 1;
        int divisor = n;
        
        for (divisor = 1; divisor <= n; divisor++) {
            System.out.println(dividend+"/"+divisor + "\t" +division(dividend, divisor));
        }
        System.out.println("ใช้เวลา " +
                (System.currentTimeMillis() - start) / 1000.0 + " วินาที");
    }
    public static String division(int dividend, int divisor) {
            int[] history = new int[divisor];
            //int quotient = dividend / divisor;
            int remainder = dividend % divisor;
            StringBuilder digits = new StringBuilder(".");
            int point = 0;
            while (remainder > 0) {
                for (int j=0; j < point; j++) {
                    if (history[j] == remainder) {
                        digits.insert(j+1, "|");
                        digits.append("|");
                        return digits.substring(0, (digits.length() > 50 ? 50 : digits.length()));
                    }
                }
                // รายการเศษเหลือ[เศษเหลือ] = ทศนิยม + 1;
                history[point] = remainder;
                remainder *= 10;
                digits.append(remainder / divisor);
                remainder = remainder % divisor;
                //ทศนิยมซ้ำ = รายการเศษเหลือ[เศษเหลือ] - 1;
                point++;
            }
            return digits.toString();
    }
}
