export default class QuickSort {
    private data : number[]
    private temp : number
    constructoer (n : number) {

    }
    private swapData(l:number, h:number) {
        this.temp = this.data[l]
        this.data[l] = this.data[h]
        this.data[h] = this.temp
    }
    private quickSort(lo: number, hi: number) {
        if (lo < hi) {
            let pivot = Math.floor((lo + hi) / 2);
            let l = lo;
            let h = hi;
            let x = -1;
            while (l < h) {
                while (l < h && this.data[h] > this.data[pivot])  h--
                while (l < h && this.data[l] <= this.data[pivot])  l++
                if (l < h) {
                    if (h == pivot)
                        pivot = l;
                    this.swapData(l, h);
                }
            }
            if (pivot < h) {
                this.swapData(h, pivot);
                pivot = h;
            }
            this.quickSort(lo, pivot - 1);
             this.quickSort(pivot + 1, hi);
        }
    }

}