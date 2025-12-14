const BASE_URL = "https://34.124.214.214:2423"

export const getMovies = async () => {
  const res = await fetch(`${BASE_URL}/Movies/get_movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
    },
  })

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  return res.json()
}
