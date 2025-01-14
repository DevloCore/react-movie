import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./Home"
import Navbar from "./Navbar"
import Movies from "./Movies"

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
