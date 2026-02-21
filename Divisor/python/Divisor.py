import sys

def main():
    if len(sys.argv) < 2:
        return
    
    n = int(sys.argv[1])
    max_precision = n * 2
    max_display = 45
    
    array_x = [1] * n
    array_y = [i + 1 for i in range(n)]
    
    digits = [0] * max_precision
    
    for i in range(1, n + 1):
        x = array_x[i - 1]
        y = array_y[i - 1]
        
        col1 = ("[" + str(i) + "]").rjust(7)
        col2 = ("[" + str(x) + "/" + str(y) + "]").rjust(10)
        sys.stdout.write(col1 + "\t" + col2)
        
        z = x // y
        x = (x % y) * 10
        
        head = 0
        tail = 0
        repeat = 0
        length = 0
        
        while tail == 0 or (tail < max_precision and x > 0 and (repeat < 10 or repeat < length)):
            digits[tail] = x // y
            x = (x % y) * 10
            
            if tail > 0:
                search = 0
                while search < tail and digits[head] != digits[tail]:
                    search += 1
                    head += 1
                    head %= tail
                    repeat = 0
                
                if head < tail and digits[head] == digits[tail]:
                    length = tail - head
                    repeat += 1
                    if repeat == 1:
                        while repeat <= head and digits[head - repeat] == digits[tail - repeat]:
                            repeat += 1
                    head += 1
                else:
                    repeat = 0
                    length = 0
                    head = 0
            tail += 1
            
        sys.stdout.write("\t" + str(z) + ".")
        
        if repeat > 0:
            for j in range(head - repeat):
                if j >= max_display: break
                sys.stdout.write(str(digits[j]))
            
            sys.stdout.write("|")
            
            for j in range(head - repeat, tail - repeat):
                if j >= max_display: break
                sys.stdout.write(str(digits[j]))
            
            if tail - repeat < max_display:
                sys.stdout.write("|")
            else:
                sys.stdout.write("..")
        else:
            for j in range(tail):
                if j >= max_display: break
                sys.stdout.write(str(digits[j]))
                
        sys.stdout.write("\n")

if __name__ == "__main__":
    main()
