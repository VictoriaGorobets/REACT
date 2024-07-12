import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ResultsList.module.css';

interface Character {
  name: string;
  url: string;
}

interface ResultsListProps {
  searchTerm: string;
  useStarTrekApi: boolean;
}

const ResultsList: React.FC<ResultsListProps> = ({ searchTerm, useStarTrekApi }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = 'https://swapi.dev/api/people/';
        let options: RequestInit = {};

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

        setCharacters(characters);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [searchTerm, useStarTrekApi]);

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
          <Link to={`/character/${character.url.split('/').filter(Boolean).pop()}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;
