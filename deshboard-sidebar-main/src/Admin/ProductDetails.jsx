import React, { useEffect, useState } from 'react'
import Adminbar from '../components/Adminbar'
import axios from 'axios';

export default function ProductDetails() {
    const [inventory,setInventory]=useState([]);

    useEffect(()=>{
        loadProduct();
    },[])

    const loadProduct=async()=>{
        const result=await axios.get("http://localhost:8080/inventory");
        setInventory(result.data);
    }

  return (
    <div>
        <Adminbar/>
        <div>
            <div>
                <h1>Product Details</h1>
            </div>
            <div>
                <button>Add New Product</button>
            </div>
            <div>
            <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Author</th>
      <th scope="col">Description</th>
      <th scope="col">Starting Price </th>
      <th scope="col" colSpan={'2'}>Action</th>
    </tr>
  </thead>
  <tbody>
    {
        inventory.map((inventory,index)=>(
            <tr key={index}>
                <td>{inventory.pro_id}</td>
                <td><img src={`data:image/jpeg;base64,${inventory.image}`} alt="Product"/></td>
                <td>{inventory.name}</td>
                <td>{inventory.author}</td>
                <td>{inventory.description}</td>
                <td>{inventory.startingPrice}</td>
                <td><button>Update</button></td>
                <td><button>Delete</button></td>
            </tr>
        ))
    }
    
    
  </tbody>
</table>
            </div>
        </div>
    </div>
  )
}
