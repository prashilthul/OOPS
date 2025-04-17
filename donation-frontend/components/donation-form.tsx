"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Campaign } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { CheckCircle2, CreditCard } from "lucide-react"
import Image from "next/image"

interface DonationFormProps {
  campaign: Campaign
  onClose: () => void
}

export default function DonationForm({ campaign, onClose }: DonationFormProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [amount, setAmount] = useState<number>(25)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Payment details
  const [cardNumber, setCardNumber] = useState<string>("")
  const [cardName, setCardName] = useState<string>("")
  const [expiryDate, setExpiryDate] = useState<string>("")
  const [cvv, setCvv] = useState<string>("")

  const predefinedAmounts = [10, 25, 50, 100]

  const handleAmountSelect = (value: number) => {
    setAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value)
      setAmount(Number.parseFloat(value) || 0)
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 16) {
      // Format with spaces every 4 digits
      const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ")
      setCardNumber(formatted)
    }
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      // Format as MM/YY
      if (value.length > 2) {
        setExpiryDate(`${value.slice(0, 2)}/${value.slice(2)}`)
      } else {
        setExpiryDate(value)
      }
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 3) {
      setCvv(value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      setIsSubmitting(true)

      // Simulate payment processing
      setTimeout(() => {
        setIsSubmitting(false)
        setStep(4)
      }, 1500)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Make a Donation</DialogTitle>
              <DialogDescription>Support {campaign.title}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-4">
                <Label>Select an amount</Label>
                <div className="grid grid-cols-2 gap-3">
                  {predefinedAmounts.map((presetAmount) => (
                    <Button
                      key={presetAmount}
                      type="button"
                      variant={amount === presetAmount && customAmount === "" ? "default" : "outline"}
                      onClick={() => handleAmountSelect(presetAmount)}
                    >
                      {formatCurrency(presetAmount)}
                    </Button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-amount">Custom amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="custom-amount"
                      type="text"
                      placeholder="Enter amount"
                      className="pl-8"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={amount <= 0}>
                  Continue
                </Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Your Information</DialogTitle>
              <DialogDescription>
                Please provide your details to complete the donation of {formatCurrency(amount)}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isAnonymous}
                  disabled={isAnonymous}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a message of support"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <Label htmlFor="anonymous" className="text-sm font-normal">
                  Make this donation anonymous
                </Label>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit">Continue to Payment</Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>
                Complete your donation of {formatCurrency(amount)} to {campaign.title}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm">Payment Methods</p>
                <div className="flex gap-2">
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
                    alt="Visa"
                    width={32}
                    height={20}
                  />
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/196/196561.png"
                    alt="MasterCard"
                    width={32}
                    height={20}
                  />
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/196/196539.png"
                    alt="American Express"
                    width={32}
                    height={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <div className="relative">
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                  />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  placeholder="John Smith"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input
                    id="expiry-date"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" value={cvv} onChange={handleCvvChange} required />
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Donation Amount</span>
                  <span>{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span>{formatCurrency(amount * 0.03)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total</span>
                  <span>{formatCurrency(amount * 1.03)}</span>
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(2)} disabled={isSubmitting}>
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Complete Donation"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === 4 && (
          <>
            <DialogHeader>
              <DialogTitle>Thank You!</DialogTitle>
              <DialogDescription>Your donation has been successfully processed</DialogDescription>
            </DialogHeader>

            <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-xl font-semibold">{formatCurrency(amount)}</p>
                <p className="text-muted-foreground">has been donated to {campaign.title}</p>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                A receipt has been sent to your email. Thank you for your generosity and for making a difference!
              </p>
            </div>

            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
