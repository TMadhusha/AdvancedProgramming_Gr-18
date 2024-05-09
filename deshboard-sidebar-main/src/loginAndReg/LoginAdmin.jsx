import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import SidebarSeller from './SidebarSeller';


export default function LoginSeller() {

  let navigate=useNavigate()

  const [admin,setAdmin]=useState({
        email:"",
        password:"",
        
        

  })
  useEffect(()=>{
    console.log("Welcome To AdminPage Page..")
  })

  const{email,password}=admin

  const onInputChange=(e)=>{
    setAdmin({...admin,[e.target.name]:e.target.value})

  }

  const onSubmit =async (e)=>{
      e.preventDefault()

      try
      {
      const response=await axios.post("http://localhost:8080/admin-login",admin)

      if (response.status === 200) {
        alert("Login Successfull"); // Display response message
        navigate("/edit-seller"); // Navigate to dashboard upon successful login
      }}
      catch (error) {
        alert("Login failed: " + error.response.data); // Display error message
    }
      
  }

return(
    
    
    <div className="wrapperr">
        <Sidebar/> 
            <div className="logo">
                {/* Picture */}
            </div>
                
            <div className="text-center mt-4 name">
                Admin Login Form
            </div>
        <form className="p-3 mt-3" onSubmit={(e)=>onSubmit(e)}>
                <div className="form-field d-flex align-items-center">
                    
                    <input 
                    type={"email"} 
                    className="far fa-user" 
                    name="email" 
                    id="email" 
                    placeholder="Email"
                    value={email} 
                    onChange={(e)=>onInputChange(e)}/>

                </div>
                <div className="form-field d-flex align-items-center">
                    <span ></span>
                    <input 
                    type={"password"} 
                    className="fas fa-key"
                    name="password" 
                    id="pwd" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>onInputChange(e)}/>
                </div>
                <button type='submit'className="btn mt-3">
                    Login
                </button>
        </form>
                <div className="text-center fs-6">
                <Link to="/register-admin">
                    Forget-Password
                </Link>
                {"\t"}or{"\t"}
                <Link to="/register-admin">
                    Sign-Up
                </Link>
                   
                </div>
       
    </div>

)
}
