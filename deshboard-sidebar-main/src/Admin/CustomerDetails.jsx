import React, { useEffect, useState } from 'react'
import Adminbar from '../components/Adminbar'
import AddCustomer from './AddCustomer';
import UpdateCustomer from './UpdateCustomer';
import axios from 'axios';

export default function CustomerDetails() {
  //storing the username
  const [userName, setUserName] = useState('');

  useEffect(() => {
      // Retrieve username from sessionStorage
      const storedUserName = sessionStorage.getItem('userName');
      if (storedUserName) {
          setUserName(storedUserName);
      }
  }, []);

  const [customers, setCustomer] = useState([]);
    const [showAddcustomer, setShowAddCustomer] = useState(false); // State to control the visibility of AddProduct popup
    const [showEditCustomer,setEditCustomer]=useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null); 

    useEffect(() => {
        loadCustomer();
    }, []);

    const loadCustomer = async () => {
        const result = await axios.get("http://localhost:8080/getcustomer");
        setCustomer(result.data);
    }

    const deleteCustomer=async (cus_id)=>{
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if(confirmDelete){
          try{
            await axios.delete(`http://localhost:8080/customer/${cus_id}`)
            loadCustomer();
          }catch(error){
            window.alert("The customer cannot be deleted...!")
          }
        }  
      }


  return (
    <div>
        <Adminbar userName={userName}/>
            <div>
                <div>
                    <h1>Customer Details</h1>
                </div>
                <div>
                    {/* Show the AddCustomer popup when the button is clicked */}
                    <button onClick={() => setShowAddCustomer(true)}>Add New Customer</button>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Address</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Role </th>
                                <th scope='col'>Password</th>
                                <th scope="col" colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers.map((customer, index) => (
                                    <tr key={index}>
                                        <td>{customer.cus_id}</td>
                                        <td>{customer.userName}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.mobile}</td>
                                        <td>{customer.role}</td>
                                        <td>{customer.password}</td>
                                        <td><button onClick={() => setSelectedCustomerId(customer.cus_id)}>Update</button></td>
                                        <td><button onClick={() => deleteCustomer(customer.cus_id)}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Conditionally render the AddProduct modal */}
            {showAddcustomer && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowAddCustomer(false)}>&times;</span>
                        <AddCustomer setShowAddCustomer={setShowAddCustomer} />
                    </div>
                </div>
            )}
            {selectedCustomerId && ( // Only render the UpdateProduct modal if a product is selected
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSelectedCustomerId(null)}>&times;</span>
                        <UpdateCustomer cus_id={selectedCustomerId} setEditCustomer={setEditCustomer} />
                    </div>
                </div>
            )}
    </div>

  )
}
