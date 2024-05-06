import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Product from './pages/Product.jsx';
import Customer from './pages/Customer.jsx';
import Home from './pages/Home.jsx';
import Seller from './pages/Seller.jsx';
import SellerRegister from './loginAndReg/SellerRegister.jsx';
import LoginSeller from './loginAndReg/LoginSeller.jsx';


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/product" element={<Product />} />
          <Route path="/register-seller" element={<SellerRegister />} />
          <Route path="/register-login" element={<LoginSeller />} />
          
        </Routes>
    </BrowserRouter>
  );
};

export default App;