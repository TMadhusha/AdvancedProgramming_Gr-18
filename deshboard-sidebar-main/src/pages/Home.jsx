import React from 'react'
import Sidebar from '../components/Sidebar'
import img1 from '../pages/jwl.jpg'
import img2 from '../pages/jwl2.jpg'

export default function Home() {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="home-content">
        <div className="image-section">
          {/* Image section with rounded shape */}
          <div >
            <img src={img1} className='rounded-image'/>
          </div>
        </div>
        <div className="text-section">
        <div className="rounded-text">
            <h2>Welcome to Jewelry Online Auction System</h2>
            <p>
            An online jewelry auction system transforms the buying and selling of valuable jewelry 
            with its dynamic platform. It offers a wide range of exquisite pieces, enabling users to 
            bid from home. Through advanced technology and secure transactions, it ensures transparency 
            and authenticity. Bidirectional communication allows engagement between buyers and sellers, 
            fostering a vibrant marketplace. Detailed information empowers informed purchasing decisions. 
            </p>
          </div>
          {/* Text section with rounded shape */}
          <div >
            <img src={img2} className="rounded-image1"/>
          </div>
        </div>
      </div>
    </div>
  )
}