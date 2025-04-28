export interface Donation {
  id: string
  campaignId: string
  campaignTitle: string
  amount: number
  date: string
  status: "completed" | "pending"
  message?: string
}

export interface DonorStats {
  totalDonated: number
  campaignsSupported: number
  lastDonation: string
  impactScore: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}