let arr = new Array(10);
for (let i = 0; i < arr.length; i++)
    arr[i] = Math.round(Math.random() * arr.length);
console.log(arr.join());
let high = arr.length - 1;
let low = 0;
let pivot = Math.round((high + low) / 2);
let temp = 0;
while (low < high) {
    while (arr[pivot] < arr[high])
        high--;
    while (arr[pivot] >= arr[low])
        low++;
    console.log(low, high, arr.slice(0, pivot).join(), '|', arr[pivot], '|', arr.slice(pivot + 1, arr.length).join());
    if (low < high) {
        if (high == pivot)
            pivot = low;
        temp = arr[low];
        arr[low] = arr[high];
        arr[high] = temp;
    }
}
