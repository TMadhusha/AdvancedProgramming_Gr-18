import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function LoginSeller() {
  let navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    console.log("Welcome To AdminPage Page..");
  });

  const { email, password } = admin;

  const onInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/admin-login", admin);

      if (response.status === 200) {
        alert("Login Successful");
        navigate("/edit-seller");
      }
    } catch (error) {
      alert("Login failed: " + error.response.data);
    }
  };

  return (
    <div className="wrapperr">
      <Sidebar />
      <table className="login-table">
        <tbody>
          <tr>
            <td colSpan="2" className="text-center mt-4 name">Admin Login Form</td>
          </tr>
          <tr>
            <td colSpan="2" className="text-center logo">
              {/* Picture */}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="text-center">
              <button type='submit' className="btn mt-3" onClick={onSubmit}>Login</button>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="text-center fs-6">
              <Link to="/register-admin">Forget-Password</Link> or <Link to="/register-admin">Sign-Up</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
