import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BidForm from './BidForm';

const BASE_URL = 'http://localhost:8080/api/biditems';

function BiddingPage() {
  const [itemId, setItemId] = useState(1); // Default item ID
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isAutomaticBid, setIsAutomaticBid] = useState(false); // Define isAutomaticBid
  const [maxBidAmount, setMaxBidAmount] = useState(''); // Define maxBidAmount
  const [bidAmount, setBidAmount] = useState(''); // Define bidAmount

  useEffect(() => {
    fetchItemDetails(itemId);
  }, [itemId]);

  const fetchItemDetails = async (itemId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${itemId}`);
      setItem(response.data);
    } catch (error) {
      setError('Failed to fetch item details');
    }
  };

  const handleBidSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/${itemId}/bid`, {
        amount: isAutomaticBid ? maxBidAmount : bidAmount,
        isAutomatic: isAutomaticBid
      });
      setSuccessMessage(response.data.message); // Update success message
      // Optionally, you can update the item details after successful bid
      fetchItemDetails(itemId);
    } catch (error) {
      console.error('Failed to place bid:', error);
    }
  };

  return (
    <div>
      <h1>Bidding System</h1>
      {error && <p>Error: {error}</p>}
      {item && (
        <div>
          <h2>{item.name}</h2>
          <p>Description: {item.description}</p>
          <p>Current Bid: {item.currentBid}</p>
          <p>Time Remaining: {item.timeRemaining}</p>
          <BidForm
            itemId={itemId}
            onSuccess={handleBidSubmit}
            // Pass necessary props to BidForm component
            isAutomaticBid={isAutomaticBid}
            setIsAutomaticBid={setIsAutomaticBid}
            maxBidAmount={maxBidAmount}
            setMaxBidAmount={setMaxBidAmount}
            bidAmount={bidAmount}
            setBidAmount={setBidAmount}
          />
        </div>
      )}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default BiddingPage;
