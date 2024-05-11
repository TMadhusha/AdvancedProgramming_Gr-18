import React, { useEffect, useState } from 'react';
import Adminbar from '../components/Adminbar';
import axios from 'axios';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';

export default function ProductDetails() {
    //storing the username
  const [userName, setUserName] = useState('');

  useEffect(() => {
      // Retrieve username from sessionStorage
      const storedUserName = sessionStorage.getItem('userName');
      if (storedUserName) {
          setUserName(storedUserName);
      }
  }, []);

    const [inventory, setInventory] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false); // State to control the visibility of AddProduct popup
    const [showEditProduct,setEditProduct]=useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null); 

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        const result = await axios.get("http://localhost:8080/inventory");
        setInventory(result.data);
    }

    const deleteProduct=async (pro_id)=>{
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if(confirmDelete){
          try{
            await axios.delete(`http://localhost:8080/inventory/${pro_id}`)
            loadProduct();
          }catch(error){
            window.alert("The product cannot be deleted...!")
          }
        }  
      }

    return (
        <div>
            <Adminbar userName={userName}/>
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
                                        <td><button onClick={() => setSelectedProductId(inventory.pro_id)}>Update</button></td>
                                        <td><button onClick={() => deleteProduct(inventory.pro_id)}>Delete</button></td>
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
            {selectedProductId && ( // Only render the UpdateProduct modal if a product is selected
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSelectedProductId(null)}>&times;</span>
                        <UpdateProduct pro_id={selectedProductId} setEditProduct={setEditProduct} />
                    </div>
                </div>
            )}
        </div>
    );
}
