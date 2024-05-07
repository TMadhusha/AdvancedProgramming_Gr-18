import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/product",
      name: "Product",
    },
    {
      path: "/seller",
      name: "Seller",
    },
    {
      path: "/bid/:id",
      name: "Bid",
    }
  ];

  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section">
          <h1 className="logo">Jewelry Online Auction System</h1>
          <div className='container' style={{ gap: "20px", paddingLeft: "30%" }}>
            {menuItem.map((item, index) => (
              <NavLink to={item.path} key={index} className="link" activeClassName="active">
                <div className="link_text">{item.name}</div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
