import { Component, ChangeEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchBarState {
  searchTerm: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleSearch = () => {
    const { onSearch } = this.props; // Деструктуризация пропсов
    const { searchTerm } = this.state;
    onSearch(searchTerm.trim());
    localStorage.setItem('searchTerm', searchTerm.trim());
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
