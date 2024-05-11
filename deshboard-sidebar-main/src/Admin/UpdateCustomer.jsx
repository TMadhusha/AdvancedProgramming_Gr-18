import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function UpdateCustomer({cus_id,setEditCustomer}) {
  const [customer,setCustomer]=useState({
    cus_id:"",
    userName:"",
    address:"",
    email:"",
    mobile:"",
    role:"",
    password:"",
});

  const {userName,address,email,mobile,role,password}=customer;

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
  
  useEffect(()=>{
    loadCustomer();
  },[cus_id]);
  
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.put(`http://localhost:8080/customer/${cus_id}`,customer);

        window.alert("Customer updated successfully...");
        setEditCustomer(false); // Close the modal after successfully updating the product
    } catch (error) {
        console.error("Error updating custoemr:", error);
        window.alert("Failed to update customer. Please try again.");
    }
};

  return (
    <div>
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <table>
                    <tbody>
                    <tr>
                            <td>Customer ID:</td>
                            <td><input type='number' name="cus_id" placeholder='cus_id' value={cus_id} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Seller/Company Name:</td>
                            <td><input type='text' name="userName" placeholder='Seller/Company Name' value={userName} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td><input type='text' name="address" placeholder='Address' value={address} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td><input type='text' name="email" placeholder='Email' value={email} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Mobile:</td>
                            <td><input type='text' name="mobile" placeholder='Mobile' value={mobile} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Role:</td>
                            <td><input type='text' name="role" placeholder='Role' value={role} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type='text' name="password" placeholder='Password' value={password} onChange={(e) => onChangeInput(e)}/></td>
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
  )
}
