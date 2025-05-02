import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import FavoriteButton from '../FavoriteButton';
import Loader from '../Loader';
import styles from './styles.module.css';
import { ArrowLeft } from 'lucide-react';
import { Movie } from '../../types/movies';

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(imdbID!);
        if (data) {
          setMovie(data);
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        console.log(err);
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!movie) return <div className={styles.error}>Movie not found</div>;

  return (
    <div className={styles.container}>
    <button 
  onClick={() => navigate(-1)} 
  className={styles.backButton}
>
  <ArrowLeft size={20} /> Back
</button>
      
      <div className={styles.movieDetails}>
        <div className={styles.posterContainer}>
          {movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
          ) : (
            <div className={styles.posterPlaceholder}>No poster available</div>
          )}
        </div>
        
        <div className={styles.details}>
          <div className={styles.header}>
            <h1 className={styles.title}>{movie.Title} <span>({movie.Year})</span></h1>
            <FavoriteButton movie={movie} size={24} />
          </div>
          
          <div className={styles.meta}>
            {movie.Runtime && <span>{movie.Runtime}</span>}
            {movie.Genre && <span>{movie.Genre}</span>}
            {movie.imdbRating && <span>IMDb: {movie.imdbRating}</span>}
          </div>
          
          <div className={styles.section}>
            <h3>Plot</h3>
            <p>{movie.Plot || 'No plot available'}</p>
          </div>
          
          {movie.Director && (
            <div className={styles.section}>
              <h3>Director</h3>
              <p className={styles.random2}>{movie.Director}</p>
            </div>
          )}
          
          {movie.Actors && (
            <div className={styles.section}>
              <h3>Cast</h3>
              <p className={styles.random2}>{movie.Actors}</p>
            </div>
          )}
          
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className={styles.section}>
              <h3>Ratings</h3>
              <ul className={styles.ratings}>
                {movie.Ratings.map((rating, index) => (
                  <li key={index}>
                    <strong>{rating.Source}:</strong> {rating.Value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;