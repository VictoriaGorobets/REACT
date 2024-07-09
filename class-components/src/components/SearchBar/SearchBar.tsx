import React, { useState, ChangeEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm.trim());
    localStorage.setItem('searchTerm', searchTerm.trim());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleInputChange} />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;