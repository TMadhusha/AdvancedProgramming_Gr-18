import React, { useState, useEffect } from 'react';
import Customerbar from './Customerbar';

export default function MyBids() {
    //storing the username
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Retrieve username from sessionStorage
        const storedUserName = sessionStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

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
        <Customerbar userName={userName}/>
        <div className="my-bids-container"> {/* Apply a container class */}
            <div className="my-bids-content"> {/* Apply a content class */}
                <h2 className="my-bids-heading">My Bids</h2> {/* Apply a heading class */}
                {/* Input field for filtering by Customer ID */}
                <input 
                    type="text" 
                    placeholder="Enter Customer ID" 
                    value={cus_id} 
                    onChange={handleFilterChange}
                    className="customer-id-filter"
                />
                {error && <p className="my-bids-error-message">{error}</p>} {/* Apply a class for error messages */}
                <ul className="my-bids-list"> {/* Apply a class for the list of bids */}
                    {bids.map((bid) => (
                        <li key={bid.bid_id} className="my-bids-item"> {/* Apply a class for each bid item */}
                            <p className="my-bids-bid-id">Bid ID: {bid.bid_id}</p> {/* Apply a class for bid ID */}
                            <p className="my-bids-bid-price">Bid Price: {bid.bidPrice}</p> {/* Apply a class for bid price */}
                            <p className="my-bids-current-price">Current Price: {bid.currentPrice}</p> {/* Apply a class for current price */}
                            <p className="my-bids-bid-date">Date: {bid.date}</p> 
                            <p className="my-bids-customer-id">Customer ID: {bid.customer.cus_id}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </div>
    );
}
