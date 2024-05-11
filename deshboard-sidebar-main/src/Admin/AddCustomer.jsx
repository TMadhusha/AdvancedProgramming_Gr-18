import React, { useState,useEffect} from 'react'
import axios from 'axios';

export default function AddCustomer() {
  const [customer,setCustomer]=useState({
    cus_id:"",
    userName:"",
    address:"",
    email:"",
    mobile:"",
    role:"",
    password:""
});

  const {cus_id,userName,address,email,mobile,role,password}=customer;

  const fetchLastCustomerId = async () => {
    try {
      const result = await axios.get("http://localhost:8080/getcustomer");
      const lastCustomer = result.data[result.data.length - 1];
      const lastCustomerId = lastCustomer ? parseInt(lastCustomer.cus_id) : 0; // Extract the number part and convert to integer
      const newCustomerId = `${(lastCustomerId + 1)}`; // Increment the number part and format it
      setCustomer(prevCustomer => ({
        ...prevCustomer,
        cus_id: newCustomerId
      }));
    } catch (error) {
      console.error("Error fetching last customer id:", error);
    }
  };

  useEffect(()=>{
    fetchLastCustomerId();
  },[]);

  const onChangeInput = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

      try {
        await axios.post("http://localhost:8080/customer", customer);
        window.alert("Customer added succesfully...!");

        setCustomer({
          cus_id:"",
          userName:"",
          address:"",
          email:"",
          mobile:"",
          role:"",
          password:""
      });


      } catch (error) {
        console.error("Error adding customer:", error);
        window.alert("Failed to add customer. Please try again.");
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
                            <td>Username:</td>
                            <td><input type='text' name="userName" placeholder='Username' value={userName} onChange={(e) => onChangeInput(e)}/></td>
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
                            <td><button type='submit'>Add</button></td>
                            <td><button>Cancel</button></td>
                        </tr>

                    </tbody>
                </table>
            </form>
        </div>
    </div>
  )
}
