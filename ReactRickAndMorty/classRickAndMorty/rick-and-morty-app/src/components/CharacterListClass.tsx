// src/components/CharacterListClass.tsx
import React from 'react';
import { Character } from '../domain/character/Character';
import CharacterCardClass from './CharacterCardClass';
import CharacterService from '../domain/character/CharacterService';

interface CharacterListProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

interface CharacterListState {
  characters: Character[];
}

class CharacterListClass extends React.Component<CharacterListProps, CharacterListState> {
  private characterService: CharacterService;

  constructor(props: CharacterListProps) {
    super(props);
    this.state = {
      characters: [],
    };
    this.characterService = new CharacterService();
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  componentDidUpdate(prevProps: CharacterListProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.fetchCharacters();
    }
  }

  fetchCharacters = async () => {
    const { currentPage } = this.props;
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
      const data = await response.json();
      this.setState({ characters: data.results });
      console.log('Fetched characters:', data.results);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  render() {
    const { characters } = this.state;
    const { onPrevPage, onNextPage, currentPage, totalPages } = this.props;

    return (
      <div>
        <div className="pagination">
          <button onClick={onPrevPage}>⬅️</button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button onClick={onNextPage}>➡️</button>
        </div>
        <div className="character-list">
          {characters.map((character) => (
            <CharacterCardClass key={character.id} character={character} />
          ))}
        </div>
        <div className="pagination">
          <button onClick={onPrevPage}>⬅️</button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button onClick={onNextPage}>➡️</button>
        </div>
      </div>
    );
  }
}

export default CharacterListClass;


