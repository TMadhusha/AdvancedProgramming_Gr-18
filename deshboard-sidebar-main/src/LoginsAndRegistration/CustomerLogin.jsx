import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login from '../components/login.jpg';
import Customerbar from '../Customer/Customerbar';

export default function CustomerLogin() {
    let navigate=useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  
    const [cus_id, setcus_id] = useState('');
    

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/customerlogin", { userName, password });
            if (response.status === 200) {
                sessionStorage.setItem('userName', userName);
                sessionStorage.setItem('cus_id', cus_id);
                navigate("/cx-seller");
                // Login successful, handle redirection or other actions
            }
        } catch (error) {
            window.alert("Invalid username or password");
            console.log('Invalid username or password',error);
        }
    };


  return (
    <div>
        <div>
            <Sidebar/>
        </div>
        <div>
            <h2>Customer Login</h2>
        </div>
        <div className='container'>
            <div>
                {error && <p>{error}</p>}
                    <form onSubmit={handleLogin}>
                        <table>
                            <tr>
                                <th>Username</th>
                            </tr>
                            <tr>
                                <td><input type='text' name='userName' value={userName} onChange={(e) => setUserName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <th>Password</th>
                            </tr>
                            <tr>
                                <td><input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td><button style={{width:"100px",marginLeft:"40px"}} type='submit'>LogIn</button></td>
                                <td><button style={{marginLeft:"0"}}>Cancel</button></td>
                            </tr>
                        </table>
                    </form>
            </div>
            <div>
                <img src={login} style={{marginLeft:'400px'}}/>
            </div>
        </div>
        {/* {userName && <Customerbar userName={userName} />}   */}
    </div>
  )
}
