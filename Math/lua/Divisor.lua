if #arg < 1 then
    return
end

local n = tonumber(arg[1])
if not n then
    return
end

local max_precision = n * 2
local max_display = 45

local array_x = {}
local array_y = {}
for i = 1, n do
    array_x[i] = 1
    array_y[i] = i
end

local digits = {}

for i = 1, n do
    local x = array_x[i]
    local y = array_y[i]

    local col1 = string.format("[%d]", i)
    local col2 = string.format("[%d/%d]", x, y)

    -- Right alignment: widths 7 and 10
    -- Lua padding: string.rep(" ", width - #s) .. s
    local p1 = string.rep(" ", 7 - #col1) .. col1
    local p2 = string.rep(" ", 10 - #col2) .. col2
    io.write(p1 .. "\t" .. p2)

    local z = math.floor(x / y)
    x = (x % y) * 10

    local head = 0
    local tail = 0
    local repeat_count = 0
    local length = 0

    while tail == 0 or (tail < max_precision and x > 0 and (repeat_count < 10 or repeat_count < length)) do
        digits[tail + 1] = math.floor(x / y)
        x = (x % y) * 10

        if tail > 0 then
            local search = 0
            while search < tail and digits[head + 1] ~= digits[tail + 1] do
                search = search + 1
                head = head + 1
                head = head % tail
                repeat_count = 0
            end

            if head < tail and digits[head + 1] == digits[tail + 1] then
                length = tail - head
                repeat_count = repeat_count + 1
                if repeat_count == 1 then
                    while repeat_count <= head and digits[head - repeat_count + 1] == digits[tail - repeat_count + 1] do
                        repeat_count = repeat_count + 1
                    end
                end
                head = head + 1
            else
                repeat_count = 0
                length = 0
                head = 0
            end
        end
        tail = tail + 1
    end

    io.write("\t" .. tostring(z) .. ".")

    if repeat_count > 0 then
        for j = 1, head - repeat_count do
            if j > max_display then break end
            io.write(tostring(digits[j]))
        end
        io.write("|")
        for j = head - repeat_count + 1, tail - repeat_count do
            if j > max_display then break end
            io.write(tostring(digits[j]))
        end
        if tail - repeat_count < max_display then
            io.write("|")
        else
            io.write("..")
        end
    else
        for j = 1, tail do
            if j > max_display then break end
            io.write(tostring(digits[j]))
        end
    end
    io.write("\n")
end
