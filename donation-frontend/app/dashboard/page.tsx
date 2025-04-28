"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, DollarSign, Award, Clock } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import { Donation, DonorStats, PaginatedResponse } from "@/types"
import { donationService } from "@/services/api"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { DateRangePicker } from "@/components/ui/date-range-picker"

export default function DonorDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [donations, setDonations] = useState<PaginatedResponse<Donation>>()
  const [stats, setStats] = useState<DonorStats>()
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: searchParams.get("status") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  })
  const page = parseInt(searchParams.get("page") || "1")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [donationsData, statsData] = await Promise.all([
          donationService.getDonations(page, 10, filters),
          donationService.getDonorStats("current-user@example.com"), // Replace with actual user email
        ])
        setDonations(donationsData)
        setStats(statsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, filters])

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    router.push(`/dashboard?page=1&${new URLSearchParams(newFilters).toString()}`)
  }

  if (loading) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">My Donations</h1>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.totalDonated.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime contributions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaigns Supported</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.campaignsSupported}</div>
            <p className="text-xs text-muted-foreground">Total campaigns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.impactScore}</div>
            <p className="text-xs text-muted-foreground">Your giving impact</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Donation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.lastDonation ? format(new Date(stats.lastDonation), "MMM d, yyyy") : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Most recent gift</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange({ ...filters, status: value })}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <DateRangePicker
          startDate={filters.startDate ? new Date(filters.startDate) : null}
          endDate={filters.endDate ? new Date(filters.endDate) : null}
          onDateChange={(start, end) =>
            handleFilterChange({
              ...filters,
              startDate: start?.toISOString() || "",
              endDate: end?.toISOString() || "",
            })
          }
        />
      </div>

      {/* Donation List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Donation History</h2>
        <div className="grid gap-4">
          {donations?.data.map((donation) => (
            <Card key={donation.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                  <Image
                    src={`/campaign-images/${donation.campaignId}.jpg`}
                    alt={donation.campaignTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{donation.campaignTitle}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(donation.date), "PPP")}
                    </span>
                    <span className="text-sm font-medium">${donation.amount.toFixed(2)}</span>
                    <span
                      className={`text-sm ${
                        donation.status === "completed" ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                    </span>
                  </div>
                  {donation.message && (
                    <p className="text-sm text-muted-foreground mt-2">"{donation.message}"</p>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push(`/campaigns/${donation.campaignId}`)}>
                  View Campaign
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {donations && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/dashboard?page=${page - 1}&${new URLSearchParams(filters).toString()}`}
                  onClick={(e) => {
                    e.preventDefault()
                    if (page > 1) {
                      router.push(`/dashboard?page=${page - 1}&${new URLSearchParams(filters).toString()}`)
                    }
                  }}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: donations.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={`/dashboard?page=${pageNum}&${new URLSearchParams(filters).toString()}`}
                    onClick={(e) => {
                      e.preventDefault()
                      router.push(`/dashboard?page=${pageNum}&${new URLSearchParams(filters).toString()}`)
                    }}
                    isActive={pageNum === page}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href={`/dashboard?page=${page + 1}&${new URLSearchParams(filters).toString()}`}
                  onClick={(e) => {
                    e.preventDefault()
                    if (page < donations.totalPages) {
                      router.push(`/dashboard?page=${page + 1}&${new URLSearchParams(filters).toString()}`)
                    }
                  }}
                  className={page >= donations.totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}