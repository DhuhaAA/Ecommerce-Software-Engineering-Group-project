import { useEffect, useState } from "react";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Newsletter from "../components/Newsletter.jsx";

const API_BASE_URL = "http://127.0.0.1:8000";
const PRODUCTS_ENDPOINT = `${API_BASE_URL}/api/products`;

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(PRODUCTS_ENDPOINT);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        // sort by price asc and take first 8 like "featured"
        const featured = [...data]
          .sort((a, b) => (a.price || 0) - (b.price || 0))
          .slice(0, 8);
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
      <Features />

      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Save big on these products below</p>
        <div className="pro-container">
          {products.map((p) => (
            <ProductCard key={p._id || p.name} product={p} />
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
