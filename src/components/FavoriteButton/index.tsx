import { Heart} from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './styles.module.css';
import { Movie } from '../../types/movies';

interface FavoriteButtonProps {
  movie: Movie;
  size?: number;
}

const FavoriteButton = ({ movie, size = 20 }: FavoriteButtonProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movie.imdbID);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.favoriteButton} ${favorite ? styles.favorited : ''}`}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {favorite ? <Heart size={size} /> : <Heart size={size} />}
    </button>
  );
};

export default FavoriteButton;