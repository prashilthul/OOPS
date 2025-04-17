"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { campaigns } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ProgressBar from "@/components/progress-bar"
import DonationForm from "@/components/donation-form"
import { Calendar, Users, Heart, Share2, Clock, ArrowLeft } from "lucide-react"
import { formatCurrency, calculateDaysLeft } from "@/lib/utils"

export default function CampaignDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showDonationForm, setShowDonationForm] = useState(false)

  const campaignId = typeof params.id === "string" ? params.id : ""
  const campaign = campaigns.find((c) => c.id === campaignId)

  if (!campaign) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Campaign not found</h1>
        <Button onClick={() => router.push("/campaigns")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Campaigns
        </Button>
      </div>
    )
  }

  const progress = (campaign.currentAmount / campaign.goal) * 100
  const daysLeft = calculateDaysLeft(campaign.deadline)

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/campaigns")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Campaigns
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image src={campaign.image || "/placeholder.svg"} alt={campaign.title} fill className="object-cover" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{campaign.title}</h1>
            <p className="text-muted-foreground mt-2">{campaign.category}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>{campaign.donors} donors</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>Started {new Date(campaign.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{daysLeft > 0 ? `${daysLeft} days left` : "Ended"}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">About this campaign</h2>
            <p>{campaign.description}</p>
            <p className="mt-4">{campaign.longDescription}</p>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="h-4 w-4" /> Save
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Progress</CardTitle>
              <CardDescription>Help us reach our goal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressBar value={progress} />

              <div className="flex justify-between">
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(campaign.currentAmount)}</p>
                  <p className="text-sm text-muted-foreground">raised of {formatCurrency(campaign.goal)}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{daysLeft}</p>
                  <p className="text-sm text-muted-foreground">days left</p>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full" size="lg" onClick={() => setShowDonationForm(true)}>
                  Donate Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Organizer</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=48&width=48" alt="Organizer" fill className="object-cover" />
              </div>
              <div>
                <p className="font-medium">{campaign.organizer}</p>
                <p className="text-sm text-muted-foreground">Campaign Creator</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Contact Organizer
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {showDonationForm && <DonationForm campaign={campaign} onClose={() => setShowDonationForm(false)} />}
    </div>
  )
}
