import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const addToWishlist = (movie) => {
        setWishlist((prev) => {
            return [...prev, movie];
        });
    };

    const removeFromWishlist = (movieId) => {
        setWishlist((prev) => {
            return prev.filter((movie) => movie.id !== movieId);
        });
    };

    const isInWishlist = (movieId) => {
        return wishlist.some((movie) => movie.id === movieId);
      };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
        {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}