import Image from "next/image";
import { reviews } from "@/lib/data";

export function Reviews() {
  return (
    <section id="reviews" className="mx-auto mt-16 max-w-6xl px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-cyan-300">Customers</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Loved by enthusiasts</h2>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.id} className="glass-panel rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <Image
                src={review.avatar}
                alt={review.user}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-white">{review.user}</p>
                <p className="text-xs text-gray-400">{new Date(review.createdAt).toDateString()}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-200">{review.comment}</p>
            <p className="mt-2 text-sm text-amber-300">{"★".repeat(review.rating)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
