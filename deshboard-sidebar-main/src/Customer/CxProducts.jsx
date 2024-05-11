import React, { useState, useEffect } from 'react';
import Customerbar from './Customerbar';
import BidForm from './BidForm';

export default function CxProducts() {
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
                body: JSON.stringify({ productId, bidAmount: parseFloat(bidAmount) }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit bid');
            }
            // Fetch updated product data after successful bid submission
            await fetchProducts();
            console.log('Bid submitted successfully!');
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
        <div className="cx-products-container">
            <Customerbar />
            <div className="product-list">
                <h2>Bidding Products</h2>
                {error && <p className="error-message">{error}</p>}
                <ul className="product-ul">
                    {products.map((product) => (
                        <li key={product.pro_id} className="product-li">
                            <div className="product-info-container">
                                <img className="product-thumbnail" src={`data:image/jpeg;base64,${product.image}`} alt="product" />
                                <div className="product-details">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-description">{product.description}</p>
                                    <p className="product-seller">Seller: {product.seller.user_name}</p>
                                    <p className="product-price">Starting Price: ${product.startingPrice}</p>
                                    <button className="bid-button" onClick={() => toggleBidForm(product.pro_id)}>Bid</button> {/* Bid button */}
                                </div>
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
