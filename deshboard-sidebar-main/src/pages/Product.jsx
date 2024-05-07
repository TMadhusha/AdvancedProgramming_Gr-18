import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const Product = ({ inventory_id }) => {
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/getproducts/${1}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error(`Error fetching product ${inventory_id}:`, error));
    }, [1]);

    const handleQuickView = () => {
        // Navigate to Bid page with product details
        navigate('/bid/1', { state: { product: product } });
    };

    return (
        <div>
            <Sidebar />
            <div className="product-thumbnail">
                {product ? (
                    <>
                        <img src={`data:image/jpeg;base64,${product.image}`} alt="Product" className="product-image" />
                        <h3>{product.product_name}</h3>
                        <p>{product.description}</p>
                        {/* Additional product details */}
                        <button onClick={handleQuickView}>Quick View</button>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Product;
