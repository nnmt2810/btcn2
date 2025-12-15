export const searchMovies = async ({ q, title, genre, person } = {}) => {
  const token = import.meta.env.VITE_APP_TOKEN

  const params = new URLSearchParams()
  if (q) params.append("q", q)
  if (title) params.append("title", title)
  if (genre) params.append("genre", genre)
  if (person) params.append("person", person)

  const query = params.toString()
  const res = await fetch(`/api/movies/search${query ? `?${query}` : ""}`, {
    headers: {
      "x-app-token": token,
    },
  })

  const text = await res.text()

  console.log("Status:", res.status)
  console.log("Response:", text)

  if (!res.ok) {
    throw new Error("Search movies failed")
  }

  return JSON.parse(text)
}


