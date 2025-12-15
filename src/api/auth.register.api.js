export const register = async ({ username, email, password, phone }) => {
  const token = import.meta.env.VITE_APP_TOKEN

  const res = await fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-token": token,
    },
    body: JSON.stringify({ username, email, password, phone }),
  })

  const text = await res.text()

  console.log("Status:", res.status)
  console.log("Response:", text)

  if (!res.ok) {
    throw new Error("Register failed")
  }

  return JSON.parse(text)
}

