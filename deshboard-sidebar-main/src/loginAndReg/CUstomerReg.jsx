import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Reg.css'
export default function CustomerRegister() {
  let navigate = useNavigate();

  const handleCancel = () => {
    // Clear form data
    setCustomerReg({
      username: '',
      role: '',
      phonenumber: '',
      email: '',
      password: '',
      address: '',
      dob: '',
      conpassword: '',
    });
  };

  const [customerReg, setCustomerReg] = useState({
    username: '',
    role: '',
    phonenumber: '',
    email: '',
    password: '',
    address: '',
    dob: '',
    conpassword: '',
  });

  useEffect(() => {
    console.log('Welcome To Seller Page..');
  });

  const { username, role, phonenumber, email, password, address, dob, conpassword } = customerReg;

  const onInputChange = (e) => {
    setCustomerReg({ ...customerReg, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const namePattern = /^[a-zA-Z_]+$/;

    if (!namePattern.test(username)) {
      alert('First-name can only contain letters and underscores.');
    } else if (!namePattern.test(role)) {
      alert('Last-name can only contain letters and underscores.');
    } else if (password !== conpassword) {
      alert('Passwords Are Not Match try again...');
    } else {
      try {
        await axios.post('http://localhost:8080/register-customer', customerReg);
        alert('Registration Completed...');
        navigate('/login-customer');
        handleCancel();
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert(error.response.data.errorMessage);
        } else {
          console.error('An error occurred:', error);
          alert('An error occurred while registering. Please try again later.');
        }
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="wrapperr">
        <div className="text-center mt-4 name">Registration Form</div>
        <form className="p-3 mt-3" onSubmit={(e) => onSubmit(e)}>
          <table>
            <tbody>
              <tr>
                <td>User Name</td>
                <td>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="User Name"
                    value={username}
                    required
                    onChange={(e) => onInputChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Role</td>
                <td>
                  <select
                    name="role"
                    id="role"
                    value={role}
                    required
                    onChange={(e) => onInputChange(e)}
                  >
                    <option value="">Select Role</option>
                    <option value="user">Seller</option>
                    <option value="customer">Customer</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>
                  <input
                    type="number"
                    name="phonenumber"
                    id="phonenumber"
                    placeholder="Phone Number"
                    value={phonenumber}
                    required
                    maxLength={10}
                    onChange={(e) => onInputChange(e)}
                  />
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
                    required
                    onChange={(e) => onInputChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  <textarea
                    name="address"
                    id="address"
                    placeholder="Address"
                    value={address}
                    required
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>Date Of Birth</td>
                <td>
                  <input
                    type="text"
                    name="dob"
                    id="dob"
                    placeholder="YYYY-MM-DD"
                    value={dob}
                    required
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
                    minLength={8}
                    required
                    onChange={(e) => onInputChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Confirm Password</td>
                <td>
                  <input
                    type="password"
                    name="conpassword"
                    id="conpassword"
                    placeholder="Confirm Password"
                    minLength={8}
                    value={conpassword}
                    required
                    onChange={(e) => onInputChange(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="form-field2 d-flex align-items-center">
            <button className="btn mt-3" type="submit">
              Submit
            </button>
          </div>
          <div className="form-field2 d-flex align-items-center">
            <button onClick={handleCancel} className="btn mt-3" type="reset">
              Cancel
            </button>
          </div>
        </form>
        <div className="text-center fs-6">
          <Link to="/login-customer">Sign-in</Link>
        </div>
      </div>
    </div>
  );
}
