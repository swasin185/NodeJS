local N = arg[1]
local MAX_PRECISION = N * 2
local MAX_DISPLAY = 45
local array_x = {}
local array_y = {}
for i=0, N-1 do
    array_x[i] = 1
    array_y[i] = i+1
end
local digits = {}
for i=0, MAX_PRECISION do
    digits[i] = 0
end
for i=1, N do
    local x = array_x[i - 1]
    local y = array_y[i - 1]
    io.write(string.format("[%5d][%4d/%4d]", i, x, y))
    local z = math.floor(x / y)
    x = (x % y) * 10
    local head = 0
    local tail = 0
    local repeats = 0
    local length = 0
    local search = 0
    while tail == 0 or (tail < MAX_PRECISION and x > 0 and (repeats < 10 or repeats < length)) do
        digits[tail] = math.floor(x / y)
        x = (x % y) * 10
        if tail > 0 then
            search = 0
            while (search < tail and digits[head] ~= digits[tail]) do
                search = search + 1
                head = head + 1
                head = head % tail
                repeats = 0   -- if miss just one point reset repeat to 0;
            end
            if (head < tail and digits[head] == digits[tail]) then
                length = tail - head
                repeats = repeats + 1
                if (repeats == 1) then -- if start count repeat, check left most position
                    while (repeats <= head and
                        digits[head - repeats] == digits[tail - repeats]) do
                        repeats = repeats + 1
                    end
                end
                head = head + 1
            else 
                repeats = 0
                length = 0
                head = 0
            end
        end
        tail = tail + 1
    end;

    io.write(string.format("[%4d]%4d.", repeats, z))
    if (repeats <= 1) then
        local j = 0
        while (j<tail and j<MAX_DISPLAY) do
            io.write(digits[j])
            j = j + 1
        end
    else 
        local j = 0
        while (j<head-repeats and j<MAX_DISPLAY) do
            io.write(digits[j])
            j = j + 1
        end
        io.write("|")
        j = head-repeats
        while (j<tail-repeats and j<MAX_DISPLAY) do
            io.write(digits[j]);
            j = j + 1
        end
        if (tail-repeats < MAX_DISPLAY) then
            io.write("|")
        else
            io.write("..")
        end
    end
    io.write("\n");
end

