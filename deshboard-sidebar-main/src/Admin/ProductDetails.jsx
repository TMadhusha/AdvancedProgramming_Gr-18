import React, { useState } from 'react'
import Adminbar from '../components/Adminbar'

export default function ProductDetails() {
    const [products,setProducts]=useState(false);
    
  return (
    <div>
        <Adminbar/>
        <div>
            <div>
                <h1>Product Details</h1>
            </div>
            <div>
            <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Author</th>
      <th scope="col">Description</th>
      <th scope="col">Starting Price </th>
      <th scope="col" colSpan={'2'}>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</table>
            </div>
        </div>
    </div>
  )
}
