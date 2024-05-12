import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    let navigate=useNavigate();
    const [seller_id, setSellerId] = useState("");

    const [inventory,setInventory]=useState({
        pro_id:"",
        pro_name:"",
        description:"",
        seller_id:"",
        //author:"",
        startingPrice:"",
        image:null
    });

    const{pro_id,pro_name,description,startingPrice,image}=inventory;

     // Function to fetch the last att_id from the backend and increment it
  const fetchLastProId = async () => {
    try {
      const result = await axios.get("http://localhost:8080/inventory");
      const lastPro = result.data[result.data.length - 1];
      const lastProId = lastPro ? parseInt(lastPro.pro_id) : 0; // Extract the number part and convert to integer
      const newProId = `${String(lastProId + 1)}`; // Increment the number part and format it
      setInventory(prevInventory => ({
        ...prevInventory,
        pro_id: newProId
      }));
      // Assuming seller_id is also fetched here
    setSellerId(lastPro?.seller?.seller_id || "");
    } catch (error) {
      console.error("Error fetching last product id:", error);
    }
  };

  useEffect(()=>{
    fetchLastProId();
  },[])

const onChangeInput = (e) => {
    if (e.target.name === "image") {
        // Set the image file to state
        setInventory({ ...inventory, image: e.target.files[0] });
    } else if (e.target.name === "seller_id") {
        setSellerId(e.target.value);
      } else {
        setInventory({ ...inventory, [e.target.name]: e.target.value });
      }
};


const onSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append("pro_id", pro_id);
        formData.append("pro_name", pro_name);
        formData.append("description", description);
        formData.append("seller_id",seller_id);
        //formData.append("author", author);
        formData.append("startingPrice", startingPrice);
        formData.append("image", image);

        await axios.post("http://localhost:8080/inventory", formData, {
            headers: {
                "Content-Type": "multipart/form-data" // Set content type to multipart/form-data
            }
        });

        window.alert("Product added successfully...");

        // After successfully adding the product, reset the form and navigate away
        setInventory({
            pro_id: "",
            pro_name: "",
            description: "",
          //  author: "",
            startingPrice: "",
            image: null
        });
        setSellerId("");


    } catch (error) {
        console.error("Error adding product:", error);
        window.alert("Failed to add product. Please try again.");
    }
};

  return (
    <div>
        <div>
            <form onSubmit={(e) => onSubmit(e)} className='forms'>
                <table>
                    <tbody>
                        <tr>
                            <td>Product ID:</td>
                            <td><input type='number' name="pro_id" placeholder='Product ID' value={pro_id} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Product Name:</td>
                            <td><input type='text' name="pro_name" placeholder='Product Name' value={pro_name} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Author ID:</td>
                            <td><input type='text' name="seller_id" placeholder='SellerID' value={seller_id} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        {/* <tr>
                            <td>Product Author:</td>
                            <td><input type='text' name="author" placeholder='Author' value={author} onChange={(e) => onChangeInput(e)}/></td>
                        </tr> */}
                        <tr>
                            <td>Description:</td>
                            <td><input type='text' name="description" placeholder='Description' value={description} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                            <td>Starting price:</td>
                            <td><input type='text' name="startingPrice" placeholder='Starting price' value={startingPrice} onChange={(e) => onChangeInput(e)}/></td>
                        </tr>
                        <tr>
                                <td>Image:</td>
                                <td><input type='file' name="image" onChange={(e) => onChangeInput(e)} /></td>
                        </tr>
                        <tr className='button-container'>
                            <td><button type='submit'>Add</button></td>
                            <td><button>Cancel</button></td>
                        </tr>

                    </tbody>
                </table>
            </form>
        </div>
    </div>
  )
}
