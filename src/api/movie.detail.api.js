export const getMovieDetail = async (id) => {
  const token = import.meta.env.VITE_APP_TOKEN

  const res = await fetch(`/api/movies/${id}`, {
    headers: {
      "x-app-token": token,
    },
  })

  const text = await res.text()

  console.log("Status:", res.status)
  console.log("Response:", text)

  if (!res.ok) {
    throw new Error("Fetch movie detail failed")
  }

  return JSON.parse(text)
}