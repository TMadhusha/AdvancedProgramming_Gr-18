import React, { useEffect, useState } from 'react'
import Sellerbar from '../components/Sellerbar';

export default function AddProducts() {
  //storing the username
  const [userName, setUserName] = useState('');

  useEffect(() => {
      // Retrieve username from sessionStorage
      const storedUserName = sessionStorage.getItem('userName');
      if (storedUserName) {
          setUserName(storedUserName);
      }
  }, []);
  
  return (
    <div>
      <div>
        <Sellerbar userName={userName}/>
      </div>
      Add Products

    </div>
  )
}
