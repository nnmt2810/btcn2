import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"

const parseActors = (actors) => {
  if (Array.isArray(actors)) return actors
  if (typeof actors === "string") {
    return actors.split(",").map((item) => item.trim()).filter(Boolean)
  }
  return []
}

const MovieDetail = ({ movies = [], topRatedMovies = [] }) => {
  const { id } = useParams()

  const movie = useMemo(() => {
    const allMovies = [...movies, ...topRatedMovies]
    return allMovies.find((item) => String(item.id) === id)
  }, [id, movies, topRatedMovies])

  if (!movie) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold">Không tìm thấy phim</p>
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-300 hover:underline"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </main>
    )
  }

  const description = movie.short_description || "Không có mô tả."
  const actors =
    movie.actors ||
    movie.cast ||
    movie.casts ||
    movie.stars ||
    movie.actors_list ||
    []
  const actorList = parseActors(actors)

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-300 hover:underline font-semibold"
        >
          ← Quay lại trang chủ
        </Link>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden w-full md:w-[260px] shrink-0">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full object-cover"
            />
          </div>

          <div className="space-y-4 flex-1">
            <header className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {movie.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Năm phát hành: {movie.year}
              </p>
            </header>

            <section>
              <h2 className="text-lg font-semibold mb-2">Nội dung</h2>
              <p className="leading-relaxed text-gray-700 dark:text-gray-200">
                {description}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Thể loại</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.length ? (
                  movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full"
                    >
                      {genre}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">
                    Chưa có thông tin thể loại.
                  </p>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Diễn viên</h2>
              {actorList.length ? (
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                  {actorList.map((actor) => (
                    <li key={actor}>{actor}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  Chưa có thông tin diễn viên.
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MovieDetail

