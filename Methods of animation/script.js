// Функция для анимации движения квадрата вправо и влево
function animateSquareThree() {
    const squareThree = document.querySelector('.squareThree');
    const rectangleThree = document.querySelector('.rectangleThree');
    const rectangleWidth = rectangleThree.offsetWidth;
    const squareWidth = squareThree.offsetWidth;

    function moveRight() {
        return new Promise((resolve) => {
            // Анимация движения вправо
            squareThree.style.transition = 'transform 2s ease-in-out';
            squareThree.style.transform = `translateX(${rectangleWidth - squareWidth}px)`;

            // Ждем, пока анимация вправо завершится
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    function moveLeft() {
        return new Promise((resolve) => {
            // Анимация движения влево
            squareThree.style.transition = 'transform 2s ease-in-out';
            squareThree.style.transform = 'translateX(0)';

            // Ждем, пока анимация влево завершится
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    // Функция для циклического вызова анимаций
    function animateLoop() {
        moveRight()
            .then(() => moveLeft())
            .then(animateLoop);
    }

    // Запуск анимации
    animateLoop();
}

// Вызываем функцию анимации при загрузке страницы
document.addEventListener('DOMContentLoaded', animateSquareThree);


// Функция для анимации движения квадрата squareFour вправо и влево с использованием Request Animation Frame
function animateSquareFour() {
    const squareFour = document.querySelector('.squareFour');
    const rectangleFour = document.querySelector('.rectangleFour');
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

// Вызываем функцию анимации при загрузке страницы
document.addEventListener('DOMContentLoaded', animateSquareFour);
