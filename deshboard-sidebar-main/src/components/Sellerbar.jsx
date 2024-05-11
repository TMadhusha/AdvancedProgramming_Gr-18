import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

export default function Sellerbar({userName}) {
    const [openSubItemIndex, setOpenSubItemIndex] =useState(null);

    const toggleSubMenu = (index) => {
        setOpenSubItemIndex(openSubItemIndex === index ? null : index);
    };

    const menuItem=[
        {
            path:"/seproducts",
            name:"All Products",
        },
        {
            path:"/addproducts",
            name:"Add New Product",
        },
        {
            path:"/myaccount",
            name:"My Account",
        },
        {
            path:"/home",
            name:"Logout"
        }
    ]
  return (
    <div className="container">
           <div  className="sidebar">
               <div className="top_section">
                <h1>Welcome {userName}</h1>
                   <div className='container' style={{gap:"20px", paddingLeft:"32%"}}>
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
        </div>
  )
}
