// src/components/Listings.js
import React from 'react';

const Listings = ({ listings }) => {
  return (
    <div>
      <h2>All Listings</h2>
      {listings.map((listing) => (
        <div key={listing.id}>
          <h3>{listing.title}</h3>
          <p>{listing.description}</p>
          <p>💲{listing.price}</p>
          <p>📍{listing.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Listings;
