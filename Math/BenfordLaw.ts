class BenfordLaw {
  static {
    console.log("Benford's Law");
    let n = 9999;
    let dataList: number[] = new Array(n);
    for (let i = 0; i < dataList.length; i++) {
      dataList[i] = Math.random() * n;
    }

    let benfordTable: number[] = new Array(10);
    benfordTable.fill(0);
    for (let data of dataList) {
      benfordTable[data.toString().charAt(0)]++;
    }
    for (let i = 0; i < benfordTable.length; i++) {
      console.log(i, (benfordTable[i] / n) * 100);
    }
  }
}
