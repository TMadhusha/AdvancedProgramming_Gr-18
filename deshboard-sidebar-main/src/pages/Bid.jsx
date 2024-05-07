import React from 'react';

export default function Bid(props) {
    // Destructure product from props.location.state with null checking
    const { product } = props.location.state || {};

    // Check if product is available before rendering its details
    if (!product) {
        return <div>Loading...</div>; // Display a loading message if product is not available
    }

    return (
        <div>
            <h1>Product Details</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Product Name:</td>
                        <td>{product.product_name}</td>
                    </tr>
                    <tr>
                        <td>Description:</td>
                        <td>{product.description}</td>
                    </tr>
                    {/* Add more product details as needed */}
                </tbody>
            </table>
        </div>
    );
}
