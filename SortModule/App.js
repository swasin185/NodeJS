import BubbleSort from "./BubbleSort.js";
import SelectSort from "./SelectSort.js";
import InsertSort from "./InsertSort.js";
import QuickSort from "./QuickSort.js";
globalThis.bubble = new BubbleSort(100, 'bubbleCanvas');
globalThis.selection = new SelectSort(100, 'selectCanvas');
globalThis.insertion = new InsertSort(100, 'insertCanvas');
globalThis.quick = new QuickSort(100, 'quickCanvas');
