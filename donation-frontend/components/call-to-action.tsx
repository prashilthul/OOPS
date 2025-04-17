import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="container px-4 md:px-6">
      <div className="rounded-lg bg-muted p-8 md:p-10 lg:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative z-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Ready to make a difference?</h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              Join thousands of donors who are changing lives through their generosity. Every donation, no matter how
              small, contributes to creating a better world.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link href="/campaigns">Donate Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded-lg p-6 text-center">
              <p className="text-3xl font-bold">$2.5M+</p>
              <p className="text-sm text-muted-foreground mt-2">Raised for causes</p>
            </div>
            <div className="bg-background rounded-lg p-6 text-center">
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-sm text-muted-foreground mt-2">Donors worldwide</p>
            </div>
            <div className="bg-background rounded-lg p-6 text-center">
              <p className="text-3xl font-bold">250+</p>
              <p className="text-sm text-muted-foreground mt-2">Successful campaigns</p>
            </div>
            <div className="bg-background rounded-lg p-6 text-center">
              <p className="text-3xl font-bold">50+</p>
              <p className="text-sm text-muted-foreground mt-2">Countries reached</p>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>
    </section>
  )
}
