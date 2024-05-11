import React, { useState, useEffect } from 'react';
import Customerbar from './Customerbar';
import { useLocation } from 'react-router-dom';

export default function CxSeller() {
    //storing the username
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Retrieve username from sessionStorage
        const storedUserName = sessionStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const [sellers, setSellers] = useState([]);
    const [error, setError] = useState(null);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = async () => {
        try {
            const response = await fetch('http://localhost:8080/getseller');
            if (!response.ok) {
                throw new Error('Failed to fetch seller data');
            }
            const data = await response.json();
            setSellers(data);
        } catch (error) {
            console.error('Error fetching seller data:', error);
            setError('Failed to fetch seller data. Please try again later.');
        }
    };

    const fetchProductsForSeller = async (sellerId) => {
        try {
            const response = await fetch(`http://localhost:8080/inventory/seller?sellerId=${sellerId}`);
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

    const handleRowClick = (seller) => {
        if (selectedSeller === seller) {
            setSelectedSeller(null);
            setProducts([]);
        } else {
            setSelectedSeller(seller);
            fetchProductsForSeller(seller.seller_id);
        }
    };

    return (
        <div>
            <Customerbar userName={userName} />
            <div className="seller-table">
                <h2 className="sellers-heading">Sellers</h2>
                {error && <p>{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Seller</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller) => (
                            <React.Fragment key={seller.seller_id}>
                                <tr onClick={() => handleRowClick(seller)}>
                                    <td><img className="thumbnail" src={`data:image/jpeg;base64,${seller.sellerIcon}`} alt="seller" /></td>
                                    <td>{seller.user_name}</td>
                                    <td>{seller.description}</td>
                                </tr>
                                {selectedSeller === seller && (
                                    <tr className="product-details-row">
                                        <td colSpan="3">
                                            <div className="product-details">
                                                <h2>Products of {selectedSeller.user_name}</h2>
                                                <ul>
                                                    {products.map((product) => (
                                                        <li key={product.pro_id}>
                                                            <img className="product-thumbnail" src={`data:image/jpeg;base64,${product.image}`} alt="product" />
                                                            <div>
                                                                <h3>{product.name}</h3>
                                                                <p>{product.description}</p>
                                                                <p>Starting Price: {product.startingPrice}</p>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
