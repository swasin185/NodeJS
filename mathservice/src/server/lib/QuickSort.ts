export default class QuickSort {
  private callCount = 0
  private swapCount = 0
  private compareCount = 0
  private data: number[];
  private temp: number;
  public print () {
      console.log('-------------------- SORT --------------------')
      console.log('call =', this.callCount, ' compare =', this.compareCount, 'swap=', this.swapCount)
      console.log(this.data)
  }

  constructor (n: number) {
      this.data = new Array(n)
      for (let i = 0; i < n; i++) {
          this.data[i] = Math.floor(Math.random() * 2 * n) + 1
      }
      console.log(this.data)
  }

  private swapData (l: number, h: number) {
      this.swapCount++
      this.temp = this.data[l]
      this.data[l] = this.data[h]
      this.data[h] = this.temp
  }

  public quickSort (lo: number, hi: number) {
      this.callCount++
      let pivot = Math.floor((lo + hi) / 2)
      let l = lo
      let h = hi
      while (l < h) {
          while (this.data[h] > this.data[pivot]) { // h ไม่น้อยกว่า pivot แน่
              this.compareCount++
              h--
          }
          while (l < h && this.data[l] <= this.data[pivot]) { // l อาจจะ == h ได้
              this.compareCount++
              l++
          }
          if (l < h) {
              this.swapData(l, h)
              if (h === pivot) pivot = l // pivot น้อยกว่า mean
          }
      }
      if (pivot < h) { // pivot มากกว่า mean
          if (this.data[pivot] !== this.data[h]) {
              this.compareCount++
              this.swapData(h, pivot)
          }
          pivot = h
      }
      if (lo < pivot - 1) this.quickSort(lo, pivot - 1)
      if (hi > pivot + 1) this.quickSort(pivot + 1, hi)
  }
}
const n = 100
const sort = new QuickSort(n)
sort.quickSort(0, n - 1)
sort.print()
