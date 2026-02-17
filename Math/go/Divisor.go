package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	if len(os.Args) < 2 {
		return
	}

	n, err := strconv.Atoi(os.Args[1])
	if err != nil {
		return
	}

	maxPrecision := n * 2
	maxDisplay := 45

	arrayX := make([]int, n)
	arrayY := make([]int, n)
	for i := 0; i < n; i++ {
		arrayX[i] = 1
		arrayY[i] = i + 1
	}

	digits := make([]int, maxPrecision)

	for i := 1; i <= n; i++ {
		x := arrayX[i-1]
		y := arrayY[i-1]

		col1 := fmt.Sprintf("[%d]", i)
		col2 := fmt.Sprintf("[%d/%d]", x, y)

		// Right alignment: Pad to 7 and 10 spaces
		fmt.Printf("%7s\t%10s", col1, col2)

		z := x / y
		x = (x % y) * 10

		head := 0
		tail := 0
		repeat := 0
		length := 0

		for tail == 0 || (tail < maxPrecision && x > 0 && (repeat < 10 || repeat < length)) {
			digits[tail] = x / y
			x = (x % y) * 10

			if tail > 0 {
				search := 0
				for search < tail && digits[head] != digits[tail] {
					search++
					head++
					head %= tail
					repeat = 0
				}

				if head < tail && digits[head] == digits[tail] {
					length = tail - head
					repeat++
					if repeat == 1 {
						for repeat <= head && digits[head-repeat] == digits[tail-repeat] {
							repeat++
						}
					}
					head++
				} else {
					repeat = 0
					length = 0
					head = 0
				}
			}
			tail++
		}

		fmt.Printf("\t%d.", z)

		if repeat > 0 {
			for j := 0; j < head-repeat && j < maxDisplay; j++ {
				fmt.Print(digits[j])
			}
			fmt.Print("|")
			for j := head - repeat; j < tail-repeat && j < maxDisplay; j++ {
				fmt.Print(digits[j])
			}
			if tail-repeat < maxDisplay {
				fmt.Print("|")
			} else {
				fmt.Print("..")
			}
		} else {
			for j := 0; j < tail && j < maxDisplay; j++ {
				fmt.Print(digits[j])
			}
		}
		fmt.Println()
	}
}
