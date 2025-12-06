import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import Newsletter from "../components/Newsletter.jsx";

const API_BASE_URL = "http://127.0.0.1:8000";
const PRODUCTS_ENDPOINT = `${API_BASE_URL}/api/products`;
const PRODUCTS_PER_PAGE = 16;

export default function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(PRODUCTS_ENDPOINT);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const current = allProducts.slice(start, start + PRODUCTS_PER_PAGE);

  return (
    <>
      <section id="page-header">
        <h2>#stayhome</h2>
        <p>Save more with coupons & up to 70% off!</p>
      </section>

      <section id="shop-products" className="section-p1">
        <h2>All Products</h2>
        <p>Browse our full catalog</p>
        <div className="pro-container">
          {current.map((p) => (
            <ProductCard key={p._id || p.name} product={p} />
          ))}
        </div>

        {totalPages > 1 && (
          <div id="pagination" className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <a
                key={n}
                href="#shop-products"
                className={n === page ? "active-page" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(n);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {n}
              </a>
            ))}
          </div>
        )}
      </section>

      <Newsletter />
    </>
  );
}
