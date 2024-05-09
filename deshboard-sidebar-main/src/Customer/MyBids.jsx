import React, { useState, useEffect } from 'react';
import Customerbar from './Customerbar';

export default function MyBids() {
    const [bids, setBids] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBids();
    }, []);

    const fetchBids = async () => {
        try {
            const response = await fetch('http://localhost:8080/bids');
            if (!response.ok) {
                throw new Error('Failed to fetch bid data');
            }
            const data = await response.json();
            setBids(data);
        } catch (error) {
            console.error('Error fetching bid data:', error);
            setError('Failed to fetch bid data. Please try again later.');
        }
    };

    return (
        <div className="my-bids-container"> {/* Apply a container class */}
            <Customerbar />
            <div className="my-bids-content"> {/* Apply a content class */}
                <h2 className="my-bids-heading">My Bids</h2> {/* Apply a heading class */}
                {error && <p className="error-message">{error}</p>} {/* Apply a class for error messages */}
                <ul className="bid-list"> {/* Apply a class for the list of bids */}
                    {bids.map((bid) => (
                        <li key={bid.bid_id} className="bid-item"> {/* Apply a class for each bid item */}
                            <p className="bid-id">Bid ID: {bid.bid_id}</p> {/* Apply a class for bid ID */}
                            <p className="bid-price">Bid Price: {bid.bidPrice}</p> {/* Apply a class for bid price */}
                            <p className="current-price">Current Price: {bid.currentPrice}</p> {/* Apply a class for current price */}
                            <p className="bid-date">Date: {bid.date}</p> 
                            <p className="bid-date">Customer ID: {bid.customer.cus_id}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
