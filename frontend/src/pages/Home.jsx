import { useEffect, useState } from "react";
import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Newsletter from "../components/Newsletter.jsx";

const API_BASE_URL = "http://10.0.0.17:5000"; // TODO# REMOVE SOON
const PRODUCTS_ENDPOINT = `${API_BASE_URL}/products`;

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(PRODUCTS_ENDPOINT);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
  
        // 1. Clean prices
        const cleaned = data
          .map((p) => {
            const cleanedPrice = String(p.price || "")
              .replace(/[^0-9.]/g, "")
              .trim();
            const num = Number(cleanedPrice);
            return {
              ...p,
              _cleanPrice: Number.isFinite(num) && num > 0 ? num : null,
            };
          })
          // 2. remove bad or $0 items
          .filter((p) => p._cleanPrice !== null);
  
        // 3. Randomize the order
        const shuffled = cleaned.sort(() => Math.random() - 0.5);
  
        // 4. Pick the first 8
        const featured = shuffled.slice(0, 8);
  
        setProducts(featured);
      } catch (err) {
        console.error(err);
      }
    }
  
    fetchProducts();
  }, []);
  
  

  return (
    <>
      <Hero />
      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Save big on these products below</p>
        <div className="pro-container">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
