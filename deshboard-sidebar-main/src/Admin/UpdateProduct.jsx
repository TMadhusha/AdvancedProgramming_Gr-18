import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function UpdateProduct({ pro_id, setEditProduct }) {
    const [inventory,setInventory]=useState({
        pro_id:"",
        pro_name:"",
        description:"",
        startingPrice:"",
    });

    const{pro_name,description,startingPrice}=inventory;

     // Function to fetch the last att_id from the backend and increment it
//   const fetchLastProId = async () => {
//     try {
//       const result = await axios.get("http://localhost:8080/inventory");
//       const lastPro = result.data[result.data.length - 1];
//       const lastProId = lastPro ? parseInt(lastEmp.emp_id.slice(3)) : 0; // Extract the number part and convert to integer
//       const newEmpId = `emp${String(lastEmpId + 1).padStart(3, '0')}`; // Increment the number part and format it
//       setEmployees(prevEmployee => ({
//         ...prevEmployee,
//         emp_id: newEmpId
//       }));
//     } catch (error) {
//       console.error("Error fetching last employee id:", error);
//     }
//   };

const onChangeInput = (e) => {
    setInventory({ ...inventory, [e.target.name]: e.target.value });
    } 


const loadProduct=async ()=>{
    try {
      const result = await axios.get(`http://localhost:8080/inventory/${pro_id}`);
      setInventory(result.data);
    } catch (error) {
      window.alert('Error loading employee:', error);
    }
  };

  useEffect(()=>{
    loadProduct();
  },[pro_id])


  const onSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.put(`http://localhost:8080/inventory/${pro_id}`,inventory);

        window.alert("Product updated successfully...");
        setEditProduct(false); // Close the modal after successfully updating the product
    } catch (error) {
        console.error("Error updating product:", error);
        window.alert("Failed to update product. Please try again.");
    }
};

  return (
    <div>
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <table>
                    <tbody>
                        <tr>
                            <td>Product ID:</td>
                            <td><input type='number' name="pro_id" placeholder='Product ID' value={pro_id} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Product Name:</td>
                            <td><input type='text' name="pro_name" placeholder='Product Name' value={pro_name} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td><input type='text' name="description" placeholder='Description' value={description} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Starting price:</td>
                            <td><input type='text' name="startingPrice" placeholder='Starting price' value={startingPrice} onChange={(e) => onChangeInput(e)}/></td>
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
