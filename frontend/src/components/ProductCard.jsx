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

  const { _id, category, name, image, price } = product;

  const handleOpen = () => {
    if (_id) navigate(`/product/${_id}`);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="pro" onClick={handleOpen}>
      <img src={image || "/img/products/f1.jpg"} alt={name || "Product"} />
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
