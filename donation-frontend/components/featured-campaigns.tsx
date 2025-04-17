import Link from "next/link"
import { Button } from "@/components/ui/button"
import { campaigns } from "@/lib/data"
import CampaignCard from "@/components/campaign-card"

export default function FeaturedCampaigns() {
  // Get featured campaigns (those with highest percentage funded)
  const featuredCampaigns = [...campaigns]
    .sort((a, b) => b.currentAmount / b.goal - a.currentAmount / a.goal)
    .slice(0, 3)

  return (
    <section className="container px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Featured Campaigns</h2>
          <p className="text-muted-foreground">Support these popular campaigns making a difference</p>
        </div>
        <Button variant="link" asChild className="p-0 h-auto font-medium">
          <Link href="/campaigns">View all campaigns →</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  )
}
