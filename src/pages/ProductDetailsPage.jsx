import { useState } from "react";
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import axios from "axios"

function ProductDetailsPage() {
  // The state variable `product` is currently an empty object {},
  // but you should use it to store the response from the Fake Store API (the product details).
  const [product, setProduct] = useState(null);

  const { productId } = useParams();
  // The `productId` coming from the URL parameter is available in the URL path.
  // You can access it with the `useParams` hook from react-router-dom.


  // To fetch the product details, set up an effect with the `useEffect` hook:
  useEffect(() => {
    // Inside the effect, make an HTTP GET request to the Fake Store API endpoint for a single product using `axios`.
    getProduct();
  }, [productId]); // Fetch again if the URL product id changes.

  async function getProduct() {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
      // After receiving the response, update the `products` state variable with the data from the API.
      // console.log(response.data);
      setProduct(response.data);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  if (product === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ProductDetailsPage">
      {/* Render product details here */}
      <div className="product-details-card">
        <div className="product-details-content">
          <img
            className="product-details-image"
            src={product.image}
            alt={product.title}
          />

          <p className="product-details-category">{product.category}</p>
          <h1 className="product-details-title">{product.title}</h1>

          <div className="product-details-summary">
            <p className="product-details-description">{product.description}</p>
            <p className="product-details-price">${product.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="product-details-actions">
          <Link className="product-details-back" to="/">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
