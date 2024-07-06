import { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ResultsList from "./components/ResultsList/ResultsList";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./index.css";

interface AppProps {}

interface AppState {
  searchTerm: string;
  useStarTrekApi: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const savedSearchTerm = localStorage.getItem("searchTerm") || "";
    this.state = {
      searchTerm: savedSearchTerm,
      useStarTrekApi: false,
    };
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
    localStorage.setItem("searchTerm", searchTerm.trim());
  };

  throwError = () => {
    this.setState({ useStarTrekApi: true });
    throw new Error("Test Error");
  };

  render() {
    const { searchTerm, useStarTrekApi } = this.state;

    return (
        <ErrorBoundary>
          <div className="app">
            <SearchBar onSearch={this.handleSearch} />
            <ResultsList searchTerm={searchTerm} useStarTrekApi={useStarTrekApi} />
            <button type="button" onClick={this.throwError}>
              Throw Error
            </button>
          </div>
        </ErrorBoundary>
    );
  }
}

export default App;