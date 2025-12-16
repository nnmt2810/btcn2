import { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Search from './pages/Search'
import Register from './pages/Register'
import Login from './pages/Login'
import PersonDetail from './pages/PersonDetail'
import { getMovies } from './api/movie.api'
import { getMoviesTopRated } from './api/movie.top-rated.api'
import { getMovieDetail } from './api/movie.detail.api'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { getMovieReview } from './api/movie.review.api'
import { searchMovies } from './api/movie.search.api'
import { getPersonDetail } from './api/person.detail.api'


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
  const [reviews, setReviews] = useState([])
  const [reviewsError, setReviewsError] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [searchError, setSearchError] = useState(null)
  const [detailPerson, setDetailPerson] = useState(null)
  const [detailPersonLoading, setDetailPersonLoading] = useState(false)
  const [detailPersonError, setDetailPersonError] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

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

  const handleSearch = async ({ q, title, genre, person }) => {
    try {
      setSearchError(null)
      const res = await searchMovies({ q, title, genre, person })
      const list = res.data ?? res
      setSearchResults(Array.isArray(list) ? list : list.data ?? [])
      navigate("/search")
    } catch (err) {
      setSearchError(err.message)
      setSearchResults([])
      navigate("/search")
    }
  }

  useEffect(() => {
    const match = location.pathname.match(/^\/movies\/([^/]+)/)
    const currentId = match?.[1]
    if (!currentId) {
      setDetailMovie(null)
      setDetailError(null)
      setReviews([])
      setReviewsError(null)
      return
    }

    let isMounted = true
    const fetchDetail = async () => {
      try {
        setDetailLoading(true)
        setDetailError(null)
        setReviewsError(null)
        const data = await getMovieDetail(currentId)
        const reviewRes = await getMovieReview(currentId)
        if (isMounted) {
          const detailData = data?.data ?? data
          const reviewData = reviewRes?.data ?? reviewRes?.data?.data ?? reviewRes?.data ?? []
          setDetailMovie(detailData)
          setReviews(Array.isArray(reviewData?.data) ? reviewData.data : reviewData)
        }
      } catch (err) {
        if (isMounted) {
          if (!detailMovie) setDetailError(err.message)
          else setReviewsError(err.message)
        }
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
      <Navbar onSearch={handleSearch} />

      <Routes>
        <Route
          path='/'
          element={<Home movies={movies} topRatedMovies={topRatedMovies}/>}
        />
        <Route
          path='/search'
          element={<Search results={searchResults} error={searchError} />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/movies/:id'
          element={
            <MovieDetail
              movies={detailMovie ? [detailMovie] : []}
              topRatedMovies={[]}
              reviews={reviews}
              reviewsError={reviewsError}
            />
          }
        />
        <Route 
          path='/persons/:id' 
          element={<PersonDetail />} 
        />
      </Routes>
    </div>
  )
}

export default App