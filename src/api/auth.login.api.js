export const login = async ({ username, password }) => {
  const token = import.meta.env.VITE_APP_TOKEN

  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-token": token,
    },
    body: JSON.stringify({ username, password }),
  })

  const text = await res.text()

  console.log("Status:", res.status)
  console.log("Response:", text)

  if (!res.ok) {
    throw new Error("Login failed")
  }

  return JSON.parse(text)
}

