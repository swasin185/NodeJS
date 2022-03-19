
local start = os.clock()
local n = 9999
local dividend = 1
local digits = {}

for divisor=1, n do
    local quotient = math.floor(dividend / divisor)
    local remainder = dividend % divisor
    io.write(string.format("[%3d/%-3d]\t %d.", dividend, divisor, quotient))
    local p = 0
    while remainder > 0 and p < 50 or p == 0 do
        remainder = remainder * 10
        digits[p] = math.floor(remainder / divisor)
        remainder = remainder % divisor
        io.write(digits[p])
        p = p + 1;
    end
    io.write("\n")
end
print((os.clock() - start))