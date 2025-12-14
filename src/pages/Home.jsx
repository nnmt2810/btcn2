import { useState } from "react"
import MovieCard from "../components/MovieCard"

const Home = ({ movies }) => {
    const [index, setIndex] = useState(0)

    const prev = () => {
        setIndex((prev) => (prev - 1))
    }

    const next = () => {
        setIndex((prev) => (prev + 1))
    }

    const movie = movies[index]

    return (
        <main className="relative flex items-center justify-center min-h-[70vh] bg-gray-100 dark:bg-gray-800">
            {index > 0 && (
                <button
                    onClick={prev}
                    className="absolute left-4 z-10 text-3xl"
                >
                    ◀
                </button>
            )}

            {movie && <MovieCard key={movie.id} movie={movie} big />}

            {index < 4 && (
                <button
                    onClick={next}
                    className="absolute right-4 z-10 text-3xl"
                >
                    ▶
                </button>
            )}
        </main>
    )
}

export default Home
