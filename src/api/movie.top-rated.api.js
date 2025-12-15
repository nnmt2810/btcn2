export const getMoviesTopRated = async () => {
  const token = import.meta.env.VITE_APP_TOKEN
  
  const res = await fetch("/api/movies/top-rated", {
    headers: {
      "x-app-token": token,
    },
  })

  const text = await res.text()

  console.log("Status:", res.status)
  console.log("Response:", text)

  if (!res.ok) {
    throw new Error("Fetch movies failed")
  }

  return JSON.parse(text)
}