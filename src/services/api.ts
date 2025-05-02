import { ApiResponse, Movie } from "../types/movies";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}&type=movie`
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    
    // Handle default search case
    if (query === 'movie' && data.Response === 'False') {
      return {
        ...data,
        Response: 'True',
        Search: [],
        totalResults: '0'
      };
    }
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { Response: 'False', Error: 'Failed to fetch movies' };
  }
};

export const getMovieDetails = async (id: string): Promise<Movie | null> => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};