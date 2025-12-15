import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { register } from "../api/auth.register.api"

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!form.username || !form.email || !form.password || !form.confirm || !form.phone) {
      setError("Vui lòng điền đầy đủ thông tin.")
      return
    }
    if (form.password !== form.confirm) {
      setError("Mật khẩu xác nhận không khớp.")
      return
    }

    try {
      setLoading(true)
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
        phone: form.phone,
      })
      navigate("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Đăng ký</h1>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={onChange}
              className="w-full rounded border border-gray-300 dark:border-gray-700 px-3 py-2 bg-transparent outline-none focus:border-gray-400 focus:ring-1 focus:ring-red-300"
              placeholder="username"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full rounded border border-gray-300 dark:border-gray-700 px-3 py-2 bg-transparent outline-none focus:border-gray-400 focus:ring-1 focus:ring-red-300"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              className="w-full rounded border border-gray-300 dark:border-gray-700 px-3 py-2 bg-transparent outline-none focus:border-gray-400 focus:ring-1 focus:ring-red-300"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={onChange}
              className="w-full rounded border border-gray-300 dark:border-gray-700 px-3 py-2 bg-transparent outline-none focus:border-gray-400 focus:ring-1 focus:ring-red-300"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={onChange}
              className="w-full rounded border border-gray-300 dark:border-gray-700 px-3 py-2 bg-transparent outline-none focus:border-gray-400 focus:ring-1 focus:ring-red-300"
              placeholder="0123xxxxxx"
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Đã có tài khoản?{" "}
          <Link to="/" className="text-blue-600 dark:text-blue-300 hover:underline">
            Về trang chủ
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Register