import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const menuItem=[
        {
            path:"/",
            name:"Home",
        },
        {
            path:"/product",
            name:"Product",
            
        },
        {
            path:"/seller",
            name:"Seller",
            
            
        },
        {
            path:"/register",
            name:"Register",
            subItems:[
                {
                    path:"/customer-register",
                    name:"Customer Register"
                },
                {
                    path:"/seller-register",
                    name:"Seller Regiter"
                }             
            ]            
        },
        {
            path:"/login",
            name:"Log In",
            subItems:[
                {
                    path:"/admin-login",
                    name:"Admin"

                },
                {
                    path:"/customer-login",
                    name:"Customer"
                },
                {
                    path:"/seller-login",
                    name:"Seller"
                }             
            ]      
        }
    ]
    return (
        <div className="container">
            <div className="sidebar">
                <div className="top_section">
                    <h1 className="logo">Jewelry Online Auction System</h1>
                    <div className='container' style={{ gap: "20px", paddingLeft: "30%" }}>
                        {menuItem.map((item, index) => (
                            <div key={index}>
                                <NavLink to={item.path} className="link" activeClassName="active">
                                    <div className="link_text">{item.name}</div>
                                </NavLink>
                                {item.subItems && isOpen &&
                                    <div className="dropdown">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <NavLink to={subItem.path} key={subIndex} className="sub-link" activeClassName="active">
                                                <div className="sub-link-text">{subItem.name}</div>
                                            </NavLink>
                                        ))}
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;