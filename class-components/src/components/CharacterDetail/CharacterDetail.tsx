import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CharacterDetail.module.css';

interface CharacterDetailParams {
  id: string;
}

interface Character {
  name: string;
  url: string;
}

const CharacterDetail: React.FC = () => {
  const { id } = useParams<CharacterDetailParams>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCharacter(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!character) {
    return <div>No character data available</div>;
  }

  return (
    <div className={styles.characterDetail}>
      <h2>{character.name}</h2>
      <p>URL: {character.url}</p>
      {/* Add more character details here */}
    </div>
  );
};

export default CharacterDetail;
