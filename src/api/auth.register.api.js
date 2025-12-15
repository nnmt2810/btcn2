export const register = async ({ name, email, password }) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })

  const text = await res.text()

  console.log("Status:", res.status)
  console.log("Response:", text)

  if (!res.ok) {
    throw new Error("Register failed")
  }

  return JSON.parse(text)
}

