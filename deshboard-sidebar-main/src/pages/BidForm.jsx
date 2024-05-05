import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/biditems';

const BidForm = ({ itemId, onSuccess }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [isAutomaticBid, setIsAutomaticBid] = useState(false);
  const [maxBidAmount, setMaxBidAmount] = useState('');

  const handleBidSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/${itemId}/bid`, {
        amount: isAutomaticBid ? maxBidAmount : bidAmount,
        isAutomatic: isAutomaticBid
      });
      onSuccess(response.data.message);
    } catch (error) {
      console.error('Failed to place bid:', error);
    }
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          name="bidType"
          value="single"
          checked={!isAutomaticBid}
          onChange={() => setIsAutomaticBid(false)}
        />
        Single Bid
      </label>
      <label>
        <input
          type="radio"
          name="bidType"
          value="automatic"
          checked={isAutomaticBid}
          onChange={() => setIsAutomaticBid(true)}
        />
        Automatic Bid
      </label>
      {isAutomaticBid ? (
        <input
          type="number"
          value={maxBidAmount}
          onChange={(e) => setMaxBidAmount(e.target.value)}
          placeholder="Enter Maximum Bid Amount"
          required
        />
      ) : (
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter Bid Amount"
          required
        />
      )}
      <button onClick={handleBidSubmit}>Place Bid</button>
    </div>
  );
};

export default BidForm;
