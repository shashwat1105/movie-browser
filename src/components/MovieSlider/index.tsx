import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import img1 from  "../../assets/john-wick-chapter-4-3840x2160-18980.jpg";
import img2 from  "../../assets/spider-man-across-7680x4320-11595.jpg";
import img3 from "../../assets/the-super-mario-bros-movie-poster-17.jpg";
import img4 from "../../assets/1310205.jpeg";
import img5 from "../../assets/1337616.jpg"

const featuredMovies = [
     
    {
      id: 1,
      title: "John Wick: Chapter 4",
      year: "2023",
      rating: 4.5,
      description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.",
      imageUrl: img1,
      genre: "Action, Crime, Thriller"
    },
    {
      id: 2,
      title: "Spider-Man: Across the Spider-Verse",
      year: "2023",
      rating: 4.7,
      description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
      imageUrl: img2,
      genre: "Animation, Action, Adventure"
    },
    {
      id: 3,
      title: "The Super Mario Bros. Movie",
      year: "2023",
      rating: 4.0,
      description: "A plumber named Mario travels through an underground labyrinth with his brother Luigi, trying to save a captured princess.",
      imageUrl: img3,
      genre: "Animation, Adventure, Comedy"
    },
    {
      id: 4,
      title: "Guardians of the Galaxy Vol. 3",
      year: "2023",
      rating: 4.4,
      description: "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and protect one of their own.",
      imageUrl: img4,
      genre: "Action, Adventure, Comedy"
    },
    {
      id: 5,
      title: "Mission: Impossible - Dead Reckoning Part One",
      year: "2023",
      rating: 4.6,
      description: "Ethan Hunt and his IMF team must track down a terrifying new weapon that threatens all of humanity.",
      imageUrl: img5,
      genre: "Action, Adventure, Thriller"
    }
  ];

const MovieSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      {featuredMovies.map((movie, index) => (
        <motion.div
          key={movie.id}
          className={styles.slide}
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === currentSlide ? 1 : 0,
            zIndex: index === currentSlide ? 1 : 0
          }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={movie.imageUrl} 
            alt={movie.title} 
            className={styles.slideImage}
          />
          <div className={styles.slideContent}>
            <h2>{movie.title}</h2>
            <div className={styles.movieMeta}>
              <span>{movie.year}</span>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={i < Math.floor(movie.rating) ? styles.filled : ''}
                  >
                    ★
                  </span>
                ))}
                <span>({movie.rating.toFixed(1)})</span>
              </div>
            </div>
            <p className={styles.description}>{movie.description}</p>
          </div>
        </motion.div>
      ))}
      <div className={styles.slideDots}>
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            className={index === currentSlide ? styles.activeDot : ''}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;