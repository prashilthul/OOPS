import uuid

class Donation:
    def __init__(self, donor, amount):
        self.id = str(f"donation{uuid.uuid4()}")
        self.donor = donor
        self.amount = amount




class Donor:
    def __init__(self , name, email):
        self.id = str(f"user{uuid.uuid4()}")
        self.name = name
        self.email = email
        self.donations_list = []
        self.total_donations = 0
    def __str__(self):
        return f"Donor(Name: {self.name}, Email: {self.email}, Donations: {len(self.donations_list)}, Total: {self.total_donations})"
    
    def make_donation(self, amount):
        donation = Donation(self.name, amount)
        self.donations_list.append(donation)
        self.total_donations += amount
        return donation


