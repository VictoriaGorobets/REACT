import React from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsList from './components/ResultsList/ResultsList';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import useSearchTerm from './components/hooks/useSearchTerm';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useSearchTerm(localStorage.getItem('searchTerm') || '');
  const [useStarTrekApi] = React.useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const throwError = () => {
    throw new Error('Testing Error');
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ErrorBoundary>
        <ResultsList searchTerm={searchTerm} useStarTrekApi={useStarTrekApi} />
      </ErrorBoundary>
      <button type="button" onClick={throwError}>
        Error
      </button>
    </div>
  );
}
export default App;
