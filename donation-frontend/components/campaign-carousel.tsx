"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { campaigns } from "@/lib/data"
import CampaignCard from "@/components/campaign-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CampaignCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth

      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Get urgent campaigns (those with less than 10 days left)
  const urgentCampaigns = campaigns
    .filter((campaign) => {
      const deadline = new Date(campaign.deadline)
      const today = new Date()
      const diffTime = deadline.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays < 10 && diffDays > 0
    })
    .slice(0, 6)

  return (
    <section className="py-12 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Urgent Campaigns</h2>
            <p className="text-muted-foreground">These campaigns are ending soon and need your support</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} aria-label="Scroll left">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} aria-label="Scroll right">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide" ref={carouselRef}>
          {urgentCampaigns.length > 0 ? (
            urgentCampaigns.map((campaign) => (
              <div key={campaign.id} className="min-w-[300px] md:min-w-[350px]">
                <CampaignCard campaign={campaign} />
              </div>
            ))
          ) : (
            <Card className="w-full">
              <CardContent className="p-6 text-center">
                <p>No urgent campaigns at the moment.</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-6 text-center">
          <Button asChild>
            <Link href="/campaigns">View All Campaigns</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
