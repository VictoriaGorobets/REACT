import { Component } from "react";
import styles from "./ResultsList.module.css";

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
      let url = "https://swapi.dev/api/people/";
      const { useStarTrekApi } = this.props;

      if (useStarTrekApi) {
        url = "https://stapi.co/api/v1/rest/character/search";
      } else if (searchTerm) {
        url = `${url}?search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      let characters: Character[] = [];
      if (useStarTrekApi) {
        characters = data.characters.map((character: string) => ({
          name: character.name,
          url: character.uid,  // Assuming 'url' is equivalent to 'uid' in Star Trek API
        }));
      } else {
        characters = data.results.map((character: string) => ({
          name: character.name,
          url: character.url,
        }));
      }

      this.setState({ characters, loading: false });
    } catch (error: Error) {
      this.setState({ loading: false, error: error.message });
    }
  };

  render() {
    const { characters, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      throw new Error(error);
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