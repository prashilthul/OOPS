from abc import ABC, abstractmethod
import uuid#to make unique id for everything
from datetime import datetime
from typing import List

# Abstract base class demonstrating Abstraction
class User(ABC):
    def __init__(self, name: str, email: str) -> None:
        self.id = str(uuid.uuid4())
        self._name = name  # Encapsulation with protected attribute
        self._email = email
        
    @property # Used so i won't need getter method and setter method
    def name(self) -> str:
        return self._name
    
    @property
    def email(self) -> str:
        return self._email
    
    @abstractmethod
    def get_role(self) -> str:
        pass

# Inheritance from user
class Donor(User):
    def __init__(self, name: str, email: str) -> None:
        super().__init__(name, email)
        self.__donations_list: List[Donation] = []  # encapsulation with private attribute
        self.__total_donations = 0.0
    
    def get_role(self) -> str:
        return "donor"

    def make_donation(self, amount: float, campaign: 'FundraisingCampaign') -> 'Donation':
        donation = Donation(self, amount, campaign)
        self.__donations_list.append(donation)
        self.__total_donations += amount
        campaign.add_donation(donation)
        return donation

    @property
    def donations(self) -> List['Donation']:
        return self.__donations_list.copy() #still encapsulation to not change the actual list
    

    @property
    def total_donations(self) -> float:
        return self.__total_donations

# Inheritance from User ye Polymorphism
class CampaignManager(User):
    def __init__(self, name: str, email: str) -> None:
        super().__init__(name, email)
        self.__campaigns: List[FundraisingCampaign] = []

    def get_role(self) -> str:
        return "manager"

    def create_campaign(self, name: str, target_amount: float) -> 'FundraisingCampaign':
        campaign = FundraisingCampaign(name, target_amount, self)
        self.__campaigns.append(campaign)
        return campaign

    @property
    def campaigns(self) -> List['FundraisingCampaign']:
        return self.__campaigns.copy()

class FundraisingCampaign:
    def __init__(self, campaign_name: str, target_amount: float, manager: CampaignManager) -> None:
        self.id = str(uuid.uuid4())
        self.__campaign_name = campaign_name
        self.__target_amount = target_amount
        self.__current_amount = 0.0
        self.__donations: List[Donation] = []
        self.__manager = manager
        self.__status = "active"

    @property
    def name(self) -> str:
        return self.__campaign_name

    @property
    def target_amount(self) -> float:
        return self.__target_amount

    @property
    def current_amount(self) -> float:
        return self.__current_amount

    @property
    def status(self) -> str:
        return self.__status

    @property
    def remaining_amount(self) -> float:
        return max(0, self.__target_amount - self.__current_amount)

    def add_donation(self, donation: 'Donation') -> None:
        self.__donations.append(donation)
        self.__current_amount += donation.amount
        if self.__current_amount >= self.__target_amount:
            self.__status = "completed"

class Donation:
    def __init__(self, donor: Donor, amount: float, campaign: FundraisingCampaign) -> None:
        self.id = str(uuid.uuid4())
        self.__donor = donor
        self.__amount = amount
        self.__campaign = campaign
        self.__date = datetime.now()

    @property
    def amount(self) -> float:
        return self.__amount

    @property
    def donor(self) -> Donor:
        return self.__donor

    @property
    def campaign(self) -> FundraisingCampaign:
        return self.__campaign

    @property
    def date(self) -> datetime:
        return self.__date
    @property
    def get_remaining_amount(self) -> float:
        return max(0, self.__campaign.target_amount - self.__campaign.current_amount)#just in case the target is filled


manager = CampaignManager(name = "John Doe", email = "EMAIL" )
print(manager.name, manager.email)
manager.create_campaign(name = "Campaign 1", target_amount = 1000000)
donor1 = Donor(name="donor1", email="donor1_email")
donor2  = Donor(name="donor2", email="donor2_email")
print(donor1.name,donor1.email)

donor1.make_donation(amount=10000, campaign=manager.campaigns[0])


print(manager.campaigns[0].current_amount)
print(manager.campaigns[0].remaining_amount)
print(donor1.donations[0].get_remaining_amount)