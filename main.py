import uuid
from datetime import datetime
from typing import List


## no inheritence nad hence no polymorphism just yet ##

class FundraisingCampaign:

    def __init__(self, campaign_name: str, target_amount: float) -> None:
        self.campaign_name = campaign_name
        self.target_amount = target_amount
        self.current_amount = 0.0
        self.donations: List[Donation] = []

    def add_donation(self, donation: "Donation") -> None:

        self.donations.append(donation)
        self.current_amount += donation.amount
        
    def show_donation(self) -> None:
            print(f"Campaign Donations:{'-'*50}")
            for donation in self.donations:
                print(donation)
            
    def __str__(self) -> str:
        return (f"\n{'='*50}\n"
                f"Campaign Information\n"
                f"{'-'*50}\n"
                f"Campaign(Name: {self.campaign_name}, Target: {self.target_amount}, "
                f"Current: {self.current_amount}, Donations: {len(self.donations)})\n"
                f"{'-'*50}")

class Donation:

    def __init__(self, donor: "Donor", amount: float, campaign: FundraisingCampaign) -> None:
        self.id = f"donation{uuid.uuid4()}"
        self.donor = donor
        self.amount = amount
        self.campaign = campaign
        self.date = datetime.now().strftime("%Y-%m-%d")  # strftime("%Y-%m-%d %H:%M:%S") 
    
    def __str__(self) -> str:
        return (f"  - Donation(ID: {self.id}, Donor: {self.donor.name}, Amount: {self.amount}, "
                f"Date: {self.date})")
        
        


class Donor:

    def __init__(self, name: str, email: str) -> None:
        self.id = f"user{uuid.uuid4()}"
        self.name = name
        self.email = email
        self.donations_list: List[Donation] = []
        self.total_donations = 0.0

    def make_donation(self, amount: float, campaign: FundraisingCampaign) -> Donation:

        donation = Donation(self, amount, campaign)
        self.donations_list.append(donation)
        self.total_donations += amount

        campaign.add_donation(donation)
        return donation

    def show_donations(self) -> str:
        donation_info = "\n    Donations for {self.name}:"
        for donation in self.donations_list:
            donation_info += f"\n{donation}"
        return donation_info

    def __str__(self) -> str:
        return (f"\n{'='*50}\n"
                f"Donor Information\n"
                f"{'-'*50}\n"
                f"Donor(Name: {self.name}, Email: {self.email}, Donations: {len(self.donations_list)}, "
                f"Total Donated: {self.total_donations})\n"
                f"{'-'*50}")


def main():
    campaign = FundraisingCampaign("First Campaign", 1000)

    donor1 = Donor("donor1", "donor1@example.com")
    donor2 = Donor("donor2", "donor2@example.com")

    donation1 = donor1.make_donation(150, campaign)
    donation2 = donor2.make_donation(200, campaign)
    donation3 = donor1.make_donation(50, campaign)

    print(donor1)
    print(donor1.show_donations())

    print(donor2)
    print(donor2.show_donations())

    print(campaign)
    campaign.show_donation()


if __name__ == "__main__":
    main()
