class BS {
    // ขนาดของอาเรย์เริ่มต้น
    static n = 100;
    // ค่าข้อมูลต่ำสุดในอาเรย์
    static min = BS.n;
    // ค่าข้อมูลสูงสุดในอาเรย์
    static max = BS.n * 10;

    /* TODO
     * สร้างอาเรย์ขนาด n ช่อง ที่สุ่มค่าจำนวนเต็ม ตั้งแต่ min ถึง max 
     * โดยข้อมูลทุกช่องในอาเรย์ไม่ซ้ำกัน 
     * ใช้ฟังก์ชั่น findIndex() เช็คว่ามีข้อมูลในอาเรย์หรือไม่
     */
    static createRandomArray() {
        let a = [];
        let rand = 0;
        while (a.length < BS.n) {
            let found = 0;
            do {
                rand = Math.floor(Math.random() * (BS.max - BS.min)) + BS.min;
                found = this.findIndex(a, rand);
            } while (a[found] == rand);
            a.splice(found, 0, rand);
            // for (let i = a.length; i > found; i--)
            //     a[i] = a[i - 1];
            // a[found] = rand;
        }
        a.sort();
        return a;
    }

    /* TODO
     * สร้างอาเรย์ผลลัพธ์โดยมีข้อมูลจาก array1 และ array2
     * โดยที่ข้อมูลในอาเรย์ผลลัพธ์นี้ ไม่ซ้ำกัน
     * ใช้ฟังก์ชั่น findIndex() เช็คว่ามีข้อมูลในอาเรย์หรือไม่
     */
    static combineArray(array1, array2) {
        let array3 = Array.from(array2);
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] != array2[BS.findIndex(array2, array1[i])])
                array3.push(array1[i]);
        }
        array3.sort();
        return array3;
    }

    /* TODO
     * หาตำแหน่ง index อาเรย์ที่เก็บข้อมูลค่าเท่ากับ key
     * ถ้าหากไม่พบให้ส่งค่ากลับเป็นตำแหน่งล่าสุดที่ค้นหา
     * ผลลัพธ์จะมีค่าตั้งแต่ 0 ถึง length-1
     * ดูตัวอย่างการใช้ใน countDupplicate()
     */
    static findIndex(array, key) {
        let i = 0;
        while (i < array.length && array[i] < key)
            i++;
        return i;
    }

    /* 
     * โปรแกรมหลัก สร้างอาเรย์ 2 อาเรย์ A, B แล้วนำมารวมกัน เป็นอาเรย์ C
     * มีการตรวจจับเวลาและ ตรวจสอบขนาดหน่วยความจำในการทำงาน
     * มีการตรวจคำตอบให้ได้ตามเงื่อนไขที่กำหนด
     */
    static main() {
        BS.checkMemory();
        if (process.argv[2] != undefined) {
            BS.n = Number(process.argv[2]);
            BS.min = BS.n;
            BS.max = BS.n * 10;
        }
        console.time("Array A");
        let arrayA = BS.createRandomArray();
        console.timeEnd("Array A");
        console.time("Array B");
        var arrayB = BS.createRandomArray();
        console.timeEnd("Array B");
        console.time("Array C");
        let arrayC = BS.combineArray(arrayA, arrayB);
        console.timeEnd("Array C");
        BS.checkMemory();

        console.time("Test");
        BS.test(BS.n, arrayA, "A");
        BS.test(BS.n, arrayB, "B");
        let x = BS.countDuplicate(arrayA, arrayB);
        BS.test(BS.n * 2 - x, arrayC, "C");
        console.timeEnd("Test");
        BS.checkMemory();
    }

    // 1 Mega = 2 power 20
    static mega = 1048576; // = 2 power 20 = 1024 * 1024
    // previous Stack memory
    static lastStack = 0;
    // previous Heap memory
    static lastHeap = 0;
    /*
     * แสดงขนาดหน่วยความจำที่ใช้งานเมื่อรันโปรแกรม
     */
    static checkMemory() {
        let mem = process.memoryUsage();
        console.info("Stack =", (mem.rss / BS.mega).toFixed(2) + "Mb",
            "Heap =", (mem.heapUsed / BS.mega).toFixed(2) + "Mb\t",
            "Stack ^", ((mem.rss - BS.lastStack) / BS.mega).toFixed(2) + "Mb",
            "Heap ^", ((mem.heapUsed - BS.lastHeap) / BS.mega).toFixed(2) + "Mb");
        BS.lastStack = mem.rss;
        BS.lastHeap = mem.heapUsed;
    }

    /*
     * นับจำนวน ข้อมูลที่ซ้ำกันระหว่างอาเรย์ array1, array2
     */
    static countDuplicate(array1, array2) {
        let count = 0;
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] == array2[BS.findIndex(array2, array1[i])])
                count++;
        }
        return count;
    }

    /*
     * ตรวจคำตอบให้อาเรย์เป็นไปตามเงื่อนไข
     * ขนาดของอาเรย์ต้องเท่ากับขนาดที่ระบุ
     * ข้อมูลในอาเรย์มีค่าในช่วง min ถึง max
     * ข้อมูลในอาเรย์ไม่ซ้ำกัน
     */
    static test(n, array, id) {
        if (n < 100)
            console.log(array);
        console.log("size =", array.length);
        let passed = array.length == n && n > 0;
        if (!passed) {
            console.error("test size fail!", array.length, n);
            return;
        }
        passed = array[0] >= BS.min && array[0] <= BS.max;
        if (!passed) {
            console.error("value fail! ", array[0], BS.min, BS.max);
            return;
        }
        for (let i = 1; i < array.length && passed; i++) {
            passed = array[i] >= BS.min && array[i] <= BS.max;
            if (!passed) {
                console.error("value fail! ", array[i], BS.min, BS.max);
                return;
            }
            passed = i == BS.findIndex(array, array[i]);
            if (!passed) {
                console.error("dupplicate fail!", array[i - 1], array[i]);
                return;
            }
        }
        console.info(id, "Test Passed");
    }
}

BS.main();
