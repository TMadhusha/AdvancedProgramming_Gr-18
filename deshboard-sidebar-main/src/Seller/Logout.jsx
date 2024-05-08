import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SidebarSeller from '../loginAndReg/SidebarSeller'


export default function SellerRegister() {

  let navigate=useNavigate()

  

 
 

  

  const onSubmit = async (e) => {
    e.preventDefault();
     {
      try {
        await axios.post("http://localhost:8080/seller-logout");
        alert("Logout Completed...");
        navigate("/")
        
      } catch {
        
          alert("An error occurred while registering. Please try again later.");
        
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

<tr>
    <td>
    <p>Are you Going to Logout from Seller</p>
    </td>
</tr>
<tr>
    <td>
            <div className="form-field2 d-flex align-items-center">
                <button className="btn mt-3" type="submit">Yes</button>
            </div>
    </td>
    <td>
            <div className="text-center fs-6">
                        
            </div>
    </td>
</tr>
       
       
        
    </form>
   
    </div>
   
</div>


)
}