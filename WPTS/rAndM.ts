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
async function displayEverySecondPage(): Promise<void> {
  try {
    // Получаем данные для первой страницы, чтобы узнать общее количество страниц
    const firstPageData = await getRickAndMortyData(1);
    if (!firstPageData) {
      console.error('Failed to retrieve data for the first page. Exiting.');
      return;
    }

    // Извлекаем общее количество страниц из полученных данных
    const totalPages: number = firstPageData.info.pages;

    // Цикл для обхода каждой второй страницы и отображения данных
    for (let page = 2; page <= totalPages; page += 2) {
      // Получаем данные для текущей страницы
      const data = await getRickAndMortyData(page);
      if (data) {
        // Извлекаем персонажей из данных (если они есть)
        const characters: Character[] = data.results || [];
        console.log(`\nPage ${page}:`);
        
        // Выводим информацию о каждом персонаже на текущей странице
        characters.forEach((character: Character) => {
          console.log(`Name: ${character.name}, Status: ${character.status}`);
        });
      } else {
        // В случае ошибки получения данных выводим сообщение и пропускаем текущую страницу
        console.error(`Failed to retrieve data for page ${page}. Skipping.`);
      }
    }
  } catch (error: unknown) {
    // В случае неожиданной ошибки выводим сообщение
    if (error instanceof Error) {
      console.error('An unexpected error occurred:', error.message);
    } else {
      console.error('An unexpected error occurred.');
    }
  }
}

// Функция для запуска основной логики
async function main(): Promise<void> {
  await displayEverySecondPage();
}

// Вызов основной функции для выполнения программы
main();
