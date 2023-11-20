import axios, { AxiosResponse } from 'axios';

// Интерфейс представляет структуру данных персонажа
interface Character {
  name: string;
  status: string;
  // Добавьте другие свойства, если они вам нужны
}

// Интерфейс представляет структуру данных, возвращаемых API Rick and Morty
interface RickAndMortyData {
  info: {
    pages: number;
    // Другие свойства могут быть добавлены
  };
  results?: Character[];
}

// Функция для получения данных из API Rick and Morty по указанной странице
async function getRickAndMortyData(page: number): Promise<RickAndMortyData | null> {
  const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
  try {
    // Используем axios для выполнения GET-запроса
    const response: AxiosResponse<RickAndMortyData> = await axios.get(url);
    return response.data;
  } catch (error: unknown) {
    // В случае ошибки выводим сообщение об ошибке и возвращаем null
    if (error instanceof Error) {
      console.error(`Error fetching data for page ${page}:`, error.message);
    } else {
      console.error('An unexpected error occurred.');
    }
    return null;
  }
}

// Функция для отображения данных для каждой второй страницы
async function displayEverySecondPage(): Promise<Character[] | null> {
  try {
    // Получаем данные для первой страницы, чтобы узнать общее количество страниц
    const firstPageData = await getRickAndMortyData(1);
    if (!firstPageData) {
      console.error('Failed to retrieve data for the first page. Exiting.');
      return null;
    }

    // Извлекаем общее количество страниц из полученных данных
    const totalPages: number = firstPageData.info.pages;

    const allCharacters: Character[] = [];

    // Цикл для обхода каждой второй страницы и отображения данных
    for (let page = 2; page <= totalPages; page += 2) {
      // Получаем данные для текущей страницы
      const data = await getRickAndMortyData(page);
      if (data) {
        // Извлекаем персонажей из данных (если они есть) и добавляем их в общий массив
        const characters: Character[] = data.results || [];
        allCharacters.push(...characters);
      } else {
        // В случае ошибки получения данных выводим сообщение и пропускаем текущую страницу
        console.error(`Failed to retrieve data for page ${page}. Skipping.`);
      }
    }

    // Возвращаем массив всех персонажей
    return allCharacters;
  } catch (error: unknown) {
    // В случае неожиданной ошибки выводим сообщение
    if (error instanceof Error) {
      console.error('An unexpected error occurred:', error.message);
    } else {
      console.error('An unexpected error occurred.');
    }
    return null;
  }
}

// Функция для запуска основной логики
export async function getRickAndMortyCharacters(): Promise<void> {
  const characters = await displayEverySecondPage();
  if (characters) {
    // Вставляем данные в HTML-элемент на странице
    const characterListElement = document.getElementById('characterList');
    if (characterListElement) {
      characters.forEach((character) => {
        const listItem = document.createElement('ul');
        listItem.textContent = `Name: ${character.name}, Status: ${character.status}`;
        characterListElement.appendChild(listItem);
      });
    }
  }
}

// Вызов основной функции для выполнения программы
getRickAndMortyCharacters();
