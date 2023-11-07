// Генерируем массив из 100,000 случайных целых чисел в диапазоне от 1 до 100,000
let mylst = [];
for (let i = 0; i < 100000; i++) {
    mylst.push(Math.floor(Math.random() * 100000) + 1);
}

// Функция для сортировки быстрым методом (QuickSort)
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];

    const left = [];
    const right = [];
    const middle = [pivot];

    for (let i = 0; i < arr.length; i++) {
        if (i === pivotIndex) continue; // Пропустить опорный элемент
        (arr[i] < pivot ? left : right).push(arr[i]);
    }

    return [...quickSort(left), ...middle, ...quickSort(right)];
}


// Измеряем время выполнения
const startTime = new Date().getTime();
const sortedArray = quickSort([...mylst]); // Сортируем и сохраняем отсортированный массив
const endTime = new Date().getTime();

console.log("Время выполнения quickSort: " + ((endTime - startTime) / 1000) + " секунд");
console.log("Отсортирован список длиной " + (mylst.length) + " элементов")
console.log(sortedArray)
