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
    const [error, setError] = useState(null);
    const [cus_id, setCustomerIdFilter] = useState('');
  
    useEffect(() => {
        fetchBids();
    }, []);

    const fetchBids = async () => {
        try {
            let apiUrl = 'http://localhost:8080/bids';
          
            if (cus_id) {
                apiUrl += 'http://localhost:8080/customer/${cus_id}';
            }
            const response = await fetch(apiUrl);
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

    const handleFilterChange = (event) => {
        setCustomerIdFilter(event.target.value);
    };

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
