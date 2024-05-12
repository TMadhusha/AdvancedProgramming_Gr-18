import React, { useEffect, useState } from 'react'
import Customerbar from './Customerbar';
import axios from 'axios';

export default function Account() {
  //storing the username
  const [userName, setUserName] = useState('');
  const [cus_id, setCusId] = useState('');

  useEffect(() => {
      // Retrieve username from sessionStorage
      const storedUserName = sessionStorage.getItem('userName');
      const storedCusId = sessionStorage.getItem('cus_id');
      if (storedUserName) {
          setUserName(storedUserName);
      }
      if (storedCusId) {
        setCusId(storedCusId);
      }
  }, []);

  const [customer,setCustomer]=useState({
    userName:"",
    address:"",
    email:"",
    mobile:"",
    password:"",
});

  const {address,email,mobile,password}=customer;

    const onChangeInput = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    }

    const loadCustomer = async () => {
      try {
          const result = await axios.get(`http://localhost:8080/customer/${cus_id}`);
          setCustomer(result.data);
      } catch (error) {
          window.alert("Error loading customer");
          console.error("Error loading customer", error);
      }
  };
  
  useEffect(() => {
    // Load customer details when the component mounts
    if (cus_id) {
      loadCustomer();
    }
  }, [cus_id]);
  
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.put(`http://localhost:8080/customer/${cus_id}`,customer);

        window.alert("Customer updated successfully...");
         
    } catch (error) {
        console.error("Error updating custoemr:", error);
        window.alert("Failed to update customer. Please try again.");
    }
};

  return (
    <div>
        <div>
            <Customerbar userName={userName}/>
        </div>
        <div>
          <div>
          <h1>My Account</h1>
          </div>
          <div>
          <form onSubmit={(e) => onSubmit(e)} className='forms'>
                <table>
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td><input type='text' name="userName" placeholder='Username' value={customer.userName} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td><input type='text' name="address" placeholder='Address' value={customer.address} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td><input type='text' name="email" placeholder='Email' value={customer.email} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Mobile:</td>
                            <td><input type='text' name="mobile" placeholder='Mobile' value={customer.mobile} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type='text' name="password" placeholder='Password' value={customer.password} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr className='button-container'>
                            <td><button type='submit'>Update</button></td>
                            <td><button>Cancel</button></td>
                        </tr>

                    </tbody>
                </table>
            </form>
          </div>
          
        </div>
    </div>
  )
}
