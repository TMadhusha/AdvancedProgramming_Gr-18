import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
    const [openSubItemIndex, setOpenSubItemIndex] = useState(null);

    const toggleSubMenu = (index) => {
        setOpenSubItemIndex(openSubItemIndex === index ? null : index);
    };

    const menuItem = [
        {
            path: "/",
            name: "Home",
        },
        {
            path: "/show-product",
            name: "Product",
        },
        {
            path: "/seller",
            name: "Seller",
        },
        {
            path: "/register",
            name: "Register",
            subItems: [
                {
                    path: "/register-seller",
                    name: "Seller"
                },
                {
                    path: "/register-customer",
                    name: "Customer"
                }
            ]
        },
        {
            path: "/login",
            name: "Log In",
            subItems: [
                {
                    path: "/dashborard",
                    name: "Admin"
                },
                {
                    path: "/login-seller",
                    name: "Seller"
                },
                {
                    path: "/login-customer",
                    name: "Customer"
                }
            ]
        },
    ];

    return (
        <div className="container">
            <div className="sidebar">
                <div className="top_section">
                    <h1 className="logo">Jewelry Online Auction System</h1>
                    <div className='container' style={{ gap: "20px", paddingLeft: "25%" }}>
                        {menuItem.map((item, index) => (
                            <div key={index}>
                                {item.subItems ? (
                                    <div className="link" onClick={() => toggleSubMenu(index)}>
                                        <div className="link_text">{item.name}</div>
                                        {openSubItemIndex === index && (
                                            <ul className="sub_items">
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <NavLink
                                                            to={subItem.path}
                                                            className="sub_link"
                                                            activeClassName="active"
                                                        >
                                                            {subItem.name}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <NavLink to={item.path} className="link" activeClassName="active">
                                        <div className="link_text">{item.name}</div>
                                    </NavLink>
                                )}
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
