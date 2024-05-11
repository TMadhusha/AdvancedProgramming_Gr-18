import React, { useEffect, useState } from 'react'
import Adminbar from '../components/Adminbar'

export default function CustomerDetails() {
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
        <Adminbar userName={userName}/>
        <div>
            <div>
                <h1>Customer Details</h1>
            </div>
        </div>
    </div>

  )
}
