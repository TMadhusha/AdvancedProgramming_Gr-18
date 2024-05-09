import React, { useState, useEffect } from 'react';

const ItemDetails = ({ itemId }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Fetch item data from backend based on itemId
    fetch(`http://localhost:8080/getproducts/${itemId}`) // Update the URL with your backend's address
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch item data');
        }
        return response.json();
      })
      .then(data => setItem(data))
      .catch(error => console.error('Error fetching item data:', error));
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <img src={item.image} alt={item.name} />
      <p>Seller: {item.seller}</p>
      <p>Starting Price: {item.startingPrice}</p>
      <p>Terms and Conditions: {item.terms}</p>
      {/* Assuming biddingHistory is an array of objects */}
      <h3>Bidding History</h3>
      <ul>
        {item.biddingHistory.map((bid, index) => (
          <li key={index}>
            Bidder: {bid.bidder}, Amount: {bid.amount}, Time: {bid.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemDetails;
