import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function formatPrice(price) {
  const num = Number(price);
  if (Number.isNaN(num)) return "$0.00";
  return `$${num.toFixed(2)}`;
}

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { _id, id, category, name, image_link, price } = product;

  const productId = _id || id;

  const handleOpen = () => {
    if (productId) navigate(`/products/${productId}`);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="pro" onClick={handleOpen} style={{ cursor: "pointer" }}>
      <img
        src={image_link}
        alt={name || "Product"}
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
      />

      <div className="des">
        <span>{category || "brand"}</span>
        <h5>{name || "Description Item"}</h5>
        <div className="star">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
        <h4>{formatPrice(price)}</h4>
      </div>

      <button className="cart" onClick={handleAdd}>
        <i className="fal fa-shopping-cart"></i>
      </button>
    </div>
  );
}
