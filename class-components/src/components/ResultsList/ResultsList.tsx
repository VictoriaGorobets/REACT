import { Component } from 'react';
import styles from './ResultsList.module.css';

interface Character {
  name: string;
  url: string;
}

interface ResultsListProps {
  searchTerm: string;
  useStarTrekApi: boolean;
}

interface ResultsListState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

class ResultsList extends Component<ResultsListProps, ResultsListState> {
  constructor(props: ResultsListProps) {
    super(props);
    this.state = {
      characters: [],
      loading: false,
      error: null,
    };
  }

  async componentDidMount() {
    const { searchTerm } = this.props;
    await this.fetchCharacters(searchTerm);
  }

  async componentDidUpdate(prevProps: ResultsListProps) {
    const { searchTerm, useStarTrekApi } = this.props;
    if (prevProps.searchTerm !== searchTerm || prevProps.useStarTrekApi !== useStarTrekApi) {
      await this.fetchCharacters(searchTerm);
    }
  }

  fetchCharacters = async (searchTerm: string) => {
    this.setState({ loading: true, error: null });

    try {
      let url = 'https://swapi.dev/api/people/';
      let options: RequestInit = {};

      const { useStarTrekApi } = this.props;

      if (useStarTrekApi) {
        url = 'https://stapi.co/api/v1/rest/character/search';
        options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `name=${encodeURIComponent(searchTerm)}`,
        };
      } else if (searchTerm) {
        url = `${url}?search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      let characters: Character[] = [];
      if (useStarTrekApi) {
        characters = data.characters.map((character: { name: string; uid: string }) => ({
          name: character.name,
          url: character.uid,
        }));
      } else {
        characters = data.results.map((character: { name: string; url: string }) => ({
          name: character.name,
          url: character.url,
        }));
      }

      this.setState({ characters, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ loading: false, error: error.message });
      }
    }
  };

  render() {
    const { characters, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className={styles.resultsList}>
        {characters.map((character) => (
          <div key={character.url} className={styles.resultItem}>
            <h3>{character.name}</h3>
            <p>URL: {character.url}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultsList;