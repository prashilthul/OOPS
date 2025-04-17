import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { testimonials } from "@/lib/data"

export default function Testimonials() {
  return (
    <section className="container px-4 md:px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight">What Our Donors Say</h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Hear from people who have made a difference through our platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={
                      testimonial.avatar ||
                      `https://randomuser.me/api/portraits/${index % 2 === 0 ? "women" : "men"}/${(index + 1) * 10}.jpg`
                    }
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`h-5 w-5 ${star <= testimonial.rating ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
