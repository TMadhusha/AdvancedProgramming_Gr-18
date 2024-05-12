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
            <Sidebar />
            <div className="main-content">
                <div>
                    <h1>Product Details</h1>
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Starting Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((item, index) => (
                            <tr key={index}>
                                <td><img src={`data:image/jpeg;base64,${item.image}`} alt="Product" /></td>
                                <td>{item.pro_name}</td>
                                <td>{item.author}</td>
                                <td>{item.description}</td>
                                <td>{item.startingPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
