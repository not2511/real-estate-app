// src/App.js
import React, { useEffect, useState } from 'react';
import ListingForm from './components/ListingForm';
import Listings from './components/Listings';

function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/listings/')
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);

  const handleAddListing = (newListing) => {
    setListings((prev) => [...prev, newListing]);
  };

  return (
    <div>
      <h1>Real Estate Listings</h1>
      <ListingForm onAdd={handleAddListing} />
      <Listings listings={listings} />
    </div>
  );
}

export default App;
