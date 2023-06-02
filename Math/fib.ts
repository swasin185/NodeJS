let x: number = 0
let y: number = 1
while (y < 1E4) {
  y += x
  x = -x
  x += y
}
console.log(y / x)
