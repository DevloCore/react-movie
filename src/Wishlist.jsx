import React from 'react';
import styles from './Wishlist.module.css';
import { useWishlist } from './contexts/WishlistProvider';
import { useNavigate } from 'react-router';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return <p style={{ textAlign: 'center', color: 'white' }}>Your wishlist is empty.<hr/></p>;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#fff' }}>My Wishlist</h1>
      <div className={styles.container}>
        {wishlist.map((movie) => (
          <div key={movie.id} className={styles.card}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.image}
            />
            <div className={styles.details}>
              <h2>{movie.title}</h2>
              <button
                onClick={() => removeFromWishlist(movie.id)}
                style={{
                  marginTop: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#d32f2f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Remove from Wishlist
              </button>
              <button
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{
                  marginTop: '10px',
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;