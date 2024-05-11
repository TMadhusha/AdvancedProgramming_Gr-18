import React, { useEffect, useState } from 'react'
import Adminbar from '../components/Adminbar'

export default function Bids() {
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
            Bids
    </div>
  )
}
