// src/components/AppClass.tsx
import React, { Component } from 'react';
import CharacterListClass from './CharacterListClass';
import '../App.css';

interface AppClassState {
  currentPage: number;
  totalPages: number;
}

class AppClass extends Component<{}, AppClassState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 0,
    };
  }

  async componentDidMount() {
    await this.fetchDataAndSetTotalPages();
  }

  fetchDataAndSetTotalPages = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();

      // Рассчитаем общее количество страниц на основе количества персонажей на одной странице
      const totalPages = Math.ceil(data.info.count / 20);
      this.setState({ totalPages });
      console.log('Set totalPages:', totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  handlePrevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  handleNextPage = () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  render() {
    const { currentPage, totalPages } = this.state;

    return (
      <div className="App">
        <div className="character-list-container">
          <CharacterListClass
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={this.handlePrevPage}
            onNextPage={this.handleNextPage}
          />
        </div>
      </div>
    );
  }
}

export default AppClass;

