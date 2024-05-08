import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SidebarSeller from '../loginAndReg/SidebarSeller'


export default function UpdatePassword() {

  let navigate=useNavigate()

  const handleCancel = () => {
    // Clear form data
    setSellerpwd({
  
    email:"",
    password:"",
    conpassword:"",
    
    });
  };

  const [sellerpwd,setSellerpwd]=useState({
    email:"",
    password:"",
    conpassword:"",
        
        

  })
  useEffect(()=>{
    console.log("Welcome To Seller Page..")
  })

  const{email,password,conpassword}=sellerpwd

  const onInputChange=(e)=>{
    setSellerpwd({...sellerpwd,[e.target.name]:e.target.value})

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    
  
  if (password !== conpassword) {
      alert("Passwords Are Not Match try again...");
    } else {
      try {
        await axios.put("http://localhost:8080/change-password", sellerpwd);
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

   <SidebarSeller/>
    <div className="wrapperr">
      
    <div className="text-center mt-4 name">
        Registration Form
    </div>
    <form className="p-3 mt-3" onSubmit={(e)=>onSubmit(e)}>

       

       


      

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
                <Link to="/register-login">
                    Sign-in
                </Link>
    </div>
   
</div>

</div>
)
}