//import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';



const Seller = () => {

    const [seller,setseller]=useState([])
  useEffect(()=>{
    //console.log("Page is Working");
    loadseller();

  },[]);

 const {seller_id}=useParams()

  const loadseller=async()=>{
    const result=await axios.get("http://localhost:8080/get-seller");
    setseller(result.data);
  }


  

    return (
     
        <div>
          
            <div className='main-container '>
           

            </div>
            <div className='content-container '>
                { (
                    <div className="employee-details">
                       <h3><center>Seller details</center></h3>
                       <hr/>
                       <div className='table-container'>
                        
                       <table className="table shadow">
  <thead>
    <tr>
      <th scope="col">Seller Id</th>
      <th scope="col">Firstname</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Email</th>
      <th scope="col">Address</th>
      <th scope="col">Dob</th>
      <th scope="col">Role</th>
      
    </tr>
  </thead>
  <tbody>
    {
      seller.map((seller)=>(
      <tr>
          {/* <th scope="row" key={index}>{index+1}</th> */}
          <td>{seller.seller_id}</td>
          <td>{seller.firstname}</td>
          <td>{seller.phonenumber}</td>
          <td>{seller.email}</td>
          <td>{seller.address}</td>
          <td>{seller.dob}</td>
          <td>{seller.role}</td>
        
          
           
          
          
          
    </tr>
      ))
    }
    
  </tbody>
</table>
</div>
       
                      

                    </div>
                    

                )}
              
            </div>
            
        </div>  
           
    );
};



export default Seller;