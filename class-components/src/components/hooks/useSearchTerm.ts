import { useState, useEffect } from 'react';

const useSearchTerm = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  useEffect(() => () => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  return searchTerm;
};

export default useSearchTerm;