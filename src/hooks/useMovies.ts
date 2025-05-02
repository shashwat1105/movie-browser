import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';
import { Movie } from '../types/movies';
// import type { Movie, ApiResponse } from '../types/movie';

export const useMovies = (initialQuery: string = '') => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const queryToUse = searchQuery.trim() || 'movie'; // Default search term
        const data = await searchMovies(queryToUse, currentPage);
        
        if (data.Response === 'True') {
          setMovies(data.Search || []);
          setTotalResults(parseInt(data.totalResults || '0'));
          setError(null);
        } else {
          setMovies([]);
          setError(data.Error || 'No results found');
        }
      } catch (err) {
        setError('Failed to fetch movies');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, currentPage]);

  return {
    movies,
    loading,
    error,
    totalResults,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
  };
};