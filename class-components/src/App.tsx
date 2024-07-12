import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsList from './components/ResultsList/ResultsList';
import CharacterDetail from './components/CharacterDetail/CharacterDetail';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './index.css';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(localStorage.getItem('searchTerm') || '');
  const [useStarTrekApi, setUseStarTrekApi] = useState<boolean>(false);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const toggleApi = () => {
    setUseStarTrekApi(prev => !prev);
  };

  return (
    <Router>
      <div>
        <SearchBar onSearch={handleSearch} />
        <button type="button" onClick={toggleApi}>Error</button>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<ResultsList searchTerm={searchTerm} useStarTrekApi={useStarTrekApi} />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default App;
