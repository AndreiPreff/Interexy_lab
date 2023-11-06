// Генерируем массив из 100,000 случайных целых чисел в диапазоне от 1 до 100,000
let mylst = [];
for (let i = 0; i < 100000; i++) {
    mylst.push(Math.floor(Math.random() * 100000) + 1);
}

// Функция для сортировки пузырьком
function bubbleSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]] 
                }
        }
    }

    return arr; // Возвращаем отсортированный массив
}

// Измеряем время выполнения
const startTime = new Date().getTime();
const sortedArray = bubbleSort([...mylst]); // Сортируем и сохраняем отсортированный массив
const endTime = new Date().getTime();

// Выводим несколько начальных и конечных элементов отсортированного массива
console.log(`Время выполнения bubbleSort: ${(endTime - startTime) / 1000} секунд`);
console.log(`Отсортирован массив длиной ${sortedArray.length} элементов`);