import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function UpdateSeller({seller_id,setEditSeller}) {
    const [seller,setSeller]=useState({
        seller_id:"",
        userName:"",
        address:"",
        email:"",
        mobile:"",
        role:"",
        description:"",
        password:"",
    });

    const {userName,address,email,mobile,role,description,password}=seller;

    const onChangeInput = (e) => {
        setSeller({ ...seller, [e.target.name]: e.target.value });
    }
    
    const loadSeller = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/seller/${seller_id}`);
            setSeller(result.data);
        } catch (error) {
            window.alert("Error loading seller");
            console.error("Error loading seller", error);
        }
    };
    

      useEffect(()=>{
        loadSeller();
      },[seller_id])
    
      const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await axios.put(`http://localhost:8080/seller/${seller_id}`,seller);
    
            window.alert("Seller updated successfully...");
            setEditSeller(false); // Close the modal after successfully updating the product
        } catch (error) {
            console.error("Error updating seller:", error);
            window.alert("Failed to update seller. Please try again.");
        }
    };


  return (
    <div>
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <table>
                    <tbody>
                    <tr>
                            <td>Seller ID:</td>
                            <td><input type='number' name="seller_id" placeholder='seller_id' value={seller_id} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Seller/Company Name:</td>
                            <td><input type='text' name="userName" placeholder='Seller/Company Name' value={userName} onChange={(e) => onChangeInput(e)}/></td>
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
                            <td>Description:</td>
                            <td><input type='text' name="description" placeholder='Description' value={description} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type='text' name="password" placeholder='Password' value={password} onChange={(e) => onChangeInput(e)}/></td>
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
