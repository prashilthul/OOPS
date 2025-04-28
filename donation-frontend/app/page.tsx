import HeroSection from "@/components/hero-section"
import CampaignCarousel from "@/components/campaign-carousel"
import CallToAction from "@/components/call-to-action"
import FeaturedCampaigns from "@/components/featured-campaigns"
import Testimonials from "@/components/testimonials"
import ImpactStats from "@/components/impact-stats"
// import CreateManager from "@/components/impact-stats"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* <CreateManager /> */}

      <HeroSection />
      <FeaturedCampaigns />
      <CampaignCarousel />
      <ImpactStats />
      <Testimonials />
      <CallToAction />
    </div>
  )
}
