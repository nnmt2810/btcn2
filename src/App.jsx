import { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import { getMovies } from './api/movie.api'
import { getMoviesTopRated } from './api/movie.top-rated.api'
import { getMovieDetail } from './api/movie.detail.api'
import { Routes, Route, useLocation } from "react-router-dom"


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  const [movies, setMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [detailMovie, setDetailMovie] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState(null)
  const location = useLocation()

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

  useEffect(() => {
    const match = location.pathname.match(/^\/movies\/([^/]+)/)
    const currentId = match?.[1]
    if (!currentId) {
      setDetailMovie(null)
      setDetailError(null)
      return
    }

    let isMounted = true
    const fetchDetail = async () => {
      try {
        setDetailLoading(true)
        setDetailError(null)
        const data = await getMovieDetail(currentId)
        if (isMounted) {
          const detailData = data?.data ?? data
          setDetailMovie(detailData)
        }
      } catch (err) {
        if (isMounted) setDetailError(err.message)
      } finally {
        if (isMounted) setDetailLoading(false)
      }
    }

    fetchDetail()

    return () => {
      isMounted = false
    }
  }, [location.pathname])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (detailLoading) return <p>Loading detail...</p>
  if (detailError) return <p>Error: {detailError}</p>

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
              movies={detailMovie ? [detailMovie] : []}
              topRatedMovies={[]}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App