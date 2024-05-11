import React, { useState, useEffect } from 'react';
import Customerbar from './Customerbar';

export default function MyBids() {
    // State to store the fetched bids
    const [bids, setBids] = useState([]);
    // State to handle loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch bids from backend
        const fetchBids = async () => {
            try {
                const response = await fetch('http://localhost:8080/bids');
                if (!response.ok) {
                    throw new Error('Failed to fetch bids');
                }
                const data = await response.json();
                setBids(data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching bids:', error);
            }
        };

        // Call fetchBids function when component mounts
        fetchBids();

        // Clean up function
        return () => {
            // Cleanup code (if any)
        };
    }, []);

    return (
        <div>
            <Customerbar />
            <div>
                <h2>My Bids</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {bids.map((bid) => (
                            <li key={bid.bid_id}>
                                <p>Product Name: {bid.inventory.name}</p>
                                <p>Bid Price: ${bid.bidPrice}</p>
                                <p>Date: {bid.date}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
