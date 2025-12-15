import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../auth/AuthContext"

const Navbar = ({ onSearch }) => {
    const [term, setTerm] = useState("")
    const { user, logout } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const value = term.trim()
        if (!value) return
        if (onSearch) {
            onSearch({ q: value })
        }
    }

    return (
        <nav className=" bg-blue-100 shadow mt-2 mb-2 py-2">
            <div className="max-w-[1200px] h-8 mx-auto flex items-center justify-between gap-4 px-4 py-3">
                <Link
                    to="/"
                    className="rounded p-2 text-xl hover:bg-black transition"
                    aria-label="Home"
                >
                    🏠
                </Link>

                <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        className="rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-400 focus:ring-1 focus:ring-red-300"
                    />

                    <button 
                        type="submit"
                        className="rounded bg-gray-300 text-black px-4 py-2 hover:bg-blue-600 transition"
                    >
                        Search
                    </button>
                </form>

                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 font-semibold">
                        <span className="text-lg">👤</span>
                        <span>{user.username}</span>
                        </div>

                        <button
                        onClick={logout}
                        className="rounded bg-red-500 text-white px-3 py-2 text-sm font-semibold hover:bg-red-600 transition"
                        >
                        Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link
                        to="/login"
                        className="rounded bg-gray-800 text-white px-3 py-2 hover:bg-black transition text-sm font-semibold"
                        >
                        Login
                        </Link>
                        <Link
                        to="/register"
                        className="rounded bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition text-sm font-semibold"
                        >
                        Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
  )
}

export default Navbar