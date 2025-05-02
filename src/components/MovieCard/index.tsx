import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import FavoriteButton from '../FavoriteButton';
import { Movie } from '../../types/movies';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className={styles.posterContainer}
        onClick={() => navigate(`/movie/${movie.imdbID}`)}
      >
        {movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className={styles.poster}
            loading="lazy"
          />
        ) : (
          <div className={styles.posterPlaceholder}>
            <Film size={48} />
          </div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.Title}</h3>
        <p className={styles.year}>{movie.Year}</p>
        <div className={styles.actions}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movie/${movie.imdbID}`);
            }} 
            className={styles.moreInfo}
          >
            More Info
          </button>
          <FavoriteButton movie={movie} />
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;