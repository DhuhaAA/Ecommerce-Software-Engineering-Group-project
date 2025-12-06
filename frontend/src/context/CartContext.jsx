import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {product, qty}

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.product._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p.product._id === product._id
            ? { ...p, qty: p.qty + qty }
            : p
        );
      }
      return [...prev, { product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p.product._id !== id));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, p) => sum + p.qty, 0);
  const subtotal = items.reduce(
    (sum, p) => sum + (Number(p.product.price) || 0) * p.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
