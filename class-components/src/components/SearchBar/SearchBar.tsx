import React, { Component } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {}

interface SearchBarState {
  searchTerm: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  handleSearch = () => {
    const { searchTerm } = this.state;
    // Handle search logic will be here
    alert(`Searching for: ${searchTerm}`);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
