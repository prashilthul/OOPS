import axios from "axios"
import { Donation, DonorStats, PaginatedResponse } from "@/types"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
})

export const donationService = {
  async getDonations(
    page: number = 1,
    pageSize: number = 10,
    filters?: { status?: string; startDate?: string; endDate?: string }
  ): Promise<PaginatedResponse<Donation>> {
    const response = await api.get("/api/donations", {
      params: {
        page,
        pageSize,
        ...filters,
      },
    })
    return response.data
  },

  async getDonorStats(donorEmail: string): Promise<DonorStats> {
    const response = await api.get(`/api/donors/${donorEmail}/stats`)
    return response.data
  },

  async getDonationById(id: string): Promise<Donation> {
    const response = await api.get(`/api/donations/${id}`)
    return response.data
  },
}