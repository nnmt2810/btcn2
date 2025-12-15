const MovieDetailModal = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="relative bg-white dark:bg-gray-900 w-[600px] p-6 rounded-xl">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl"
        >
          ✕
        </button>

        <div className="flex gap-6">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-40 rounded-lg"
          />

          <div>
            <h2 className="text-2xl text-gray-800 dark:text-red-200 font-bold mb-2">
              {movie.title}
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {movie.short_description}
            </p>

            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MovieDetailModal
