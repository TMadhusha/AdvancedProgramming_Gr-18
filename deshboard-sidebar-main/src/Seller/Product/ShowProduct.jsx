//import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';



const Product = () => {

    const [product,setproduct]=useState([])
  useEffect(()=>{
    //console.log("Page is Working");
    loadproduct();

  },[]);

 const {product_id}=useParams()

  const loadproduct=async()=>{
    const result=await axios.get("http://localhost:8090/get-product");
    setproduct(result.data);
  }


  

    return (
     
        <div>
          
            <div className='main-container '>
           

            </div>
            <div className='content-container '>
                { (
                    <div className="employee-details">
                       <h3><center>Product details</center></h3>
                       <hr/>
                       <div className='table-container'>
                        
                       <table className="table shadow">
  <thead>
    <tr>
      <th scope="col">Product Id</th>
      <th scope="col">Product Name</th>
      <th scope="col">Starting Price</th>
      <th scope="col">Description</th>
      <th scope="col">Author</th>
      <th scope="col">Email</th>
      
      
    </tr>
  </thead>
  <tbody>
    {
      product.map((product)=>(
      <tr>
          {/* <th scope="row" key={index}>{index+1}</th> */}
          <td>{product.product_id}</td>
          <td>{product.productname}</td>
          <td>{product.startingprice}</td>
          <td>{product.description}</td>
          <td>{product.author}</td>
          <td>{product.email}</td>
          
         
        
          
           
          
          
          
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



export default Product;