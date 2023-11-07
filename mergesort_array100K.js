// Генерируем массив из 100,000 случайных целых чисел в диапазоне от 1 до 100,000
let mylst = [];
for (let i = 0; i < 100000; i++) {
    mylst.push(Math.floor(Math.random() * 100000) + 1);
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    // Разделяем массив на две половины
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    // Рекурсивно сортируем обе половины
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    // Объединяем и сортируем две отсортированные половины
    return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;

    // Объединяем элементы из двух массивов в один отсортированный массив
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // Добавляем оставшиеся элементы, если они есть
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Измеряем время выполнения
let startTime = new Date().getTime();
let sortedArray = mergeSort(mylst);
let endTime = new Date().getTime();

// Выводим время выполнения и длину отсортированного массива
console.log(`Время выполнения mergeSort: ${(endTime - startTime) / 1000} секунд`);
console.log(`Отсортирован массив длиной ${sortedArray.length} элементов`);
console.log(sortedArray)