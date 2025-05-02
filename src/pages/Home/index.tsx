import { useMovies } from '../../hooks/useMovies';
import MovieCard from '../../components/MovieCard';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import ErrorBoundary from '../../components/ErrorBoundary';
import MovieSlider from '../../components/MovieSlider';
import Navbar from '../../components/Navbar';
import styles from './styles.module.css';

const Home = () => {
  const {
    movies,
    loading,
    error,
    totalResults,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
  } = useMovies();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <Navbar onSearch={handleSearch} searchQuery={searchQuery} />
      
      <div className={styles.random}>

      <MovieSlider />
      </div>
      
      <div className={styles.content}>
        <ErrorBoundary>
          {loading ? (
            <Loader />
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <>
              {movies.length > 0 && (
                <p className={styles.resultsCount}>
                  {searchQuery ? `${totalResults} results for "${searchQuery}"` : 'Popular Movies'}
                  {totalResults > 10 && ` (Page ${currentPage})`}
                </p>
              )}
              <div className={styles.movieGrid}>
                {movies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
              {totalResults > 10 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalResults / 10)}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Home;