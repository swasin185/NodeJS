"use strict";

import { Sort } from './Sort.js'; // defult import 
import { BubbleSort } from './BubbleSort.js';
import { SelectSort } from './SelectSort.js';
// import {InsertSort} from './InsertSort.js'; 
// import {QuickSort} from './QuickSort.js';
console.log("xxxx");
(() => {
    var bubble = new BubbleSort(100, "bubbleCanvas");
    var selection = new SelectSort(100, "selectCanvas");
    //var insertion = new InsertSort(100, "insertCanvas");
    //var quick = new QuickSort(100, "quickCanvas");
    const render = () => {
        console.log("render")
    };
})();