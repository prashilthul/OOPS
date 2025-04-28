import streamlit as st
import defined__classes as dc
from typing import List, Optional
from datetime import datetime

# Initialize session state for in-memory storage if not exists
if "donors" not in st.session_state:
    st.session_state.donors: List[dc.Donor] = []
if "managers" not in st.session_state:
    st.session_state.managers: List[dc.CampaignManager] = []
if "campaigns" not in st.session_state:
    st.session_state.campaigns: List[dc.FundraisingCampaign] = []

# Set page config
st.set_page_config(
    page_title="Fundraising Campaign Manager", page_icon="💰", layout="wide"
)

st.sidebar.title("Navigation")
page = st.sidebar.selectbox(
    "Choose a page", ["Home", "Donors", "Managers", "Campaigns", "Donations"]
)

if page == "Home":
    st.title("Fundraising Campaign Manager")
    st.write("Welcome to the Fundraising Campaign Management System!")

    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total Donors", len(st.session_state.donors))
    with col2:
        st.metric("Total Campaigns", len(st.session_state.campaigns))
    with col3:
        total_donations = sum(
            campaign.current_amount for campaign in st.session_state.campaigns
        )
        st.metric("Total Donations", f"${total_donations:,.2f}")

elif page == "Donors":
    st.title("Donor Management")

    with st.form("new_donor"):
        st.subheader("Add New Donor")
        donor_name = st.text_input("Donor Name")
        donor_email = st.text_input("Donor Email")
        submit_donor = st.form_submit_button("Add Donor")

        if submit_donor and donor_name and donor_email:
            new_donor = dc.Donor(donor_name, donor_email)
            st.session_state.donors.append(new_donor)
            st.success(f"Donor {donor_name} added successfully!")

    st.subheader("Existing Donors")
    if st.session_state.donors:
        for donor in st.session_state.donors:
            with st.expander(f"Donor: {donor.name}"):
                st.write(f"Email: {donor.email}")
                st.write(f"Total Donations: ${donor.total_donations:,.2f}")
                if donor.donations:
                    st.write("Donation History:")
                    for donation in donor.donations:
                        st.write(
                            f"- ${donation.amount:,.2f} to {donation.campaign.name} on {donation.date}"
                        )

elif page == "Managers":
    st.title("Campaign Manager Management")

    with st.form("new_manager"):
        st.subheader("Add New Manager")
        manager_name = st.text_input("Manager Name")
        manager_email = st.text_input("Manager Email")
        submit_manager = st.form_submit_button("Add Manager")

        if submit_manager and manager_name and manager_email:
            new_manager = dc.CampaignManager(manager_name, manager_email)
            st.session_state.managers.append(new_manager)
            st.success(f"Manager {manager_name} added successfully!")

    st.subheader("Existing Managers")
    if st.session_state.managers:
        for manager in st.session_state.managers:
            with st.expander(f"Manager: {manager.name}"):
                st.write(f"Email: {manager.email}")
                st.write("Campaigns:")
                for campaign in manager.campaigns:
                    st.write(f"- {campaign.name}")
                    st.write(f"Target: ${campaign.target_amount:,.2f}")
                    st.write(f"Current: ${campaign.current_amount:,.2f}")
                    progress = min(
                        campaign.current_amount / campaign.target_amount, 1.0
                    )  # Cap progress at 1.0
                    st.progress(progress)  # Progress bar for campaign donations

elif page == "Campaigns":
    st.title("Campaign Management")

    with st.form("new_campaign"):
        st.subheader("Create New Campaign")
        campaign_name = st.text_input("Campaign Name")
        target_amount = st.number_input("Target Amount", min_value=0.0, step=100.0)
        manager_email = st.selectbox(
            "Select Manager",
            options=[m.email for m in st.session_state.managers],
            format_func=lambda x: next(
                m.name for m in st.session_state.managers if m.email == x
            ),
        )
        submit_campaign = st.form_submit_button("Create Campaign")

        if submit_campaign and campaign_name and target_amount and manager_email:
            manager = next(
                m for m in st.session_state.managers if m.email == manager_email
            )
            new_campaign = manager.create_campaign(campaign_name, target_amount)
            st.session_state.campaigns.append(new_campaign)
            st.success(f"Campaign {campaign_name} created successfully!")

    st.subheader("Active Campaigns")
    if st.session_state.campaigns:
        for campaign in st.session_state.campaigns:
            with st.expander(f"Campaign: {campaign.name}"):
                progress = min(campaign.current_amount / campaign.target_amount, 1.0)
                st.progress(progress)
                st.write(f"Target: ${campaign.target_amount:,.2f}")
                st.write(f"Current: ${campaign.current_amount:,.2f}")
                st.write(f"Status: {campaign.status}")

                if campaign.status != "Ended":
                    if st.button(
                        f"End Campaign: {campaign.name}", key=f"end_{campaign.name}"
                    ):
                        try:
                            campaign._FundraisingCampaign__status = "Ended"
                            st.success(f"Campaign {campaign.name} has been ended.")
                        except ValueError as e:
                            st.error(f"Error: {e}")

elif page == "Donations":
    st.title("Make a Donation")

    with st.form("new_donation"):
        st.subheader("Make New Donation")
        donor_email = st.selectbox(
            "Select Donor",
            options=[d.email for d in st.session_state.donors],
            format_func=lambda x: next(
                d.name for d in st.session_state.donors if d.email == x
            ),
        )
        campaign_id = st.selectbox(
            "Select Campaign",
            options=[c.id for c in st.session_state.campaigns],
            format_func=lambda x: next(
                c.name for c in st.session_state.campaigns if c.id == x
            ),
        )
        amount = st.number_input("Donation Amount", min_value=0.0, step=10.0)
        submit_donation = st.form_submit_button("Make Donation")

        if submit_donation and donor_email and campaign_id and amount:
            donor = next(d for d in st.session_state.donors if d.email == donor_email)
            campaign = next(
                c for c in st.session_state.campaigns if c.id == campaign_id
            )
            new_donation = donor.make_donation(amount, campaign)
            st.success(f"Donation of ${amount:,.2f} made successfully!")

if __name__ == "__main__":
    st.sidebar.info("Fundraising Campaign Management System")
