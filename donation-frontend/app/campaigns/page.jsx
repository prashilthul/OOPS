"use client"

import { useState, useEffect } from "react"
import CampaignCard from "@/components/campaign-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter } from "lucide-react"

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [progressFilter, setProgressFilter] = useState([0])
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  const categories = ["All", "Education", "Health", "Environment", "Disaster Relief", "Animals"]

  // Fetch campaigns from API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/campaigns")  // <-- your FastAPI backend URL
        const data = await response.json()
        CONSONSOLE.LOG("HH")
        setCampaigns(data)
      } catch (error) {
        console.error("Error fetching campaigns:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || campaign.category.toLowerCase() === selectedCategory.toLowerCase()

    const progress = (campaign.currentAmount / campaign.goal) * 100
    const matchesProgress = progress >= progressFilter[0]

    return matchesSearch && matchesCategory && matchesProgress
  })

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <p className="text-muted-foreground">Browse and support campaigns that matter to you</p>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search campaigns..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="md:w-auto w-full flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.toLowerCase()} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Progress</label>
              <div className="pt-4">
                <Slider value={progressFilter} onValueChange={setProgressFilter} max={100} step={10} />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>{progressFilter[0]}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setProgressFilter([0])
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Loading campaigns...</h3>
          </div>
        ) : filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No campaigns found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  )
}
