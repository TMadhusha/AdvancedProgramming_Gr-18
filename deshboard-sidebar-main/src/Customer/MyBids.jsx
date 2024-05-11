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
                    //value={cus_id} 
                    //onChange={handleFilterChange}
                    className="customer-id-filter"
                />
               
            </div>
        </div>
        </div>
    );
}
