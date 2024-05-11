import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaProductHunt, FaLock, FaHome, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons library
import axios from 'axios';

export default function Customerbar({userName}) {
    const [openSubItemIndex, setOpenSubItemIndex] = useState(null);
    
    const toggleSubMenu = (index) => {
        setOpenSubItemIndex(openSubItemIndex === index ? null : index);
    };

    const menuItem = [
        {
            path: "/cx-seller",
            name: "Seller",
            icon: <FaShoppingCart /> // Shopping cart icon
        },
        {
            path: "/cx-products",
            name: "All Products",
            icon: <FaProductHunt /> // Product icon
        },
        {
            path: "/my-bids",
            name: "My Bids",
            icon: <FaLock /> // Lock icon
        },
        {
            path: "/account",
            name: "My Account",
            icon: <FaUser /> // User icon
        },
        {
            path: "/",
            name: "Logout",
            icon: <FaSignOutAlt /> // Logout icon
        }
    ];

    return (
        <div className="container">
            <div className="sidebar">
                <div className="top_section">
                    <h1>Welcome {userName}</h1> {/* Update title to "Customer" */}
                    <div className='container' style={{ gap: "20px", paddingLeft: "32%" }}>
                        {menuItem.map((item, index) => (
                            <div key={index}>
                                {item.subItems ? (
                                    <div className="link" onClick={() => toggleSubMenu(index)}>
                                        <div className="link_text">
                                            {item.icon} {/* Render icon */}
                                            {item.name}
                                        </div>
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
                                        <div className="link_text">
                                            {item.icon} {/* Render icon */}
                                            {item.name}
                                        </div>
                                    </NavLink>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
