import React from 'react'

export default function Adminbar() {
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
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
            path:"/customer",
            name:"Customer",
            
            
        },
        {
            path:"/bids",
            name:"Bids",
        },
        {
            path:"/changePwd",
            name:"Change Password",
        },
        {
            path:"/login",
            name:"Logout"
        }
    ]
  return (
    <div className="container">
           <div  className="sidebar">
               <div className="top_section">
                   <h1 className="logo">Jewelry Online Auction System</h1>
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
  )
}
