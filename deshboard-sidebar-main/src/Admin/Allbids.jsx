import React, { useEffect, useState } from 'react'
import Adminbar from '../components/Adminbar';
import axios from 'axios';

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

    const [bids,setBids]=useState([]);
    const [products,setProducts]=useState([]);
    const [pro_id, setPro_id] = useState('');
    const[cus_id,setcus_id]=useState('cus_id')

    const loadbids=async() =>{
        const result=await axios.get("http://localhost:8080/bids");
        setBids(result.data);
    }

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/inventory');
            if (!response.ok) {
                throw new Error('Failed to fetch product data');
            }
            //const data = await response.json();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching product data:', error);
            Window.alert('Failed to fetch product data. Please try again later.');
        }
    };

    useEffect(()=>{
        loadbids();
        fetchProducts();
    },[]);


  return (
    <div>
        <div>
            <Adminbar userName={userName}/>
        </div>
        <div>
            <h1>All bids</h1>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                       <th>Bid ID</th>
                        <th>Product ID</th>
                       <th>Customer Name</th> 
                       <th>Bid price</th>
                       <th>Date</th>     
                    </tr>
                    </thead>
                    <tbody>
                        {bids.map((bids,index) => (
                            <tr key={index}>
                                <td>{bids.bid_id}</td>
                                <td>{bids.inventory ? bids.inventory.pro_id : ''}</td>
                                {console.log(bids)}
                                <td>{bids.customer ? bids.customer.userName : userName}</td>

                                <td>{bids.bidPrice}</td>
                                <td>{bids.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    </div>
  )
}
