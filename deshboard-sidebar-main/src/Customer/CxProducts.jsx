// CxProducts.jsx
import React, { useState, useEffect } from 'react';
import Customerbar from './Customerbar';
import BidForm from './BidForm';

export default function CxProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null); // State to track selected product ID

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
        // Update the current price of the product with the new bid amount
        const updatedProducts = products.map(product => {
            if (product.pro_id === productId) {
                return { ...product, startingPrice: bidAmount };
            }
            return product;
        });
        setProducts(updatedProducts);
        setSelectedProductId(null);
    };

    return (
        <div>
            <Customerbar />
            <div className="product-list">
                <h2>Bidding Products</h2>
                {error && <p>{error}</p>}
                <ul>
                    {products.map((product) => (
                        <li key={product.pro_id}>
                            <div>
                                <img className="thumbnail" src={`data:image/jpeg;base64,${product.image}`} alt="product" />
                            </div>
                            <div>
                                <h3>{product.name}</h3>
                                <p className="product-info">{product.description}</p>
                                {/* Change to display seller's user_name */}
                                <p className="product-info">Seller: {product.seller.user_name}</p>
                                <p className="product-info">Starting Price: ${product.startingPrice}</p>
                                <button className="bid-button" onClick={() => setSelectedProductId(product.pro_id)}>Bid Now</button>
                                {/* Conditionally render BidForm component based on selectedProductId */}
                                {selectedProductId === product.pro_id && (
                                    <BidForm
                                        productId={product.pro_id}
                                        currentPrice={product.startingPrice} // You can use the starting price or any other relevant price
                                        onSubmit={(bidAmount) => handleBid(product.pro_id, bidAmount)}
                                    />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
