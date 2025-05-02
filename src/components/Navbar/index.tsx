import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import SearchBar from '../SearchBar';
import { Heart } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Navbar = ({ onSearch, searchQuery }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <div >
        <Link to="/">
        <h1 className={styles.logo}>Movies<span className={styles.verse}>Verse</span> </h1></Link>
      </div>
      
      <div className={styles.searchContainer}>
        <SearchBar onSearch={onSearch} initialValue={searchQuery} />
      </div>
      
      <div className={styles.favorites}>
        <Link to="/favorites" className={styles.favoritesLink}>
          My Favorites <Heart color='white'/>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;