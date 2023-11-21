// src/domain/character/CharacterService.ts
import axios from 'axios';
import { Character } from './Character';

class CharacterService {
  async getCharacters(page: number): Promise<Character[]> {
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

export default CharacterService;
