import React, { useEffect, useState } from 'react'
import Adminbar from '../components/Adminbar';

export default function Allbids() {
    //storing the username
  const [userName, setUserName] = useState('');

  useEffect(() => {
      // Retrieve username from sessionStorage
      const storedUserName = sessionStorage.getItem('userName');
      if (storedUserName) {
          setUserName(storedUserName);
      }
  }, []);

    const [bids,setBids]=useState();


  return (
    <div>
        <div>
            <Adminbar userName={userName}/>
        </div>
        Allbids

    </div>
  )
}
