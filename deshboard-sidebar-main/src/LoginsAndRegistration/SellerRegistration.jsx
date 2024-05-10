import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import reg from '../components/reg.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SellerRegistration() {
    let navigate=useNavigate();
    const [seller,setSeller]=useState({
        user_name:"",
        password:"",
        address:"",
        email:"",
        mobile:""
    });

    const {user_name,password,cpassword,email,address,mobile,role}=seller;

    const onChangeInput = (e)=>{
        setSeller({ ...seller, [e.target.name]: e.target.value });
    };

    const onSubmit= async(e) => {
        e.preventDefault();
        // Check if password and confirm password match
        if (password !== cpassword) {
            window.alert("Passwords do not match");
            return;
        }

        try {
            // If passwords match, update the customer object with the password and other fields
            const sellerData = {
                ...seller,
                password: password, // Update password with the value from the password field
                // Include other fields here as needed
            };

            await axios.post("http://localhost:8080/seller", sellerData);
            window.alert("Registration Successful");
            navigate('/sellerlogin')
        } catch (error) {
            window.alert("Registration failed, please try again");
            console.error("Registration failed", error);
        }
    };

  return (
    <div>
        <div>
            <Sidebar/>
        </div>
        <div>
        <h2>Seller Registration</h2>
        </div>
        <div className='container'>
            <div>
                <form onSubmit={(e) => onSubmit(e)}>
                    <table>
                        <tr>
                            <td>User name: </td>
                            <td><input type='text' name='user_name' placeholder='User name' value={user_name} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Address: </td>
                            <td><input type='text' name='address' placeholder='Address' value={address} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Email: </td>
                            <td><input type='text' name='email' placeholder='Email' value={email} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Mobile: </td>
                            <td><input type='text' name='mobile' placeholder='Mobile' value={mobile} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Role: </td>
                            <td><input type='text' name='role' placeholder='Role' value={role} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Password: </td>
                            <td><input type='password' name='paasword' placeholder='Password' value={password} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Confirm Password: </td>
                            <td><input type='password' name='cpassword' placeholder='Confirm Password' value={cpassword} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td><button>Register</button></td>
                            <td><button>Cancel</button></td>
                        </tr>
                    </table>
                </form>
            </div>
            <div>
                <img src={reg} style={{marginLeft:'350px'}}/>
            </div>
            
        </div>
        

    </div>
  )
}
