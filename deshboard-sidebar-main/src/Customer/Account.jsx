import React, { useEffect, useState } from 'react'
import Customerbar from './Customerbar';

export default function Account() {
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
            <Customerbar userName={userName}/>
        </div>
        Acconut
    </div>
  )
}
