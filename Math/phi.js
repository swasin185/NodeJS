x = 0
y = 1
while (y < 9999) {
    y += x
    x = y - x
}
console.log("phi =", y / x)
