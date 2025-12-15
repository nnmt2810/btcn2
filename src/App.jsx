import { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import { getMovies } from './api/movie.api'
import { getMoviesTopRated } from './api/movie.top-rated.api'
import { Routes, Route } from "react-router-dom"


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  const [movies, setMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", darkMode)
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [moviesRes, topRatedRes] = await Promise.all([
        getMovies(),
        getMoviesTopRated(),
      ])

      setMovies(moviesRes.data ?? moviesRes)
      setTopRatedMovies(topRatedRes.data ?? topRatedRes)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Navbar />

      <Routes>
        <Route
          path='/'
          element={<Home movies={movies} topRatedMovies={topRatedMovies}/>}
        />
        <Route
          path='/movies/:id'
          element={
            <MovieDetail
              movies={movies}
              topRatedMovies={topRatedMovies}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App