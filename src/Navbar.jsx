import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
        <h1 className={styles.title}>React Movie</h1>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/movies" className={styles.link}>Movies</Link>
    </div>
  )
}

export default Navbar