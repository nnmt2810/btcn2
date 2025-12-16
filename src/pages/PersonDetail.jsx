import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getPersonDetail } from "../api/person.detail.api"

const PersonDetail = () => {
  const { id } = useParams()

  const [person, setPerson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchPerson = async () => {
      try {
        setLoading(true)
        const res = await getPersonDetail(id)
        setPerson(res?.data ?? res)
      } catch (err) {
        setError(err.message || "Lỗi tải diễn viên")
      } finally {
        setLoading(false)
      }
    }

    fetchPerson()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Đang tải thông tin diễn viên...</p>
      </main>
    )
  }

  if (error || !person) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold">Không tìm thấy diễn viên</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Quay lại trang chủ
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow w-full md:w-[260px] shrink-0">
            <img
              src={person.image}
              alt={person.name}
              className="w-full object-cover rounded-xl"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{person.name}</h1>
            {person.role && <p className="text-gray-500">{person.role}</p>}

            <div className="space-y-1">
              {person.birth_date && <p><strong>Sinh:</strong> {person.birth_date}</p>}
              {person.death_date && <p><strong>Mất:</strong> {person.death_date}</p>}
              {person.height && <p><strong>Chiều cao:</strong> {person.height}</p>}
            </div>

            <section>
              <h2 className="text-lg font-semibold mb-2">Tiểu sử</h2>
              <p className="leading-relaxed">
                {person.summary || "Chưa có thông tin."}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PersonDetail
