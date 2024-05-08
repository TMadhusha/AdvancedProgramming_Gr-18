import React, { useEffect, useState } from 'react';
import Adminbar from '../components/Adminbar';
import axios from 'axios';
import AddProduct from './AddProduct';

export default function ProductDetails() {
    const [inventory, setInventory] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false); // State to control the visibility of AddProduct popup

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        const result = await axios.get("http://localhost:8080/inventory");
        setInventory(result.data);
    }

    return (
        <div>
            <Adminbar />
            <div>
                <div>
                    <h1>Product Details</h1>
                </div>
                <div>
                    {/* Show the AddProduct popup when the button is clicked */}
                    <button onClick={() => setShowAddProduct(true)}>Add New Product</button>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Author</th>
                                <th scope="col">Description</th>
                                <th scope="col">Starting Price </th>
                                <th scope="col" colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                inventory.map((inventory, index) => (
                                    <tr key={index}>
                                        <td>{inventory.pro_id}</td>
                                        <td><img src={`data:image/jpeg;base64,${inventory.image}`} alt="Product" /></td>
                                        <td>{inventory.pro_name}</td>
                                        <td>{inventory.author}</td>
                                        <td>{inventory.description}</td>
                                        <td>{inventory.startingPrice}</td>
                                        <td><button>Update</button></td>
                                        <td><button>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Conditionally render the AddProduct modal */}
            {showAddProduct && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowAddProduct(false)}>&times;</span>
                        <AddProduct setShowAddProduct={setShowAddProduct} />
                    </div>
                </div>
            )}
        </div>
    );
}
