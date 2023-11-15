const axios = require('axios');

async function getRickAndMortyData(page) {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for page ${page}:`, error.message);
        return null;
    }
}

async function displayEverySecondPage() {
    try {
        // Изначально получим данные для первой страницы, чтобы узнать общее количество страниц
        const firstPageData = await getRickAndMortyData(1);
        if (!firstPageData) {
            console.error('Failed to retrieve data for the first page. Exiting.');
            return;
        }
        
        const totalPages = firstPageData.info.pages;

        for (let page = 2; page <= totalPages; page += 2) {
            const data = await getRickAndMortyData(page);
            if (data) {
                const characters = data.results || [];
                console.log(`\nPage ${page}:`);
                characters.forEach(character => {
                    console.log(`Name: ${character.name}, Status: ${character.status}`);
                });
            } else {
                console.error(`Failed to retrieve data for page ${page}. Skipping.`);
            }
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error.message);
    }
}

async function main() {
    await displayEverySecondPage();
}

main();
