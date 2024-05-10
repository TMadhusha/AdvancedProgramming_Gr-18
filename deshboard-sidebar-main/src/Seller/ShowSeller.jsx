//import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Seller = () => {
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    loadseller();
  }, []);

  const loadseller = async () => {
    try {
      const response = await axios.get("http://localhost:8080/get-seller");
      setSellers(response.data);
    } catch (error) {
      console.error("Error loading sellers:", error);
    }
  };

  return (
    <div>
      <div className='main-container '>
      </div>
      <div className='content-container '>
        <div className="employee-details">
          <h3><center>Seller details</center></h3>
          <hr/>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th scope="col">Seller Name</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller, index) => (
                  <tr key={index}>
                    <td>{seller.username}</td>
                    <td>{seller.phonenumber}</td>
                    <td>{seller.email}</td>
                    <td>{seller.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>  
  );
};

export default Seller;
