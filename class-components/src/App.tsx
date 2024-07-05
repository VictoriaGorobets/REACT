import { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsList from './components/ResultsList/ResultsList';
import './index.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                    <SearchBar />
                    <ResultsList />
            </div>
        );
    }
}

export default App;