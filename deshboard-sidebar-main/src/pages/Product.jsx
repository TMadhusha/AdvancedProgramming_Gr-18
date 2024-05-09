import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

export default function Product() {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        const result = await axios.get("http://localhost:8080/inventory");
        setInventory(result.data);
    };

    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div className="main-content">
                <div>
                    <h1>Product Details</h1>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        inventory.map((item, index) => (
                            <div key={index} className="thumbnail">
                                <div>
                                    <img src={`data:image/jpeg;base64,${item.image}`} alt="Product" />
                                </div>
                                <div className="thumbnail-content">
                                    <h3>{item.name}</h3>
                                    <p>Author: {item.author}</p>
                                    <p>Description: {item.description}</p>
                                    <p>Starting Price: {item.startingPrice}</p>
                                  
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
