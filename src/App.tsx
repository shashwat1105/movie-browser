import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetails from './components/MovieDetails';
import NotFound from './pages/NotFound';
import './styles/global.css';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;