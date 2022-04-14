class BS {
    static compare(a, b) {
        return a - b;
    }
    static main() {
        BS.checkMemory();
        try {
            if (process.argv[2] != undefined) {
                BS.n = Number(process.argv[2]);
                BS.min = BS.n;
                BS.max = BS.n * 10;
            }
        }
        catch (e) {
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
    static checkMemory() {
        try {
            let mem = process.memoryUsage();
            console.info("Stack =", (mem.rss / BS.mega).toFixed(2) + "Mb", "Heap =", (mem.heapUsed / BS.mega).toFixed(2) + "Mb\t", "Stack ^", ((mem.rss - BS.lastStack) / BS.mega).toFixed(2) + "Mb", "Heap ^", ((mem.heapUsed - BS.lastHeap) / BS.mega).toFixed(2) + "Mb");
            BS.lastStack = mem.rss;
            BS.lastHeap = mem.heapUsed;
        }
        catch (e) {
            console.log(window.performance["memory"]);
        }
    }
    static createRandomArray() {
        let array = [];
        while (array.length < BS.n) {
            let rand = 0;
            let found = -1;
            do {
                rand = Math.round(Math.random() * (BS.max - BS.min)) + BS.min;
                found = BS.findIndex(array, rand);
            } while (rand == array[found]);
            if (rand > array[found])
                array.splice(found + 1, 0, rand);
            else
                array.splice(found, 0, rand);
            //array.sort(BS.compare);
        }
        return array;
    }
    static createRandomMap() {
        let array = new Map();
        while (array.size < BS.n) {
            let rand = 0;
            do
                rand = Math.round(Math.random() * (BS.n * 9)) + BS.n;
            while (array.get(rand) != undefined);
            array.set(rand, 1);
        }
        return array;
    }
    static combineArray(array1, array2) {
        // let array3: number[] = Array.from(array1);
        // for (let x of array2)
        //     if (BS.findArray(array1, x) == -1)
        //         array3.push(x);
        // array3.sort(BS.compare);
        let array3 = new Array(0);
        let i = 0;
        let j = 0;
        while (i < array1.length && j < array2.length) {
            if (array1[i] == array2[j]) {
                array3.push(array1[i++]);
                j++;
            }
            else if (array1[i] < array2[j]) {
                array3.push(array1[i++]);
            }
            else {
                array3.push(array2[j++]);
            }
        }
        while (i < array1.length)
            array3.push(array1[i++]);
        while (j < array2.length)
            array3.push(array2[j++]);
        return array3;
    }
    static findIndex(array, key) {
        let min = 0;
        let max = array.length - 1;
        let i = -1;
        while (max >= min) {
            i = Math.floor((max + min) / 2);
            if (key == array[i]) {
                return i;
            }
            else if (key < array[i]) {
                max = i - 1;
            }
            else {
                min = i + 1;
            }
        }
        return i;
    }
    static findArray(array, key) {
        let i = BS.findIndex(array, key);
        // for (let i = 0; i < array.length; i++)
        //     if (array[i] == key)
        //         return i;
        if (array[i] == key)
            return i;
        else
            return -1;
    }
    static countDuplicate(array1, array2) {
        let count = 0;
        for (let x of array1) {
            if (array2[BS.findIndex(array2, x)] == x)
                count++;
        }
        return count;
    }
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
            passed = array[i - 1] < array[i];
            if (!passed) {
                console.error("sorted fail!", array[i - 1], array[i]);
                return;
            }
        }
        console.info(id, "Test Passed");
    }
}
BS.n = 100000;
BS.min = BS.n;
BS.max = BS.n * 10;
BS.mega = 1046576; // = 2 power 20 = 1024 * 1024
BS.lastStack = 0;
BS.lastHeap = 0;
BS.main();
