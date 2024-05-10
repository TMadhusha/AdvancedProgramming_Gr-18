import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Product from './pages/Product.jsx';
import Customer from './pages/Customer.jsx';
import Home from './pages/Home.jsx';
import Seller from './pages/Seller.jsx';
import Dashborard from './pages/Dashborard.jsx';
import Bids from './pages/Bids.jsx';
import CustomerDetails from './Admin/CustomerDetails.jsx';
import SellerDetails from './Admin/SellerDetails.jsx';
import ProductDetails from './Admin/ProductDetails.jsx';
import CxSeller from './Customer/CxSeller.jsx';
import CxProducts from './Customer/CxProducts.jsx';
import MyBids from './Customer/MyBids.jsx';
import CustomerRegistration from './LoginsAndRegistration/CustomerRegistration.jsx';
import SellerRegistration from './LoginsAndRegistration/SellerRegistration.jsx';
import SellerLogin from './LoginsAndRegistration/SellerLogin.jsx';
import CustomerLogin from './LoginsAndRegistration/CustomerLogin.jsx';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/product" element={<Product />} />
          <Route path='/dashborard' element={<Dashborard/>}/>
          <Route path='/bids' element={<Bids/>}/>
          <Route path='/customerdetails' element={<CustomerDetails/>}/>
          <Route path='/sellerdetails' element={<SellerDetails/>}/>
          <Route path='/productdetails' element={<ProductDetails/>}/>
          <Route path='/cx-seller' element={<CxSeller/>}/>
          <Route path='/cx-products' element={<CxProducts/>}/>
          <Route path='/my-bids' element={<MyBids/>}/>
          <Route path='/customerregistration' element={<CustomerRegistration/>}/>
          <Route path='/sellerregistration' element={<SellerRegistration/>}/>
          <Route path='/sellerlogin' element={<SellerLogin/>}/>
          <Route path='/customerlogin' element={<CustomerLogin/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default App;