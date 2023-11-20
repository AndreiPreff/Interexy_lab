// script.ts

import './styles.css'
import { getRickAndMortyCharacters } from './RickAndMorty'

let isInitialized = false;

window.onload = async () => {
    console.log('Window loaded.');
    
    if (!isInitialized) {
        animateAndSort();
        isInitialized = true;
    }
};



// Функция для анимации движения квадрата вправо и влево
function animateSquareThree() {
    // Получение ссылок на элементы DOM
    const squareThree = document.querySelector('.squareThree') as HTMLElement;
    const rectangleThree = document.querySelector('.rectangleThree') as HTMLElement;

    // Получение ширины прямоугольника и квадрата
    const rectangleWidth = rectangleThree.offsetWidth;
    const squareWidth = squareThree.offsetWidth;

    // Функция для движения квадрата вправо
function moveRight(): Promise<void> {
    return new Promise<void>((resolve) => {
        // Анимация движения вправо с использованием CSS transition
        squareThree.style.transition = 'transform 2s ease-in-out';
        squareThree.style.transform = `translateX(${rectangleWidth - squareWidth}px)`;

        // Ожидание завершения анимации вправо
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

// Функция для движения квадрата влево
function moveLeft(): Promise<void> {
    return new Promise<void>((resolve) => {
        // Анимация движения влево с использованием CSS transition
        squareThree.style.transition = 'transform 2s ease-in-out';
        squareThree.style.transform = 'translateX(0)';

        // Ожидание завершения анимации влево
        setTimeout(() => {
            resolve();
        }, 2000);
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
    const squareFour = document.querySelector('.squareFour') as HTMLElement;
    const rectangleFour = document.querySelector('.rectangleFour') as HTMLElement;
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

// Функция для анимации и сортировки
async function animateAndSort() {
    console.log('start')
    // Запуск анимаций для двух квадратов
    animateSquareThree();
    animateSquareFour();
    getRickAndMortyCharacters();

    // Генерация неотсортированного массива из 100000 элементов
    const unsortedArray = generateRandomArray(100000);

    // Вывод неотсортированного массива в консоль
    console.log('Unsorted Array:', unsortedArray);

    // Засекаем время начала сортировки
    const startTime = new Date().getTime();

    // Создаем Web Worker для сортировки массива
    const sortingWorker = new Worker('./sortingWorker.js');
   
    
   

    // Обработчик сообщений от Web Worker
    sortingWorker.onmessage = function (e) {
        // Получаем отсортированный массив из сообщения
        const  {sortedArray}  = e.data;

        // Вывод отсортированного массива в консоль
        console.log('Sorted Array:', sortedArray);

        // Засекаем время окончания сортировки
        const endTime = new Date().getTime();

// Получаем элемент для вывода результатов сортировки
const sortedArrayElement = document.getElementById('sortingSection');

if (sortedArrayElement) {
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
} else {
    console.error('Element with id "sortingSection" not found.');
}

    };

    // Отправляем неотсортированный массив в Web Worker
    sortingWorker.postMessage(unsortedArray);
}

// Функция для генерации случайного массива заданного размера
function generateRandomArray(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
}

export {};





