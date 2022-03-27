import java.util.HashMap;

public class Div {
    private static Integer startRepeat = 0;

    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        int n = 9999;
        if (args.length == 1)
            n = Integer.parseInt(args[0]);
        int dividend = 1;
        int divisor = n;
        double avg = 0;
        double avgLen = 0;
        int max = 0;
        int maxLen = 0;
        int maxDivisor = 0;
        int maxDivisorLen = 0;
        for (divisor = 1; divisor <= n; divisor++) {
            String output = division(dividend, divisor);
            avg += startRepeat;
            if (startRepeat > max) {
                max = startRepeat;
                maxDivisor = divisor;
            }
            avgLen += output.length()-1;
            if (output.length()-1 > maxLen) {
                maxLen = output.length()-1;
                maxDivisorLen = divisor;
            }
            System.out.println(dividend+"/"+divisor + "\t" +startRepeat + "\t" + (output.length()-1) + "\t"+
                output.substring(0, (output.length() > 40 ? 40 : output.length())));
        }
        avg /= n;
        avgLen /= n;
        System.out.println(" maxFound=" + max + " divisor="+maxDivisor + "\tavgFound=" + avg);
        System.out.println(" maxLen=" + maxLen + " divisor="+maxDivisorLen + "\tavgLen=" + avgLen);
        System.out.println("ใช้เวลา " +
                (System.currentTimeMillis() - start) / 1000.0 + " วินาที");
    }
    public static String division(int dividend, int divisor) {
            HashMap<Integer, Integer> history = new HashMap<Integer, Integer>();
            int remainder = dividend % divisor;
            StringBuilder digits = new StringBuilder(".");
            int point = 0;
            startRepeat = null;
            while (remainder > 0) {
                startRepeat = history.get(remainder);
                if (startRepeat != null)
                   return digits.toString();
                if (point < 20)
                    history.put(remainder, point);
                remainder *= 10;
                digits.append(remainder / divisor);
                remainder = remainder % divisor;
                point++;
            }
            startRepeat = 0;
            return digits.toString();
    }
}
