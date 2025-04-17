import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ProgressBar from "@/components/progress-bar"
import { Clock, Users } from "lucide-react"
import { formatCurrency, calculateDaysLeft } from "@/lib/utils"
import type { Campaign } from "@/lib/types"

interface CampaignCardProps {
  campaign: Campaign
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.currentAmount / campaign.goal) * 100
  const daysLeft = calculateDaysLeft(campaign.deadline)

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <Link href={`/campaigns/${campaign.id}`} className="relative aspect-video">
        <Image
          src={campaign.image || "https://picsum.photos/seed/" + campaign.id + "/600/400"}
          alt={campaign.title}
          fill
          className="object-cover"
        />
        <Badge variant="secondary" className="absolute top-2 right-2">
          {campaign.category}
        </Badge>
      </Link>
      <CardContent className="flex-grow p-4">
        <Link href={`/campaigns/${campaign.id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 hover:underline">{campaign.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{campaign.description}</p>

        <div className="mt-4 space-y-2">
          <ProgressBar value={progress} />

          <div className="flex justify-between text-sm">
            <span className="font-medium">{formatCurrency(campaign.currentAmount)}</span>
            <span className="text-muted-foreground">of {formatCurrency(campaign.goal)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{campaign.donors} donors</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{daysLeft > 0 ? `${daysLeft} days left` : "Ended"}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
