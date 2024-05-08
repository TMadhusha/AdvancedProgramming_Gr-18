import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const SidebarSeller = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const menuItem=[
        {
            path:"/logout",
            name:"Home",
        },
        {
            path:"/add-product",
            name:"Add Product",
        },
        {
            path:"/password-change",
            name:"Password Managaner",
        },
        {
            path:"/logout",
            name:"Logout",
            
        }]
    return (
        <div className="container">
           <div  className="sidebar">
               <div className="top_section">
                   <h1 className="logo">Seller Feed</h1>
                   <div className='container' style={{gap:"20px", paddingLeft:"30%"}}>
                   {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
                </div>
               </div>    
           </div>
           <main>{children}</main>
        </div>
    );
};

export default SidebarSeller;