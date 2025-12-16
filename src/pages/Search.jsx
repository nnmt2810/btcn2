import MovieCard from "../components/MovieCard"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Search = ({ results = [] }) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  const totalPages = Math.ceil(results.length / pageSize)

  const paginatedResults = results.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

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
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {paginatedResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => navigate(`/movies/${movie.id}`)}
                />
              ))}
            </div>

            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-gray-800 dark:text-gray-200">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default Search
