import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router'
import { useWishlist } from './contexts/WishlistProvider';

const Navbar = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className={styles.navbar}>
        <h1 className={styles.title}>React Movie</h1>
        <Link to="/" className={styles.link}>Movies</Link>
        <Link to="/wishlist" className={styles.link}>Wishlist ({wishlist ? wishlist.length : '0'})</Link>
    </div>
  )
}

export default Navbar