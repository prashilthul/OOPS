export interface Campaign {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  category: string
  goal: number
  currentAmount: number
  startDate: string
  deadline: string
  organizer: string
  donors: number
}

export interface Testimonial {
  name: string
  title: string
  quote: string
  avatar?: string
  rating: number
}
