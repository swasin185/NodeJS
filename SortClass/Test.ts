let arr: number[] = new Array(10);
for (let i = 0; i < arr.length; i++)
    arr[i] = Math.round(Math.random() * arr.length);
console.log(arr.join());


let high = arr.length - 1;
let low = 0;
let pivot = Math.round((high + low) / 2);
let temp = 0;
while (arr[pivot] < arr[high])
    high--;
while (low < high && arr[pivot] >= arr[low])
    low++;
while (low < high) {
    console.log(low, high, arr.slice(0, pivot).join(), '|', arr[pivot], '|', arr.slice(pivot + 1, arr.length).join());
    if (high == pivot) pivot = low;
    temp = arr[low];
    arr[low] = arr[high];
    arr[high] = temp;
    while (arr[pivot] < arr[high])
        high--;
    while (low < high && arr[pivot] >= arr[low])
        low++;
}
