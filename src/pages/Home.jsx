import { useState } from "react"
import MovieCard from "../components/MovieCard"
import MovieRow from "../components/MovieRow"

const Home = ({ movies, topRatedMovies }) => {
    const [index, setIndex] = useState(0)
    const [selectedMovie, setSelectedMovie] = useState(null)

    const prev = () => {
        setIndex((prev) => (prev - 1))
    }

    const next = () => {
        setIndex((prev) => (prev + 1))
    }

    const movie = movies[index]

    return (
        <main className="bg-gray-100 dark:bg-gray-800">
            <section className="relative flex items-center justify-center min-h-[70vh]">
                {index > 0 && (
                    <button
                        onClick={prev}
                        className="absolute left-4 z-10 text-3xl"
                    >
                        ◀
                    </button>
                )}

                {movie && ( 
                    <MovieCard 
                        onClick={()=> setSelectedMovie(movie)} 
                        key={movie.id} 
                        movie={movie} 
                        big 
                    />
                )}

                {index < 4 && (
                    <button
                        onClick={next}
                        className="absolute right-4 z-10 text-3xl"
                    >
                        ▶
                    </button>
                )}
            </section>

            <section className="space-y-10 px-6 pb-10">
                <MovieRow
                    title="Most Popular"
                    movies={movies}
                    onMovieClick={setSelectedMovie}
                />
                <MovieRow
                    title="Top Rating"
                    movies={topRatedMovies}
                    onMovieClick={setSelectedMovie}
                />
            </section>
        </main>
    )
}

export default Home


