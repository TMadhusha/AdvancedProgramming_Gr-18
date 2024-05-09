import React, { useState, useEffect } from 'react';
import Customerbar from './Customerbar';

export default function CxSeller() {
    const [sellers, setSellers] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        <div>
            <Customerbar />
            <div className="seller-table">
                <h2>Sellers</h2>
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
                            <tr key={seller.seller_id}>
                                <td><img className="thumbnail" src={`data:image/jpeg;base64,${seller.sellerIcon}`} alt="seller" /></td>
                                <td>{seller.user_name}</td>
                                <td>{seller.description}</td>
                                
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
