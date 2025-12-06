// components/CheckoutButton.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

const API_BASE_URL = "http://10.0.0.17:5000"; 

export default function CheckoutButton() {
  const { items } = useCart();         
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!items || items.length === 0) return;

    try {
      setLoading(true);

    
      const payloadItems = items.map((item) => ({
        name: item.name,
        price: item.price,    
        quantity: item.qty,   
        _id: item._id,
        selectedColor: item.selectedColor
          ? item.selectedColor.colour_name
          : null,
      }));

      const res = await fetch(
        `${API_BASE_URL}/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: payloadItems }),
        }
      );

      if (!res.ok) throw new Error("Failed to create checkout session");

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No session URL returned");
      }
    } catch (err) {
      console.error(err);
      alert("There was an error starting checkout.");
      setLoading(false);
    }
  };

  return (
    <button
      className="normal"
      disabled={loading || items.length === 0}
      onClick={handleCheckout}
    >
      {loading ? "Redirecting..." : "Checkout with Stripe"}
    </button>
  );
}
