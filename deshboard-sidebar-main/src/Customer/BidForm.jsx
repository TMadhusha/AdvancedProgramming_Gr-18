import React, { useState, useEffect } from 'react';

const BidForm = ({ currentPrice, productId, onSubmit }) => {
 
    const [bidAmount, setBidAmount] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validate bid amount
        if (isNaN(bidAmount) || parseFloat(bidAmount) <= currentPrice) {
            alert('Please enter a valid bid amount greater than the current price.');
            return;
        }
        // Submit bid
        try {
            await onSubmit(productId, bidAmount);
            setBidAmount('');
            console.log('Bid submitted successfully!');
        } catch (error) {
            console.error('Error submitting bid:', error.message);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Place Bid</h3>
            <p>Current Price: ${currentPrice}</p>
            <label htmlFor="bidAmount">Bid Amount:</label>
            <input
                type="number"
                id="bidAmount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
            />
            <button type="submitBid" className='submitBid'>Place Bid</button>
        </form>
    );
};

export default BidForm;
