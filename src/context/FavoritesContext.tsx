import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Movie } from '../types/movies';

type FavoritesContextType = {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (imdbID: string) => void;
  isFavorite: (imdbID: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const saveFavorites = (newFavorites: Movie[]) => {
    setFavorites(newFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
  };

  const addFavorite = (movie: Movie) => {
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      saveFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (imdbID: string) => {
    saveFavorites(favorites.filter(movie => movie.imdbID !== imdbID));
  };

  const isFavorite = (imdbID: string) => {
    return favorites.some(movie => movie.imdbID === imdbID);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};