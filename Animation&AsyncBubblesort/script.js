// Ожидание загрузки контента страницы перед выполнением функции
const n = 100000;

document.addEventListener('DOMContentLoaded', async () => {
    // Вызов функции для анимации и сортировки
    animateAndSort();
});

// Функция для анимации движения квадрата squareThree вправо и влево
function animateSquareThree() {
    // Получение ссылок на элементы DOM
    const squareThree = document.querySelector('.squareThree');
    const rectangleThree = document.querySelector('.rectangleThree');
    
    // Получение ширины прямоугольника и квадрата
    const rectangleWidth = rectangleThree.offsetWidth;
    const squareWidth = squareThree.offsetWidth;

    // Функция для движения квадрата вправо
    function moveRight() {
        return new Promise((resolve) => {
            // Сброс предыдущей анимации и установка новой анимации вправо
            squareThree.style.transition = 'none';
            squareThree.style.transform = 'translateX(0)';
            setTimeout(() => {
                squareThree.style.transition = 'transform 2s ease-in-out';
                squareThree.style.transform = `translateX(${rectangleWidth - squareWidth}px)`;
            }, 0);

            // Ожидание завершения анимации вправо
            squareThree.addEventListener('transitionend', resolve, { once: true });
        });
    }

    // Функция для движения квадрата влево
    function moveLeft() {
        return new Promise((resolve) => {
            // Сброс предыдущей анимации и установка новой анимации влево
            squareThree.style.transition = 'none';
            squareThree.style.transform = `translateX(${rectangleWidth - squareWidth}px)`;
            setTimeout(() => {
                squareThree.style.transition = 'transform 2s ease-in-out';
                squareThree.style.transform = 'translateX(0)';
            }, 0);

            // Ожидание завершения анимации влево
            squareThree.addEventListener('transitionend', resolve, { once: true });
        });
    }

    // Функция для циклического вызова анимаций
    async function animateLoop() {
        // Бесконечный цикл анимации
        while (true) {
            // Анимация движения вправо
            await moveRight();
            
            // Анимация движения влево
            await moveLeft();
        }
    }

    // Запуск циклической анимации
    animateLoop();
}


// Функция для анимации движения квадрата squareFour вправо и влево с использованием Request Animation Frame
function animateSquareFour() {
    const squareFour = document.querySelector('.squareFour');
    const rectangleFour = document.querySelector('.rectangleFour');
    // Получение ширины прямоугольника (rectangleFour) и квадрата (squareFour)
    const rectangleWidth = rectangleFour.offsetWidth;
    const squareWidth = squareFour.offsetWidth;

    // Устанавливаем начальные значения
    let currentPosition = 0;
    let direction = 1; // Направление движения: 1 - вправо, -1 - влево

    // Функция анимации с использованием Request Animation Frame
    function animate() {
        // Перемещаем квадрат
        currentPosition += direction * 2; // Скорость движения (2px за кадр)
        squareFour.style.transform = `translateX(${currentPosition}px)`;

        // Проверяем достижение границы прямоугольника
        if (currentPosition + squareWidth > rectangleWidth || currentPosition < 0) {
            // Меняем направление при достижении границы
            direction *= -1;
        }

        // Продолжаем анимацию
        requestAnimationFrame(animate);
    }

    // Запускаем анимацию
    animate();
}

async function animateAndSort() {
    // Генерация неотсортированного массива из 100 элементов
    const unsortedArray = generateRandomArray(n);

    // Запуск анимаций для двух квадратов
    animateSquareThree();
    animateSquareFour();

    // Вывод неотсортированного массива в консоль
    const slicedArray = unsortedArray.slice(0, 51);
    console.log('Unsorted Array First 50:', slicedArray);

    // Засекаем время начала сортировки
    const startTime = new Date().getTime();

    try {
        // Асинхронная сортировка массива
        const sortedArray = await bubbleSortAsync([...unsortedArray]);

        // Засекаем время окончания сортировки
        const endTime = new Date().getTime();

        // Вывод отсортированного массива в консоль
        const newSlicedArray = sortedArray.slice(0, 51);
        console.log('Sorted Array First 50:', newSlicedArray);

        // Получаем элемент для вывода результатов сортировки
        const sortedArrayElement = document.getElementById('sortingSection');

        // Создаем элемент для отображения времени выполнения сортировки
        const timeTakenElement = document.createElement('p');
        timeTakenElement.textContent = `BubbleSort has taken: ${(endTime - startTime) / 1000} seconds to complete`;

        // Добавляем элемент в раздел для результатов сортировки
        sortedArrayElement.appendChild(timeTakenElement);

        // Создаем элемент для отображения количества элементов в отсортированном массиве
        const lengthElement = document.createElement('p');
        lengthElement.textContent = `Array of ${sortedArray.length} elements has been sorted`;

        // Добавляем элемент в раздел для результатов сортировки
        sortedArrayElement.appendChild(lengthElement);
    } catch (error) {
        console.error('Error during sorting:', error);
    }
}

// Функция для генерации случайного массива заданного размера
function generateRandomArray(size) {
    const randomArray = [];
    for (let i = 0; i < size; i++) {
        // Генерация случайного числа и добавление в массив
        randomArray.push(Math.floor(Math.random() * 100000) + 1);
    }
    return randomArray;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const bubbleSortAsync = async (arr) => {
    const startTime = new Date();

    for (let i = 0; i < arr.length - 1; i++) {
        if (i % 100 === 0) {
            await sleep(0);
            console.log("In sort");
        }
        for (let j = 0; j < arr.length - i - 1; j++){
            if (arr[j] > arr[j + 1]) {
                const tmp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = tmp;
            }
        }
    }

    const endTime = new Date();

    console.log(`Time elapsed: ${endTime - startTime} ms`);

    return arr;
};


