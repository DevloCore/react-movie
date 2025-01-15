import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const localWishlist = localStorage.getItem("wishlist");
        if (localWishlist) {
            setWishlist(JSON.parse(localWishlist));
        }
    }, []);

    const addToWishlist = (movie) => {
        setWishlist((prev) => {
            const modified = [...prev, movie];
            localStorage.setItem("wishlist", JSON.stringify(modified));
            return modified;
        });
    };

    const removeFromWishlist = (movieId) => {
        setWishlist((prev) => {
            const filtered = prev.filter((movie) => movie.id !== movieId);
            localStorage.setItem("wishlist", JSON.stringify(filtered));
            return filtered;
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