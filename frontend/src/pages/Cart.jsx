
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";


const API_BASE_URL = "http://10.0.0.17:5000"; // TODO# REMOVE SOON
const CHECKOUT_ENDPOINT = `${API_BASE_URL}/payment`;
export default function Cart() {
  const { items, subtotal, totalItems, clearCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${CHECKOUT_ENDPOINT}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ product, qty }) => ({
            id: product._id,
            name: product.name,
            price: product.price,
            quantity: qty,
          })),
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Checkout error:", text);
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();

      if (!data.url) {
        throw new Error("No checkout URL returned from server");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong during checkout.");
      setLoading(false);
    }
  };

  return (
    <>
      <section id="page-header">
        <h2>Your Shopping Cart</h2>
        <p>Review your items and proceed to checkout.</p>
      </section>

      <section
        id="cart"
        className="section-p1"
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Cart Items */}
        <div id="cart-items" style={{ flex: 2, minWidth: "280px" }}>
          {items.length === 0 && <p>Your cart is empty.</p>}

          {items.map(({ product, qty }) => (
            <div
              key={product._id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
                gap: "1rem",
                borderBottom: "1px solid #eee",
                paddingBottom: "1rem",
              }}
            >
              <img
                src={product.image_link || "/img/products/f1.jpg"}
                alt={product.name}
                style={{ width: 80, height: 80, borderRadius: 8 }}
              />
              <div style={{ flex: 1, textAlign: "left" }}>
                <h4 style={{ margin: 0 }}>{product.name}</h4>
                <p style={{ margin: "0.25rem 0" }}>
                  Price: ${product.price?.toFixed(2) ?? "0.00"}
                </p>
                <p style={{ margin: "0.25rem 0" }}>Qty: {qty}</p>
                <p style={{ margin: "0.25rem 0" }}>
                  Item Total: ${(product.price * qty).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(product._id)}
                style={{
                  border: "none",
                  background: "#ff4d4f",
                  color: "#fff",
                  padding: "0.4rem 0.75rem",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {items.length > 0 && (
            <button
              onClick={clearCart}
              style={{
                marginTop: "1rem",
                border: "1px solid #888",
                background: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Summary / Checkout */}
        <div
          style={{
            flex: 1,
            minWidth: "260px",
            border: "1px solid #eee",
            borderRadius: 8,
            padding: "1rem",
          }}
        >
          <h3>Order Summary</h3>
          <p>Total Items: {totalItems}</p>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>

          {error && (
            <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading || items.length === 0}
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: 4,
              border: "none",
              background: loading ? "#999" : "#088178",
              color: "#fff",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Redirecting..." : "Proceed to Checkout"}
          </button>
        </div>
      </section>
    </>
  );
}