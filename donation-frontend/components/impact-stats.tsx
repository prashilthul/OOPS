export default function ImpactStats() {
  return (
    <section className="container px-4 md:px-6">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight">Our Impact</h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Together, we're making a real difference in communities worldwide
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <div className="bg-muted rounded-lg p-6 text-center">
          <p className="text-3xl font-bold">$2.5M+</p>
          <p className="text-sm text-muted-foreground mt-2">Total Donations</p>
        </div>
        <div className="bg-muted rounded-lg p-6 text-center">
          <p className="text-3xl font-bold">250+</p>
          <p className="text-sm text-muted-foreground mt-2">Campaigns Funded</p>
        </div>
        <div className="bg-muted rounded-lg p-6 text-center">
          <p className="text-3xl font-bold">10K+</p>
          <p className="text-sm text-muted-foreground mt-2">Donors</p>
        </div>
        <div className="bg-muted rounded-lg p-6 text-center">
          <p className="text-3xl font-bold">50+</p>
          <p className="text-sm text-muted-foreground mt-2">Countries Reached</p>
        </div>
      </div>
    </section>
  )
}
