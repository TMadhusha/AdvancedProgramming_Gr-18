import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function AddSeller() {
  const [seller,setSeller]=useState({
    seller_id:"",
    userName:"",
    address:"",
    email:"",
    mobile:"",
    role:"",
    description:"",
    password:"",
    sellerIcon:null
});

  const {seller_id,userName,address,email,mobile,role,description,password,sellerIcon}=seller;

  const fetchLastSellerId = async () => {
    try {
      const result = await axios.get("http://localhost:8080/getseller");
      const lastSeller = result.data[result.data.length - 1];
      const lastSellerId = lastSeller ? parseInt(lastSeller.seller_id) : 0; // Extract the number part and convert to integer
      const newSellerId = `${String(lastSellerId + 1)}`; // Increment the number part and format it
      setSeller(prevSeller => ({
        ...prevSeller,
        seller_id: newSellerId
      }));
    } catch (error) {
      console.error("Error fetching last seller id:", error);
    }
  };

  useEffect(()=>{
    fetchLastSellerId();
  },[]);

  const onChangeInput = (e) => {
    if (e.target.name === "sellerIcon") {
        // Set the image file to state
        setSeller({ ...seller, sellerIcon: e.target.files[0] });
    } else {
        // Set other input values to state
        setSeller({ ...seller, [e.target.name]: e.target.value });
    }
};

const onSubmit = async (e) => {
  e.preventDefault();

  try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("address", address);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("role", role);
      formData.append("description", description);
      formData.append("sellerIcon", sellerIcon);
      formData.append("password",password);

      await axios.post("http://localhost:8080/postseller", formData, {
          headers: {
              "Content-Type": "multipart/form-data"
          }
      });

      window.alert("Seller added successfully...");
      // After successfully adding the product, reset the form and navigate away
      setSeller({
        seller_id:"",
        userName:"",
        address:"",
        email:"",
        mobile:"",
        role:"",
        description:"",
        password:"",
        sellerIcon:null
    });
     
  } catch (error) {
      window.alert("Failed to add seller, please try again");
      console.error("Error adding seller", error);
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
                        <tr>
                                <td>Seller Icon:</td>
                                <td><input type='file' name="sellerIcon" onChange={(e) => onChangeInput(e)} /></td>
                        </tr>
                        <tr className='button-container'>
                            <td><button type='submit'>Add</button></td>
                            <td><button>Cancel</button></td>
                        </tr>

                    </tbody>
                </table>
            </form>
        </div>
    </div>
  )
}
