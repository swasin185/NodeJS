import sys
import math
N = int(sys.argv[1])
MAX_PRECISION = N * 2
MAX_DISPLAY = 45
array_x = []
array_y = []
for i in range(N) :
    array_x.append(1)
    array_y.append(i + 1)
digits = []
for i in range(MAX_PRECISION) :
    digits.append(0)

for i in range(N) :
    x = array_x[i]
    y = array_y[i]
    print(f"[{i+1:4}][{x:4}/{y:<4}]", end="")
    z = math.floor(x / y)
    x = (x % y) * 10
    head = 0
    tail = 0
    repeat = 0
    length = 0
    while (tail == 0 or (tail < MAX_PRECISION and x > 0 and (repeat < 10 or repeat < length))) :
        digits[tail] = math.floor(x / y)
        x = (x % y) * 10
        if (tail > 0):
            search = 0
            while (search < tail and digits[head] != digits[tail]) :
                search +=  1
                head += 1
                head %= tail
                repeat = 0 # if miss just one point reset repeat to 0;
            if (head < tail and digits[head] == digits[tail]) :
                length = tail - head
                repeat += 1
                if (repeat == 1) : # if start count repeat, check left most position
                    while (repeat <= head and digits[head - repeat] == digits[tail - repeat]) :
                        repeat += 1
                head += 1
            else :
                repeat = 0
                length = 0
                head = 0
        tail += 1
    print(f"[{repeat:4}]\t{z:4}.", end = "")
    j = 0
    while (j < head - repeat and j < MAX_DISPLAY) :
        print(digits[j], end = "")
        j += 1
    print("|", end = "")
    j = head - repeat
    while (j < tail - repeat and j < MAX_DISPLAY) :
        print(digits[j], end = "")
        j += 1
    if (tail - repeat < MAX_DISPLAY) :
        print("|", end = "")
    else :
        print("..", end = "")
    print()
