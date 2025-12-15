import { useState } from "react"
import MovieCard from "./MovieCard"

const PER_PAGE = 3

const MovieRow = ({ title, movies }) => {
  const [page, setPage] = useState(0)

  const maxPage = Math.ceil(movies.length / PER_PAGE) - 1

  const visibleMovies = movies.slice(
    page * PER_PAGE,
    page * PER_PAGE + PER_PAGE
  )

  return (
    <section className="relative px-10 py-6">
      <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-4">{title}</h2>

      {page > 0 && (
        <button
          onClick={() => setPage(page - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl"
        >
          ◀
        </button>
      )}

      <div className="flex gap-6 justify-center">
        {visibleMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {page < maxPage && (
        <button
          onClick={() => setPage(page + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl"
        >
          ▶
        </button>
      )}
    </section>
  )
}

export default MovieRow
