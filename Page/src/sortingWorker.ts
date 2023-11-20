
onmessage = function once(e) {
  onmessage = null; // Отключаем обработчик после первого вызова

  const unsortedArray: number[] = Array.isArray(e.data) ? e.data : [];
  let sortedArray = bubbleSort([...unsortedArray]);

  postMessage({ unsortedArray, sortedArray });
};

function bubbleSort(arr: number[]): number[] {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}

