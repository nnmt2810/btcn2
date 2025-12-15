import MovieCard from "../components/MovieCard"
import { useNavigate } from "react-router-dom"

const Search = ({ results = [] }) => {
  const navigate = useNavigate()

  return (
    <main className="bg-gray-100 dark:bg-gray-800 min-h-[70vh] px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Kết quả tìm kiếm
        </h1>

        {results.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">
            Không tìm thấy phim nào phù hợp.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => navigate(`/movies/${movie.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Search
