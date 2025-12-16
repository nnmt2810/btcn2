import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const parsePeople = (items = []) => {
  if (!Array.isArray(items)) return [];

  return items.map((item) => {
    if (typeof item === "string") {
      return { name: item };
    }

    return {
      id: item.id,
      name: item.name || item.title || "Unknown",
      role: item.role || item.character || null,
    };
  });
};

const MovieDetail = ({
  movies = [],
  topRatedMovies = [],
  reviews = [],
  reviewsError = null,
}) => {
  const { id } = useParams();

  const movie = useMemo(() => {
    const allMovies = [...movies, ...topRatedMovies];
    return allMovies.find((item) => String(item.id) === id);
  }, [id, movies, topRatedMovies]);

  if (!movie) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold">Không tìm thấy phim</p>
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-300 hover:underline"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </main>
    );
  }

  const actorList = parsePeople(movie.actors, "actor");
  const directorList = parsePeople(movie.directors, "director");

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-300 hover:underline font-semibold"
        >
          ← Quay lại trang chủ
        </Link>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden w-full md:w-[260px] shrink-0">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full object-cover"
            />
          </div>

          <div className="space-y-4 flex-1">
            <header className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {movie.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Năm phát hành: {movie.year}
              </p>
            </header>

            <section>
              <h2 className="text-lg font-semibold mb-2">Nội dung</h2>
              {/* Đã test để lấy short_description nhưng API không trả về dữ liệu của short_description */}
              {movie.short_description ||
                movie.plot_full ||
                "Không có nội dung."}
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Thể loại</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.length ? (
                  movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full"
                    >
                      {genre}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">
                    Chưa có thông tin thể loại.
                  </p>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Diễn viên</h2>

              {actorList.length ? (
                <ul className="list-disc list-inside space-y-1">
                  {actorList.map((actor, idx) => (
                    <li key={actor.id ?? idx}>
                      {actor.id ? (
                        <Link
                          to={`/person/${actor.id}`}
                          className="text-blue-600 dark:text-blue-300 hover:underline"
                        >
                          {actor.name}
                        </Link>
                      ) : (
                        <span>{actor.name}</span>
                      )}

                      {actor.role && (
                        <span className="text-gray-500"> — {actor.role}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  Chưa có thông tin diễn viên.
                </p>
              )}
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Đạo diễn</h2>

              {directorList.length ? (
                <ul className="list-disc list-inside space-y-1">
                  {directorList.map((director, idx) => (
                    <li key={director.id ?? idx}>
                      {director.id ? (
                        <Link
                          to={`/person/${director.id}`}
                          className="text-blue-600 dark:text-blue-300 hover:underline"
                        >
                          {director.name}
                        </Link>
                      ) : (
                        <span>{director.name}</span>
                      )}

                      {director.role && (
                        <span className="text-gray-500">
                          {" "}
                          — {director.role}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  Chưa có thông tin đạo diễn.
                </p>
              )}
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Đánh giá</h2>
              {reviewsError && (
                <p className="text-red-500 text-sm mb-2">
                  Lỗi tải review: {reviewsError}
                </p>
              )}
              {reviews?.length ? (
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <div
                      key={review.id ?? `${review.username}-${review.date}`}
                      className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900"
                    >
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {review.title}
                        </div>
                        <div className="text-sm text-yellow-500 font-semibold">
                          ★ {review.rate ?? "N/A"}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {review.username} •{" "}
                        {new Date(review.date).toLocaleDateString()}
                        {review.warning_spoilers ? " • Spoiler" : ""}
                      </p>
                      <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                        {review.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  Chưa có đánh giá.
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetail;
