from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from database import listings, Listing

app = FastAPI()

class ListingIn(BaseModel):
    title: str
    description: str
    price: float
    location: str

@app.post("/listings/", response_model=Listing)
def create_listing(item: ListingIn):
    listing = Listing(**item.dict())
    listings.append(listing)
    return listing

@app.get("/listings/", response_model=List[Listing])
def get_listings(min_price: Optional[float] = None, max_price: Optional[float] = None, location: Optional[str] = None):
    result = listings
    if min_price is not None:
        result = [l for l in result if l.price >= min_price]
    if max_price is not None:
        result = [l for l in result if l.price <= max_price]
    if location:
        result = [l for l in result if l.location.lower() == location.lower()]
    return result

@app.get("/listings/{listing_id}", response_model=Listing)
def get_listing(listing_id: int):
    if 0 <= listing_id < len(listings):
        return listings[listing_id]
    raise HTTPException(status_code=404, detail="Listing not found")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React runs here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


