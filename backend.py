from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import defined__classes as dc

app = FastAPI()

# Data Models
class DonorRequest(BaseModel):
    name: str
    email: str

class CampaignRequest(BaseModel):
    name: str
    target_amount: float
    manager_email: str

class DonationRequest(BaseModel):
    donor_email: str
    campaign_id: str
    amount: float

# In-memory storage
donors: List[dc.Donor] = []
managers: List[dc.CampaignManager] = []
campaigns: List[dc.FundraisingCampaign] = []

# API Routes
@app.post('/api/donors')
async def create_donor(donor: DonorRequest):
    new_donor = dc.Donor(donor.name, donor.email)
    donors.append(new_donor)
    return {"id": new_donor.id, "name": new_donor.name, "email": new_donor.email}  # Changed _id to id

@app.post('/api/managers')
async def create_manager(manager: DonorRequest):
    new_manager = dc.CampaignManager(manager.name, manager.email)
    managers.append(new_manager)
    return {"id": new_manager.id, "name": new_manager.name, "email": new_manager.email}  # Changed _id to id

@app.post('/api/campaigns')
async def create_campaign(campaign: CampaignRequest):
    manager = next((m for m in managers if m.email == campaign.manager_email), None)
    if not manager:
        raise HTTPException(status_code=404, detail="Manager not found")
    
    new_campaign = manager.create_campaign(campaign.name, campaign.target_amount)
    campaigns.append(new_campaign)
    return {
        "id": new_campaign.id,
        "name": new_campaign.name,
        "target_amount": new_campaign.target_amount,
        "current_amount": new_campaign.current_amount,
        "status": new_campaign.status
    }

@app.post('/api/donations')
async def create_donation(donation: DonationRequest):
    donor = next((d for d in donors if d.email == donation.donor_email), None)
    if not donor:
        raise HTTPException(status_code=404, detail="Donor not found")

    campaign = next((c for c in campaigns if c.id == donation.campaign_id), None)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    new_donation = donor.make_donation(donation.amount, campaign)
    return {
        "id": new_donation.id,
        "amount": new_donation.amount,
        "campaign": new_donation.campaign.name,
        "donor": new_donation.donor.name,
        "date": new_donation.date
    }

@app.get('/api/campaigns')
async def get_campaigns(status: Optional[str] = None):
    result = campaigns
    if status:
        result = [c for c in campaigns if c.status == status]
    return [{
        "id": c.id,
        "name": c.name,
        "target_amount": c.target_amount,
        "current_amount": c.current_amount,
        "status": c.status
    } for c in result]

@app.get('/api/donors/{donor_email}/donations')
async def get_donor_donations(donor_email: str):
    donor = next((d for d in donors if d.email == donor_email), None)
    if not donor:
        raise HTTPException(status_code=404, detail="Donor not found")
    
    donations = donor.donations  
    return [{
        "id": d.id,
        "amount": d.amount,
        "campaign": d.campaign.name,
        "date": d.date
    } for d in donations]

@app.get('/api/system/dump')
async def get_system_data():
    return {
        "managers": [{
            "id": m.id,
            "name": m.name,
            "email": m.email,
            "role": m.get_role(),
            "campaigns": [{
                "id": c.id,
                "name": c.name,
                "target_amount": c.target_amount,
                "current_amount": c.current_amount,
                "status": c.status,
                "remaining_amount": c.remaining_amount
            } for c in m.campaigns]
        } for m in managers],
        
        "donors": [{
            "id": d.id,
            "name": d.name,
            "email": d.email,
            "role": d.get_role(),
            "total_donations": d.total_donations,
            "donations": [{
                "id": don.id,
                "amount": don.amount,
                "campaign_name": don.campaign.name,
                "date": don.date
            } for don in d.donations]
        } for d in donors],
        
        "campaigns": [{
            "id": c.id,
            "name": c.name,
            "target_amount": c.target_amount,
            "current_amount": c.current_amount,
            "status": c.status,
            "remaining_amount": c.remaining_amount
        } for c in campaigns]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)