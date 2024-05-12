import React, { useState, useEffect } from 'react';
import Customerbar from './Customerbar';
import axios from 'axios';

export default function MyBids() {
    // Storing the username
    const [userName, setUserName] = useState('');
    const [bids, setBids] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Retrieve username from sessionStorage
        const storedUserName = sessionStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }

        // Load bids and products data
        loadBids();
        fetchProducts();
    }, []);

    const loadBids = async () => {
        try {
            const result = await axios.get("http://localhost:8080/bids");
            setBids(result.data);
        } catch (error) {
            console.error('Error fetching bid data:', error);
            window.alert('Failed to fetch bid data. Please try again later.');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/inventory');
            if (!response.ok) {
                throw new Error('Failed to fetch product data');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
            window.alert('Failed to fetch product data. Please try again later.');
        }
    };

    return (
        <div>
            <div>
                <Customerbar userName={userName} />
            </div>
            <div>
                <h1>All bids</h1>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Bid ID</th>
                            <th>Product ID</th>
                            <th>Customer Name</th>
                            <th>Bid price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.filter(bid => bid.customer && bid.customer.userName === userName).map((bid, index) => (
                            <tr key={index}>
                                <td>{bid.bid_id}</td>
                                <td>{bid.inventory ? bid.inventory.pro_id : ''}</td>
                                <td>{userName}</td>
                                <td>{bid.bidPrice}</td>
                                <td>{bid.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
