// BidForm.jsx
import React, { useState } from 'react';

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
            const response = await fetch('http://localhost:8080/bid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, bidAmount: parseFloat(bidAmount) }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit bid');
            }
            await onSubmit(parseFloat(bidAmount));
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
            <button type="submit">Place Bid</button>
        </form>
    );
};

export default BidForm;
