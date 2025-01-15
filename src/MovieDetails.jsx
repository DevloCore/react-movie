import React, { useEffect, useState } from 'react'
import styles from './MovieDetails.module.css'
import { useNavigate, useParams } from 'react-router';
import { useWishlist } from './contexts/WishlistProvider';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const API_KEY = "9995ccfe9d6d3c53afa2cbc8530a25f5";
    const API_URL = `https://api.themoviedb.org/3/movie/${id}`;
  
    useEffect(() => {
        fetch(API_URL + `?api_key=${API_KEY}&append_to_response=credits,similar`)
        .then((response) => response.json())
        .then((data) => {setMovie(data); console.log(data); })
        .catch((error) => console.error('Error while loading:', error));
    }, [id]);

    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
    if (!movie) return <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>;

    const toggleWishlist = () => {
        if (isInWishlist(movie.id)) {
          removeFromWishlist(movie.id);
        } else {
          addToWishlist(movie);
        }
      };
  
    return (
      <>
      <div className={styles.container}>
        <div className={styles.poster}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{movie.title}</h1>
          {movie.tagline && <p className={styles.tagline}>{`"${movie.tagline}"`}</p>}
          <div className={styles.info}>
            <span className={styles.rating}>⭐ {movie.vote_average} / 10</span>
            <p>{movie.overview}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Duration:</strong> {movie.runtime} min</p>
          </div>
          <div className={styles.genres}>
            {movie.genres.map((genre) => (
              <span key={genre.id} className={styles.genre}>{genre.name}</span>
            ))}
          </div>
          <button
            onClick={toggleWishlist}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: isInWishlist(movie.id) ? '#d32f2f' : '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {isInWishlist(movie.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff9800',
              color: '#121212',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => navigate(-1)}
          >
            Back to List
          </button>
        </div>
      </div>


      <h2 style={{textAlign:'center'}}>Cast</h2>
        <div className={styles.castContainer}>
          {movie.credits.cast.slice(0, 10).map((person) => (
            <div key={person.id} className={styles.castCard}>
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                    : 'https://via.placeholder.com/150'
                }
                alt={person.name}
                className={styles.castImage}
              />
              <p>{person.name}</p>
              <p style={{ fontSize: '14px', color: '#888' }}>{person.character}</p>
            </div>
          ))}
        </div>


        <h2 style={{textAlign:'center'}}>Similar Movies</h2>
      <div className={styles.similarContainer}>
        {movie.similar.results.map((similar) => (
          <div key={similar.id} className={styles.similarCard}>
            <img
              src={`https://image.tmdb.org/t/p/w500${similar.poster_path}`}
              alt={similar.title}
              className={styles.similarImage}
            />
            <p>{similar.title}</p>
          </div>
        ))}
      </div>
      </>
    );
  };
  
  export default MovieDetails;