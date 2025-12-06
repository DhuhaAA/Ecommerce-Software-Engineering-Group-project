import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, subtotal, totalItems, clearCart, removeFromCart } = useCart();

  return (
    <>
      <section id="page-header">
        <h2>Your Shopping Cart</h2>
        <p>Review your items and proceed to checkout.</p>
      </section>

      <section id="cart" className="section-p1">
        <div id="cart-items" style={{ flex: 2 }}>
          {items.length === 0 && <p>Your cart is empty.</p>}
          {items.map(({ product, qty }) => (
            <div
              key={product._id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
                gap: "1rem",
              }}
            >
              <img
                src={product.image || "/img/products/f1.jpg"}
                alt={product.name}
                style={{ width: 80, height: 80, borderRadius: 8 }}
              />
              <div style={{ flex: 1, textAlign: "left" }}>
                <h4>{product.name}</h4>
                <p>Qty: {qty}</p>
                <p>${Number(product.price || 0).toFixed(2)}</p>
              </div>
              <button
                className="normal"
                onClick={() => removeFromCart(product._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div id="cart-summary" style={{ flex: 1, marginLeft: "2rem" }}>
          <h3>Order Summary</h3>
          <p>
            Total items: <span id="summary-items">{totalItems}</span>
          </p>
          <p>
            Subtotal: $<span id="summary-subtotal">{subtotal.toFixed(2)}</span>
          </p>
          <button id="clear-cart" className="normal" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </section>
    </>
  );
}
