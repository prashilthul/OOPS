"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Image from "next/image"

export default function SubscribePage() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const interestOptions = [
    { id: "education", label: "Education" },
    { id: "health", label: "Health & Medical" },
    { id: "environment", label: "Environment" },
    { id: "animals", label: "Animal Welfare" },
    { id: "disaster", label: "Disaster Relief" },
    { id: "community", label: "Community Development" },
  ]

  const handleInterestChange = (id: string, checked: boolean) => {
    if (checked) {
      setInterests([...interests, id])
    } else {
      setInterests(interests.filter((item) => item !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Stay Connected</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Subscribe to our newsletter to receive updates on new campaigns, success stories, and ways to make an
            impact.
          </p>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
            <Image
              src="https://picsum.photos/seed/newsletter/800/600"
              alt="People collaborating on community project"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Why Subscribe?</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Discover new campaigns that align with your interests</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Get updates on campaigns you've supported</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Learn about the impact of donations in communities</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Receive tips on effective fundraising and giving</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Be the first to know about special events and opportunities</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          {!isSuccess ? (
            <Card>
              <CardHeader>
                <CardTitle>Subscribe to Our Newsletter</CardTitle>
                <CardDescription>Join thousands of donors and campaign creators receiving our updates.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <div className="space-y-3">
                    <Label>I'm interested in (optional)</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {interestOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={interests.includes(option.id)}
                            onCheckedChange={(checked) => handleInterestChange(option.id, checked as boolean)}
                          />
                          <Label htmlFor={option.id} className="font-normal">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="terms" className="font-normal text-sm">
                        I agree to receive email newsletters from GiveHope. You can unsubscribe at any time.
                      </Label>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Subscription Confirmed!</CardTitle>
                <CardDescription>You've successfully subscribed to our newsletter.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center text-center py-6 space-y-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-lg font-medium">Thank you for subscribing, {firstName || "there"}!</p>
                <p className="text-muted-foreground">
                  We've sent a confirmation email to {email || "your email address"}. You'll start receiving our
                  newsletter with updates on campaigns and impact stories.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" onClick={() => setIsSuccess(false)}>
                  Back to Form
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
