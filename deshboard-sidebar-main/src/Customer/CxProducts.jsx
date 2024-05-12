import React, { useState, useEffect } from 'react';
import Customerbar from './Customerbar';
import BidForm from './BidForm';
import axios from 'axios';

export default function CxProducts() {
    //storing the username
  const [userName, setUserName] = useState('');
  const [cus_id, setCustomerId] = useState('');

  useEffect(() => {
      // Retrieve username from sessionStorage
      const storedUserName = sessionStorage.getItem('userName');
      const storedCustomerId = sessionStorage.getItem('cus_id');
      if (storedUserName) {
          setUserName(storedUserName);
      }
      if (storedCustomerId) {
        setCustomerId(storedCustomerId);
    }
  }, []);



    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null); // New state to track selected product for bidding

    useEffect(() => {
        fetchProducts();
    }, []);

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
            setError('Failed to fetch product data. Please try again later.');
        }
    };

    const handleBid = async (productId, bidAmount) => {
        try {
            
            const response = await fetch('http://localhost:8080/bid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    productId, 
                    bidAmount: parseFloat(bidAmount),
                    userName: userName// Include customer ID in the bid request
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit bid');
            }
            // Fetch updated product data after successful bid submission
            await fetchProducts();
            console.log('Bid submitted successfully!');
            window.alert("Bid submitted successfully!")
        } catch (error) {
            console.error('Error submitting bid:', error.message);
            // Handle error
        }
    };

    // Function to toggle selected product for bidding
    const toggleBidForm = (productId) => {
        setSelectedProductId(productId === selectedProductId ? null : productId);
    };

    return (
        <div>
            <Customerbar userName={userName}/>
            <div className="product-list">
                <h2>Bidding Products</h2>
                {error && <p className="error-message">{error}</p>}
                <ul className="product-ul">
                    {products.map((product) => (
                        <li key={product.pro_id}>
                            <div>
                                <img className="thumbnail" src={`data:image/jpeg;base64,${product.image}`} alt="product" />
                            </div>
                            <div>
                                <h3>{product.pro_name}</h3>
                                <p className="product-info">{product.description}</p>
                                {/* Change to display seller's user_name */}
                                <p className="product-info">Seller: {product.seller ? product.seller.userName :userName}</p>
                                <p className="product-info">Starting Price: ${product.startingPrice}</p>
                                <button className="bid-button" onClick={() => setSelectedProductId(product.pro_id)}>Bid Now</button>
                                {/* Conditionally render BidForm component based on selectedProductId */}
                               
                            </div>
                            {selectedProductId === product.pro_id && ( // Conditionally render bid form
                                <BidForm
                                    productId={product.pro_id}
                                    currentPrice={product.currentPrice} 
                                    onSubmit={handleBid}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
