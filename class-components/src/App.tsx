import { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ResultsList from "./components/ResultsList/ResultsList";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./index.css";

interface AppState {
    searchTerm: string;
    useStarTrekApi: boolean;
}

class App extends Component<object, AppState> {
    constructor(props: object) {
        super(props);
        this.state = {
            searchTerm: localStorage.getItem("searchTerm") || "",
            useStarTrekApi: false,
        };
    }

    handleSearch = (searchTerm: string) => {
        this.setState({ searchTerm });
    };

    toggleApi = () => {
        this.setState((prevState) => ({
            useStarTrekApi: !prevState.useStarTrekApi,
        }), () => {
            const { searchTerm } = this.state;
            this.handleSearch(searchTerm);
        });
    };

    render() {
        const { searchTerm, useStarTrekApi } = this.state;

        return (
            <div>
                <SearchBar onSearch={this.handleSearch} />
                <button type="button" onClick={this.toggleApi}>
                    Toggle API
                </button>
                <ErrorBoundary>
                    <ResultsList searchTerm={searchTerm} useStarTrekApi={useStarTrekApi} />
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;