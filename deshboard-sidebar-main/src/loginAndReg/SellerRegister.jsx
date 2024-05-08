import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'


export default function SellerRegister() {

  let navigate=useNavigate()

  const handleCancel = () => {
    // Clear form data
    setSellerReg({
        firstname:"",
    role:"",
    phonenumber:"",
    email:"",
    password:"",
    address:"",
    dob:"",
    conpassword:"",
    
    });
  };

  const [sellerReg,setSellerReg]=useState({
    firstname:"",
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

  const{firstname,role,phonenumber,email,password,address,dob,conpassword}=sellerReg

  const onInputChange=(e)=>{
    setSellerReg({...sellerReg,[e.target.name]:e.target.value})

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const namePattern = /^[a-zA-Z_]+$/;
  
    if (!namePattern.test(firstname)) {
      alert("First-name can only contain letters and underscores.");
    } else if (!namePattern.test(role)) {
      alert("Last-name can only contain letters and underscores.");
    } else if (password !== conpassword) {
      alert("Passwords Are Not Match try again...");
    } else {
      try {
        await axios.post("http://localhost:8080/register-seller", sellerReg);
        alert("Registration Completed...");
        // navigate("/login")
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

        <p>First Name</p>
        <div className="form-field d-flex align-items-center">
            {/* <span className="far fa-user"></span> */}
            <input 
            type={"text"} 
            name="firstname" 
            id="firstname" 
            placeholder="First Name"
            value={firstname}
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
                <Link to="/login-seller">
                    Sign-in
                </Link>
    </div>
   
</div>

</div>
)
}