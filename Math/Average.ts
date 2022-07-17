class Average {
    static avg(data: number[]): number {
        let sum = 0;
        for (let i = 0; i < data.length; i++)
            sum += data[i];
        return Math.round(sum / data.length * 1E6) / 1E6;
    }

    static incAvg(data: number[]): number {
        let avg = 0;
        for (let i = 0; i < data.length; i++) {
            avg = avg * (i / (i + 1)) + data[i] / (i + 1)
            avg = Math.round(avg * 1E6) / 1E6;
        }
        return avg;
    }
    static {
        console.log("Incremental Average Sum");
        let n = 9999;
        let dataList: number[] = new Array(n);
        for (let i = 0; i < dataList.length; i++) {
            dataList[i] = Math.random() * n;
        }

        console.log("avg    = ", Average.avg(dataList));
        console.log("IncAvg = ", Average.incAvg(dataList));
    }
}