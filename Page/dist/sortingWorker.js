/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sortingWorker.ts":
/*!******************************!*\
  !*** ./src/sortingWorker.ts ***!
  \******************************/
/***/ (() => {

eval("\n// // sortingWorker.ts\n// onmessage = function (e) {\n//   const unsortedArray: number[] = Array.isArray(e.data) ? e.data : [];\n// // onmessage = function (e) {\n// //     const unsortedArray: number[] = e.data;\n//     // Создаем копию массива для избежания мутаций (создания изменяемой копии)\n//     let sortedArray = bubbleSort([...unsortedArray]);\n//     // Отправляем сообщение с неотсортированным и отсортированным массивами обратно в основной поток\n//     postMessage({ unsortedArray, sortedArray });\n//   };\n//   function bubbleSort(arr: number[]): number[] {\n//     const len = arr.length;\n//     // Внешний цикл - проходы по массиву\n//     for (let i = 0; i < len; i++) {\n//       // Внутренний цикл - сравнение и обмен элементов\n//       for (let j = 0; j < len - 1 - i; j++) {\n//         // Если текущий элемент больше следующего, меняем их местами\n//         if (arr[j] > arr[j + 1]) {\n//           [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n//         }\n//       }\n//     }\n//     // Возвращаем отсортированный массив\n//     return arr;\n//   }\n//   export {};\n// let hasReceivedMessage = false;\n// onmessage = function (e) {\n//   // Проверяем, получили ли мы сообщение ранее\n//   if (!hasReceivedMessage) {\n//     hasReceivedMessage = true;\n//     const unsortedArray: number[] = Array.isArray(e.data) ? e.data : [];\n//     // Создаем копию массива для избежания мутаций (создания изменяемой копии)\n//     let sortedArray = bubbleSort([...unsortedArray]);\n//     // Отправляем сообщение с неотсортированным и отсортированным массивами обратно в основной поток\n//     postMessage({ unsortedArray, sortedArray });\n//   }\n// };\n// function bubbleSort(arr: number[]): number[] {\n//   const len = arr.length;\n//   // Внешний цикл - проходы по массиву\n//   for (let i = 0; i < len; i++) {\n//     // Внутренний цикл - сравнение и обмен элементов\n//     for (let j = 0; j < len - 1 - i; j++) {\n//       // Если текущий элемент больше следующего, меняем их местами\n//       if (arr[j] > arr[j + 1]) {\n//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n//       }\n//     }\n//   }\n//   // Возвращаем отсортированный массив\n//   return arr;\n// }\n// sortingWorker.ts\n// let isSortingCompleted = false;\n// onmessage = function (e) {\n//   if (isSortingCompleted) {\n//     return;\n//   }\n//   isSortingCompleted = true;\n//   const unsortedArray: number[] = Array.isArray(e.data) ? e.data : [];\n//   let sortedArray = bubbleSort([...unsortedArray]);\n//   postMessage({ unsortedArray, sortedArray });\n// };\n// function bubbleSort(arr: number[]): number[] {\n//   const len = arr.length;\n//   for (let i = 0; i < len; i++) {\n//     for (let j = 0; j < len - 1 - i; j++) {\n//       if (arr[j] > arr[j + 1]) {\n//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n//       }\n//     }\n//   }\n//   return arr;\n// }\n// sortingWorker.ts\nonmessage = function once(e) {\n    onmessage = null; // Отключаем обработчик после первого вызова\n    const unsortedArray = Array.isArray(e.data) ? e.data : [];\n    let sortedArray = bubbleSort([...unsortedArray]);\n    postMessage({ unsortedArray, sortedArray });\n};\nfunction bubbleSort(arr) {\n    const len = arr.length;\n    for (let i = 0; i < len; i++) {\n        for (let j = 0; j < len - 1 - i; j++) {\n            if (arr[j] > arr[j + 1]) {\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n            }\n        }\n    }\n    return arr;\n}\n\n\n//# sourceURL=webpack://Task/./src/sortingWorker.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/sortingWorker.ts"]();
/******/ 	
/******/ })()
;