// //import React from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';



// const Product = () => {

//   const handleClick = () => {
//     // Redirect to the desired page
//     window.location.href = '/bid-page';
//   };
  
//     const [product,setproduct]=useState([])
//   useEffect(()=>{
//     //console.log("Page is Working");
//     loadproduct();

//   },[]);


//  const {product_id}=useParams()

//   const loadproduct=async()=>{
//     const result=await axios.get("http://localhost:8090/get-product");
//     setproduct(result.data);
//   }


  

//     return (
     
//         <div>
          
//             <div className='main-container '>
           

//             </div>
//             <div className='content-container '>
//                 { (
//                     <div className="employee-details">
//                        <h3><center>Product details</center></h3>
//                        <hr/>
//                        <div className='table-container'>
                        
//                        <table className="table shadow">
//   <thead>
//     <tr>
//       <th scope="col">Product Id</th>
//       <th scope="col">Product Name</th>
//       <th scope="col">Starting Price</th>
//       <th scope="col">Description</th>
//       <th scope="col">Author</th>
//       <th scope="col">Email</th>
//       <th scope="col" colSpan={2}>Action</th>
      
      
//     </tr>
//   </thead>
//   <tbody>
//     {
//       product.map((product)=>(
//       <tr>
//           {/* <th scope="row" key={index}>{index+1}</th> */}
//           <td>{product.product_id}</td>
//           <td>{product.productname}</td>
//           <td>{product.startingprice}</td>
//           <td>{product.description}</td>
//           <td>{product.author}</td>
//           <td>{product.email}</td>
//          <td>
//          <button onClick={handleClick}>Go to Bid Page</button>
//          </td>
         
        
          
           
          
          
          
//     </tr>
//       ))
//     }
    
//   </tbody>
// </table>
// </div>
       
                      

//                     </div>
                    

//                 )}
              
//             </div>
            
//         </div>  
           
//     );
// };



// export default Product;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './Product.css'; // Import CSS file
const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8090/get-product");
    setProducts(result.data);
  }

  const handleClick = () => {
    // Redirect to the desired page
    window.location.href = '/bid-page';
  };

  return (
    <div>
      <h3><center>Product details</center></h3>
      <hr />
      <div className="thumbnails-container">
        {products.map(product => (
          <div className="thumbnail" key={product.product_id}>
            <div className="thumbnail-content">
              <h4>{product.productname}</h4>
             
              <p>Description: {product.description}</p>
              
              <p>Email: {product.email}</p>
              <p>Starting Price: {product.startingprice}</p>
              <button onClick={handleClick}>Go to Bid Page</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
