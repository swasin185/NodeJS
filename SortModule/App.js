"use strict";
exports.__esModule = true;
var BubbleSort_js_1 = require("./BubbleSort.js");
var SelectSort_js_1 = require("./SelectSort.js");
// import {InsertSort} from './InsertSort.js'; 
// import {QuickSort} from './QuickSort.js';
console.log("xxxx");
(function () {
    var bubble = new BubbleSort_js_1.BubbleSort(100, "bubbleCanvas");
    var selection = new SelectSort_js_1.SelectSort(100, "selectCanvas");
    //var insertion = new InsertSort(100, "insertCanvas");
    //var quick = new QuickSort(100, "quickCanvas");
    var render = function () {
        console.log("render");
    };
})();
