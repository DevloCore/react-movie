import React, { useEffect, useState } from 'react'
import styles from './MovieList.module.css'
import { useNavigate } from 'react-router';

const Movies = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=9995ccfe9d6d3c53afa2cbc8530a25f5')
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
            });
    }, []);

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div>
          <h1 style={{ textAlign: 'center' }}>Popular Movies</h1>
          <div className={styles.container}>
            {movies.map((movie) => (
              <div key={movie.id} className={styles.card} onClick={() => handleMovieClick(movie.id)}>
                <img
                  className={styles.image}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className={styles.details}>
                  <h2 className={styles.title}>{movie.title}</h2>
                  <p className={styles.overview}>{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Movies