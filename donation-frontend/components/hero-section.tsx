import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Make a Difference Today
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of donors supporting causes that matter. Your contribution can change lives and
                communities around the world.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link href="/campaigns">Donate Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/campaigns">Browse Campaigns</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative h-8 w-8 rounded-full border-2 border-background overflow-hidden">
                    <Image
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? "women" : "men"}/${i * 10 + 5}.jpg`}
                      alt={`Donor ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">2,500+</span> people donated in the last 24 hours
              </p>
            </div>
          </div>
          <div className="relative lg:h-[500px] h-[300px] rounded-lg overflow-hidden">
            <Image
              src="https://picsum.photos/seed/givehope-hero/1200/800"
              alt="People helping each other"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
