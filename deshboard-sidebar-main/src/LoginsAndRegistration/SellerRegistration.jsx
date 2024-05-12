import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import reg from '../components/reg.jpg';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function SellerRegistration() {
    let navigate = useNavigate();
    const [seller, setSeller] = useState({
        userName: "",
        password: "",
        cpassword: "",
        address: "",
        email: "",
        mobile: "",
        role: "", 
        description: "",
        sellerIcon: null
    });

    const { userName, password, cpassword, email, address, mobile, role, description, sellerIcon } = seller;

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

        // Validate all fields
    if (!userName || !address || !email || !mobile || !role || !description || !sellerIcon || !password || !cpassword) {
        window.alert("Please fill out all fields");
        return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        window.alert("Please enter a valid email address");
        return;
    }

        // Check if password and confirm password match
        if (password !== cpassword) {
            window.alert("Passwords do not match");
            return;
        }

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

            window.alert("Registration Successful");
            navigate('/sellerlogin');
        } catch (error) {
            window.alert("Registration failed, please try again");
            console.error("Registration failed", error);
        }
    };


    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div>
                <h2>Seller Registration</h2>
            </div>
            <div className='container'>
                <div>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>User name: </td>
                                    <td><input type='text' name='userName' placeholder='User name' value={userName} onChange={(e) => onChangeInput(e)} /></td>
                                </tr>
                                <tr>
                                    <td>Address: </td>
                                    <td><input type='text' name='address' placeholder='Address' value={address} onChange={(e) => onChangeInput(e)} /></td>
                                </tr>
                                <tr>
                                    <td>Email: </td>
                                    <td><input type='text' name='email' placeholder='Email' value={email} onChange={(e) => onChangeInput(e)} /></td>
                                </tr>
                                <tr>
                                    <td>Mobile: </td>
                                    <td><input type='text' name='mobile' placeholder='Mobile' value={mobile} onChange={(e) => onChangeInput(e)} /></td>
                                </tr>
                                <tr>
                                    <td>Role: </td>
                                    <td><input type='text' name='role' placeholder='Role' value={role} onChange={(e) => onChangeInput(e)} /></td>
                                </tr>
                                <tr>
                                    <td>Description: </td>
                                    <td><input type='text' name='description' placeholder='Description' value={description} onChange={(e) => onChangeInput(e)} /></td>
                                </tr>
                                <tr>
                                    <td>Image:</td>
                                    <td><input type='file' name="sellerIcon" onChange={(e) => onChangeInput(e)} /></td>
                                </tr>
                                <tr>
                                    <td>Password: </td>
                                    <td><input type='password' name='password' placeholder='Password' value={password} onChange={(e) => onChangeInput(e)} /></td>
                                </tr>
                                <tr>
                                    <td>Confirm Password: </td>
                                    <td><input type='password' name='cpassword' placeholder='Confirm Password' value={cpassword} onChange={(e) => onChangeInput(e)} /></td>
                                </tr>
                                <tr>
                                    <td><button type="submit">Register</button></td>
                                    <td><Link to={"/"} type="button" className='btun'>Cancel</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                <div>
                    <img src={reg} style={{ marginLeft: '350px' }} alt="Registration" />
                </div>
            </div>
        </div>
    );
}
