import React, { useEffect, useState } from 'react'
import Adminbar from '../components/Adminbar';
import axios from 'axios';
import AddSeller from './AddSeller';
import UpdateSeller from './UpdateSeller';


export default function SellerDetails() {
  //storing the username
  const [userName, setUserName] = useState('');

  useEffect(() => {
      // Retrieve username from sessionStorage
      const storedUserName = sessionStorage.getItem('userName');
      if (storedUserName) {
          setUserName(storedUserName);
      }
  }, []);

  const [seller, setSeller] = useState([]);
    const [showAddSeller, setShowAddSeller] = useState(false); // State to control the visibility of AddProduct popup
    const [showEditSeller,setEditSeller]=useState(false);
    const [selectedSellerId, setSelectedSellerId] = useState(null); 

    useEffect(() => {
        loadSeller();
    }, []);

    const loadSeller = async () => {
        const result = await axios.get("http://localhost:8080/getseller");
        setSeller(result.data);
    }

    const deleteSeller=async (seller_id)=>{
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if(confirmDelete){
          try{
            await axios.delete(`http://localhost:8080/seller/${seller_id}`)
            loadSeller();
          }catch(error){
            window.alert("The seller cannot be deleted...!")
          }
        }  
      }

  return (
    <div>
        <Adminbar userName={userName}/>
        <div>
                <div>
                    <h1>Seller Details</h1>
                </div>
                <div>
                    {/* Show the AddCustomer popup when the button is clicked */}
                    <button onClick={() => setShowAddSeller(true)}>Add New Seller</button>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope='col'>Seller Icon</th>
                                <th scope="col">Username</th>
                                <th scope="col">Address</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Role </th>
                                <th scope='col'>Description</th>
                                <th scope='col'>Password</th>
                                <th scope="col" colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                seller.map((seller, index) => (
                                    <tr key={index}>
                                        <td>{seller.seller_id}</td>
                                        <td><img className="thumbnail" src={`data:image/jpeg;base64,${seller.sellerIcon}`} alt="Seller" /></td>
                                        <td>{seller.userName}</td>
                                        <td>{seller.address}</td>
                                        <td>{seller.email}</td>
                                        <td>{seller.mobile}</td>
                                        <td>{seller.role}</td>
                                        <td>{seller.password}</td>
                                        <td><button onClick={() => setSelectedSellerId(seller.seller_id)}>Update</button></td>
                                        <td><button onClick={() => deleteSeller(seller.seller_id)}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Conditionally render the AddProduct modal */}
            {showAddSeller && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowAddSeller(false)}>&times;</span>
                        <AddSeller setShowAddSeller={setShowAddSeller} />
                    </div>
                </div>
            )}
            {selectedSellerId && ( // Only render the UpdateProduct modal if a product is selected
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSelectedSellerId(null)}>&times;</span>
                        <UpdateSeller seller_id={selectedSellerId} setEditSeller={setEditSeller} />
                    </div>
                </div>
            )}
    </div>
  )
}
