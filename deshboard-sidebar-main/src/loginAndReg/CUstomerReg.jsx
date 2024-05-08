import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'


export default function CustomerRegister() {

  let navigate=useNavigate()

  const handleCancel = () => {
    // Clear form data
    setCustomerReg({
    username:"",
    role:"",
    phonenumber:"",
    email:"",
    password:"",
    address:"",
    dob:"",
    conpassword:"",
    
    });
  };

  const [customerReg,setCustomerReg]=useState({
    username:"",
    role:"",
    phonenumber:"",
    email:"",
    password:"",
    address:"",
    dob:"",
    conpassword:"",
        
        

  })
  useEffect(()=>{
    console.log("Welcome To Seller Page..")
  })

  const{username,role,phonenumber,email,password,address,dob,conpassword}=customerReg

  const onInputChange=(e)=>{
    setCustomerReg({...customerReg,[e.target.name]:e.target.value})

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const namePattern = /^[a-zA-Z_]+$/;
  
    if (!namePattern.test(username)) {
      alert("First-name can only contain letters and underscores.");
    } else if (!namePattern.test(role)) {
      alert("Last-name can only contain letters and underscores.");
    } else if (password !== conpassword) {
      alert("Passwords Are Not Match try again...");
    } else {
      try {
        await axios.post("http://localhost:8080/register-seller", customerReg);
        alert("Registration Completed...");
        navigate("/login-customer")
        handleCancel();
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert(error.response.data.errorMessage);
        } else {
          console.error("An error occurred:", error);
          alert("An error occurred while registering. Please try again later.");
        }
      }
    }
  };
  
 
return(
    
    <div>
<Sidebar/>
   
    <div className="wrapperr">
      
    <div className="text-center mt-4 name">
        Registration Form
    </div>
    <form className="p-3 mt-3" onSubmit={(e)=>onSubmit(e)}>

        <p>User Name</p>
        <div className="form-field d-flex align-items-center">
            {/* <span className="far fa-user"></span> */}
            <input 
            type={"text"} 
            name="username" 
            id="username" 
            placeholder="User Name"
            value={username}
            required
            onChange={(e)=>onInputChange(e)}/>
        </div>

        <p>Role</p>
<div className="form-field d-flex align-items-center">
    {/* <span className="far fa-user"></span> */}
    <select 
        name="role" 
        id="role" 
        value={role}
        required
        onChange={(e) => onInputChange(e)}
    >
        <option value="">Select Role</option>
        <option value="user">Seller</option>
        <option value="customer">Customer</option>
    </select>
</div>


        <p>Phonenumber</p>
        <div className="form-field d-flex align-items-center">
            {/* <span className="far fa-user"></span> */}
            <input 
            type={"number"} 
            name="phonenumber" 
            id="phonenumber" 
            placeholder="phone Number"
            value={phonenumber}
            required
            maxLength={10}
            onChange={(e)=>onInputChange(e)}/>
        </div>

        <p>Email</p>
        <div className="form-field d-flex align-items-center">
            {/* <span className="far fa-user"></span> */}
            <input 
            type={"email"} 
            name="email" 
            id="email" 
            placeholder="email"
            value={email}
            required
            onChange={(e)=>onInputChange(e)}/>
        </div>

                <p>Address</p>
        <div className="form-field d-flex align-items-center">
            {/* <span className="far fa-user"></span> */}
            <textarea 
                name="address" 
                id="address" 
                placeholder="Address"
                value={address}
                required
                onChange={(e) => onInputChange(e)}
            ></textarea>
        </div>


        <p>Date Of Birth</p>
        <div className="form-field d-flex align-items-center">
            {/* <span className="far fa-user"></span> */}
            <input 
            type={"text"} 
            name="dob" 
            id="dob"
            placeholder="YYYY-MM-DD" 
            value={dob}
            required
            onChange={(e)=>onInputChange(e)}/>
        </div>

        <p>Enter Your Password</p>
        <div className="form-field d-flex align-items-center">
            {/* <span className="fas fa-key"></span> */}
            <input type={"password"} 
            name="password" 
            id="password" 
            placeholder="Password"
            value={password}
            minLength={8}
            required
            
            onChange={(e)=>onInputChange(e)}/>
        </div>

        <p>Conform Your Password</p>
        <div className="form-field d-flex align-items-center">
            {/* <span className="fas fa-key"></span> */}
            <input type={"password"} 
            name="conpassword" 
            id="conpassword" 
            placeholder="Conform Password"
            minLength={8}
            value={conpassword}
            required
            onChange={(e)=>onInputChange(e)}/>
        </div>

        
        <div className="form-field2 d-flex align-items-center">
            <button className="btn mt-3" type="submit">Submit</button>
        </div>
        <div className="form-field2 d-flex align-items-center">
            <button onClick={handleCancel} className="btn mt-3" type="reset">Cancel</button>
        </div>
        
    </form>
    <div className="text-center fs-6">
                <Link to="/login-customer">
                    Sign-in
                </Link>
    </div>
   
</div>

</div>
)
}