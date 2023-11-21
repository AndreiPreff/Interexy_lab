// src/infrastructure/api/RickAndMortyApi.ts
import axios from 'axios';

class RickAndMortyApi {
  async getCharacters(page: number) {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/`, {
        params: { page },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching characters:', error);
      return [];
    }
  }
}

export default RickAndMortyApi;
