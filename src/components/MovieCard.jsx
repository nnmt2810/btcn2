const MovieCard = ({ movie, onClick, big }) => {
  const baseHover = "transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10"
  const cardClass = big 
    ? `w-80 shrink-0 mx-2 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer ${baseHover}`  // Lớn hơn cho big
    : `w-60 shrink-0 mx-2 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer ${baseHover}`;
  
  const imgClass = big 
    ? "w-full h-[500px] object-cover"
    : "w-full h-90 object-cover";

  return (
    <div 
      onClick={onClick}
      className={cardClass}
    >
      <img
        src={movie.image} 
        alt={movie.title} 
        className={imgClass}
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