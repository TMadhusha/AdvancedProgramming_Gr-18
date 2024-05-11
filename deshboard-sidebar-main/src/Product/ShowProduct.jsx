






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './Product.css'; // Import CSS file
import Sidebar from '../components/Sidebar';
const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8080/get-product");
    setProducts(result.data);
  }

  const handleClick = () => {
    // Redirect to the desired page
    window.location.href = '/bid-page';
  };

  return (
    <div>
      <Sidebar/>
      <h3><center>Product details</center></h3>
      <hr />
      <div className="thumbnails-container">
        {products.map(product => (
          <div className="thumbnail" key={product.product_id}>
            <div className="thumbnail-content">
              <h4>{product.productname}</h4>
             
              <p>Description: {product.description}</p>
              
              <p>Email: {product.email}</p>
              <p>Starting Price: {product.startingprice}</p>
              <button onClick={handleClick}>Go to Bid Page</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
