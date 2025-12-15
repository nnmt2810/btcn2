import { useState } from "react"

const Navbar = ({ onSearch }) => {
    const [term, setTerm] = useState("")

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
                <button
                    type="button"
                    className="rounded p-2 text-xl hover:bg-black transition"
                    aria-label="Home"
                >
                    🏠
                </button>

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
            </div>
        </nav>
  )
}

export default Navbar