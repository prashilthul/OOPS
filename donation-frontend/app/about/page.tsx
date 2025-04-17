import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Emma Rodriguez",
      role: "Founder & CEO",
      bio: "Emma founded GiveHope after 15 years in nonprofit management. She's passionate about connecting donors with impactful causes.",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Marcus Chen",
      role: "Chief Operations Officer",
      bio: "With a background in international development, Marcus oversees our global operations and partnership programs.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Sophia Williams",
      role: "Director of Campaigns",
      bio: "Sophia has helped launch over 500 successful fundraising campaigns and mentors new campaign creators.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "James Wilson",
      role: "Technology Director",
      bio: "James leads our tech team, ensuring the platform is secure, accessible, and easy to use for all our users.",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      name: "Aisha Patel",
      role: "Community Outreach Manager",
      bio: "Aisha builds relationships with community organizations and helps amplify the impact of grassroots campaigns.",
      image: "https://randomuser.me/api/portraits/women/54.jpg",
    },
    {
      name: "David Thompson",
      role: "Financial Director",
      bio: "David ensures transparency in all our financial operations and maximizes the impact of every donation.",
      image: "https://randomuser.me/api/portraits/men/33.jpg",
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">About GiveHope</h1>
        <p className="text-xl text-muted-foreground">
          We're on a mission to make giving easy, transparent, and impactful.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            GiveHope was founded in 2018 with a simple belief: giving should be easy, and every donation should make a
            real difference. What started as a small platform connecting local donors with community projects has grown
            into a global movement.
          </p>
          <p className="text-muted-foreground mb-4">
            Today, we've helped raise over $10 million for causes around the world, from disaster relief to education,
            environmental conservation to healthcare access. Behind every dollar is a person who cares, and a life
            that's changed.
          </p>
          <p className="text-muted-foreground">
            Our platform makes it simple to discover causes you care about, donate with confidence, and see the impact
            of your generosity.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/seed/givehope1/800/600"
            alt="GiveHope team meeting"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Mission & Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe in the power of collective generosity to transform communities and solve our biggest challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Transparency</h3>
            <p className="text-muted-foreground">
              We believe donors deserve to know exactly where their money goes. We provide detailed reporting and
              updates on every campaign.
            </p>
          </div>
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Accessibility</h3>
            <p className="text-muted-foreground">
              Giving should be for everyone. We make it easy to donate any amount and support causes you care about, no
              matter where you are.
            </p>
          </div>
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Impact</h3>
            <p className="text-muted-foreground">
              Every campaign on our platform is vetted for legitimacy and impact. We focus on sustainable solutions that
              create lasting change.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the passionate people behind GiveHope who work every day to connect donors with impactful causes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-64 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Whether you're looking to donate, start a campaign, or join our team, there are many ways to be part of the
          GiveHope community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/campaigns">Browse Campaigns</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
