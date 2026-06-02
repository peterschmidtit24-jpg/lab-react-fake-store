import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom";
import axios from "axios"

function ProductListPage() {
  // The state variable `products` is currently an empty array [], 
  // but you should use it to store the response from the Fake Store API (the list of products).
  const [products, setProducts] = useState(null);

  // To fetch the list of products, set up an effect with the `useEffect` hook:
  useEffect(() => {
    // Inside the effect, make an HTTP GET request to the Fake Store API endpoint for products using `axios`.
    getData();

  }, []); // The empty dependency array [] ensures that the effect runs only once when the component mounts.

  async function getData() {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      // After receiving the response, update the `products` state variable with the data from the API.
      // console.log(response.data);
      setProducts(response.data);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // for evetual wait time  during loading the data, you can conditionally render a loading message or spinner until the products are fetched and stored in the state.
  if (products === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ProductListPage">
      {/* Render list of products here */}
      <h1>Product List</h1>

      <div className="product-list">
        {products.map((product) => (
          <Link to={`/product/details/${product.id}`} key={product.id}>
            <div className="product-list-item" key={product.id}>
              <img
                className="product-list-image"
                src={product.image}
                alt={product.title}
              />

              <h2 className="product-list-title">{product.title}</h2>
              <p className="product-list-category">{product.category}</p>
              <p className="product-list-price">${product.price.toFixed(2)}</p>
              <p className="product-list-description">{product.description}</p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default ProductListPage;
