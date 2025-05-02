import { useFavorites } from '../../context/FavoritesContext';
import MovieCard from '../../components/MovieCard';
import styles from './styles.module.css';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { favorites} = useFavorites();
  const navigate=useNavigate();

  return (
    <div className={styles.container}>
        <div className={styles.new}>

            <button 
  onClick={() => navigate(-1)} 
  className={styles.backButton}
>
  <ArrowLeft size={20} /> Back
</button>
      <h1 className={styles.title}>Your Favorite Movies</h1>
    </div>
      
      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p>You haven't added any favorites yet.</p>
        </div>
      ) : (
        <div className={styles.movieGrid}>
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              // onClick={() => {
              //   window.location.href = `/movie/${movie.imdbID}`;
              // }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;