import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./Home"
import Navbar from "./Navbar"
import MovieList from "./MovieList"
import { WishlistProvider } from "./contexts/WishlistProvider"
import MovieDetails from "./MovieDetails"
import Wishlist from "./Wishlist"

function App() {
  return (
    <>
      <WishlistProvider>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </>
  )
}

export default App
