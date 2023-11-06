// Генерируем массив из 100,000 случайных целых чисел в диапазоне от 1 до 100,000
let mylst = [];
for (let i = 0; i < 100000; i++) {
    mylst.push(Math.floor(Math.random() * 100000) + 1);
}

// Функция для сортировки быстрым методом (QuickSort)
function quickSort(arr) {
    const n = arr.length;
    if (n <= 1) {
        return arr;
    }
    
    const pivot = arr[Math.floor(n / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return quickSort(left).concat(middle, quickSort(right));
}

// Измеряем время выполнения
const startTime = new Date().getTime();
const sortedArray = quickSort([...mylst]); // Сортируем и сохраняем отсортированный массив
const endTime = new Date().getTime();

console.log("Время выполнения: " + (endTime - startTime) + " миллисекунд");
console.log("Отсортирован список длиной " + (mylst.length) + " элементов")
