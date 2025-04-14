from pydantic import BaseModel

class Listing(BaseModel):
    title: str
    description: str
    price: float
    location: str

listings = []
