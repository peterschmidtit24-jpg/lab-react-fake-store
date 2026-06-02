import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

function CartPage() {

    const [carts, setCarts] = useState(null);

    useEffect(() => {
        getCarts();  
    }, []);

    async function getCarts() {
        try {
            
            const response = await axios.get("https://fakestoreapi.com/carts");
            console.log(response.data);
            setCarts(response.data);
        } catch (error) {
            console.error("Error fetching carts:", error);
        }   
    }

    if (carts === null) {
        return <div>Loading...</div>;
    }

    return (
        // display the list of carts
        <div className="cart-page">
            <h1>Cart Page</h1>

            <div className="cart-list">
                {carts.map((cart) => (
                    <div className="cart-list-item" key={cart.id}>
                        <h2 className="cart-list-title">Cart #{cart.id}</h2>
                        <p className="cart-list-user">User #{cart.userId}</p>
                        <p className="cart-list-date">
                            {new Date(cart.date).toLocaleDateString()}
                        </p>
                        <p className="cart-list-count">
                            {cart.products.length} products
                        </p>
                        <div className="cart-list-products">
                            {cart.products.map((product) => (
                                <span
                                    className="cart-list-product"
                                    key={product.productId}
                                >
                                    ID {product.productId}: x{product.quantity}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                {/*  a Back to homepage button*/}
                <Link to="/">
                    <button className="back-button mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Back to homepage
                    </button>
                </Link>                
            </div>

        </div>
    )
}

export default CartPage
