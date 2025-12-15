const MovieCard = ({ movie }) => {
  return (
    <div className="w-60 shrink-0 mx-2 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <img
        src={movie.image} 
        alt={movie.title} 
        className="w-full h-90 object-cover"
      />
      <div className="p-2">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{movie.title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">{movie.year}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">Rate: {movie.rate}</p>
      </div>
    </div>
  )
}

export default MovieCard
