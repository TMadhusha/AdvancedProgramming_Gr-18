import React, { useEffect, useState } from 'react'
import Adminbar from '../components/Adminbar'

export default function () {
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
            <Adminbar userName={userName}/>
        </div>
        <div>
            Welcome to Admin Dashboard
        </div>
    </div>
  )
}
