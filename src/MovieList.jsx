import React, { useEffect, useState } from 'react'
import styles from './MovieList.module.css'
import { useNavigate } from 'react-router';

const Movies = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [category, setCategory] = useState('popular');

    const fetchMovies = (category) => {
      const url = query ?
        `https://api.themoviedb.org/3/search/movie?api_key=9995ccfe9d6d3c53afa2cbc8530a25f5&query=${debouncedQuery}` :
        `https://api.themoviedb.org/3/movie/${category}?api_key=9995ccfe9d6d3c53afa2cbc8530a25f5`;

      fetch(url)
      .then(response => response.json())
      .then(data => {
          setMovies(data.results);
      });
    };

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedQuery(query);
      }, 500);
  
      return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        fetchMovies(category);
    }, [category, debouncedQuery]);
    

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div>
          <h1 style={{ textAlign: 'center' }}>Welcome to React Movie</h1>

          <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="Search for a movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
              />
          </div>

          <div className={styles.buttons}>
            <button onClick={() => setCategory('now_playing')}>Now Playing</button>
            <button onClick={() => setCategory('popular')}>Popular</button>
            <button onClick={() => setCategory('top_rated')}>Top Rated</button>
            <button onClick={() => setCategory('upcoming')}>Upcoming</button>
          </div>

          {movies.length === 0 && <div style={{ textAlign: 'center', color: 'white' }}>No result !<hr/></div>}
          <div className={styles.container}>
            {movies.length > 0 && movies.map((movie) => (
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