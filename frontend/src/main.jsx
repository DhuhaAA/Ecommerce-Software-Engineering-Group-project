import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./style.css";   // main ecommerce styling
// import "./index.css"; // optional – comment out if it breaks layout

import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
);
