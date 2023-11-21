// src/components/CharacterCardClass.tsx
import React from 'react';
import { Character } from '../domain/character/Character';

interface CharacterCardProps {
  character: Character;
}

class CharacterCardClass extends React.Component<CharacterCardProps> {
  render() {
    const { character } = this.props;

    return (
      <div className="character-card">
        <img src={character.image} alt={character.name} />
        <h3>{character.name}</h3>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
      </div>
    );
  }
}

export default CharacterCardClass;
