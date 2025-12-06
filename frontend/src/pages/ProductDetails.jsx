import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <section className="section-p1">
        <p>Loading product...</p>
      </section>
    );
  }

  return (
    <>
      <section id="prodetails" className="section-p1">
        <div className="single-pro-image">
          <img
            src={product.image || "/img/products/f1.jpg"}
            width="100%"
            id="MainImg"
            alt={product.name}
          />
        </div>

        <div className="single-pro-details">
          <h6>{product.category || "Category"}</h6>
          <h4>{product.name}</h4>
          <h2>${Number(product.price || 0).toFixed(2)}</h2>
          <select>
            <option>Select Size</option>
            <option>XXL</option>
            <option>XL</option>
            <option>Large</option>
            <option>Medium</option>
            <option>Small</option>
          </select>
          <input type="number" defaultValue={1} min={1} />
          <button
            className="normal"
            onClick={() => addToCart(product, 1)}
          >
            Add To Cart
          </button>
          <h4>Product Details</h4>
          <span>{product.description || "No description provided."}</span>
        </div>
      </section>
    </>
  );
}
