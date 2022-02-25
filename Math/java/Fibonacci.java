public class Fibonacci {
	public static void main(String[] args) {
		int a = 0;
		int b = 1;
		System.out.printf("%.30f\n", 0.1 + 0.2);
		for (int i=1; i<=34; i++) { 
		    b += a;
  		    a = b - a;
  	  	    System.out.printf("%d\t%d\t\t%d\t\t:\t%.20f\n", i, a, b, (double) b / a);
		    System.out.printf("\t\t\t\t\t\t%.20f\n", Math.round(1E15 * (double)b / a) / 1E15);     
		} 
	}
}