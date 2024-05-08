import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SidebarSeller from '../loginAndReg/SidebarSeller';


export default function Addproduct() {

  let navigate=useNavigate()

  const handleCancel = () => {
    // Clear form data
    setproduct({
        productname:"",
        startingprice:"",
        description:"",
        author:"",
        email:"",
    
    });
  };

  const [product,setproduct]=useState({
    productname:"",
    startingprice:"",
    description:"",
    author:"",
    email:"",

  })
  useEffect(()=>{
    console.log("Welcome To Supplier Page..")
  })

  const{productname,startingprice,description,author,email}=product

  const onInputChange=(e)=>{
    setproduct({...product,[e.target.name]:e.target.value})

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const letterPattern = /^[a-zA-Z_]+$/;
    const numberPattern = /^[0-9_]+$/;
  
    if (!letterPattern.test(productname)) {
      alert("Name can only contain letters and underscores.");
    } else if (!letterPattern.test(description)) {
        alert("Description can only contain letters and underscores.");
      } else if (!letterPattern.test(author)) {
        alert("Author can only contain letters and underscores.");
      } else  {
      // If all validations pass, submit the form
      await axios.post("http://localhost:8080/add-product", product);
            handleCancel();
            alert("The product was successfully added...");
    //   navigate("/supplier");
    }
  };
  

return(
  <div>
    
    <SidebarSeller/>
  <div className="container">
  
    <div className='main-container'>
      <div>

          <h2 className='text-center m-4'>Supplier Registeration</h2><hr/>
          <form onSubmit={(e) => onSubmit(e)} className='form'>
  <table className='table'>
    <tbody>


      <tr>
        <td>

          <label htmlFor='name' className='form-label'>Product Name:</label>
        </td>
        <td>
          <input
            type={"text"}
            className='form-control'
            placeholder='product Name'
            name="productname"
            required
            value={productname}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>


      <tr>
        <td>
          <label htmlFor='quantity' className='form-label'>Starting Price</label>
        </td>
        <td>
          <input
            type={"number"}
            className='form-control'
            placeholder='15,000'
            name="startingprice"
            required
            value={startingprice}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>

      <tr>
  <td>
    <label htmlFor='description' className='form-label'>Description</label>
  </td>
  <td>
    <textarea
      className='form-control'
      placeholder='Type Something to show '
      name="description"
      required
      value={description}
      onChange={(e) => onInputChange(e)}
    ></textarea>
  </td>
</tr>


      <tr>
        <td>
          <label htmlFor='item_ID' className='form-label'>Author</label>
        </td>
        <td>
          <input
            type={"text"}
            className='form-control'
            placeholder='owner'
            name="author"
            required
            value={author}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>


      <tr>
        <td>
          <label htmlFor='email' className='form-label'>Email</label>
        </td>
        <td>
          <input
            type={"email"}
            className='form-control'
            placeholder='John@gmail.com'
            name="email"
            required
            value={email}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>

      
    </tbody>
  </table>
  <button type='submit' className='btn'>Submit</button>
  <span style={{ marginRight: '10px' }}></span>
  <button onClick={handleCancel} className="btn mt-3" type="reset">Cancel</button>
  <Link className='btn btn-danger mx-2' to="/logout">Exit</Link>
</form>

      </div>
    </div>
    
  </div>
  </div>
)
}

