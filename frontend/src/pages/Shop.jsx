import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import Newsletter from "../components/Newsletter.jsx";

const API_BASE_URL = "http://10.0.0.17:5000";
const PRODUCTS_ENDPOINT = `${API_BASE_URL}/products`;
const PRODUCTS_PER_PAGE = 16;

// Helper: which page numbers to show
function getPageNumbers(current, total, maxShown = 5) {
  if (total <= maxShown) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  let start = current - Math.floor(maxShown / 2);
  let end = current + Math.floor(maxShown / 2);

  if (start < 1) {
    start = 1;
    end = maxShown;
  }

  if (end > total) {
    end = total;
    start = total - maxShown + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);

  // NEW: category state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(PRODUCTS_ENDPOINT);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
  
        // 1. Clean prices
        const cleaned = (data || []).map((p) => {
          const raw = String(p.price || "").replace(/[^0-9.]/g, "").trim();
          const numericPrice = Number(raw);
  
          return {
            ...p,
            _cleanPrice:
              Number.isFinite(numericPrice) && numericPrice > 0
                ? numericPrice
                : null,
          };
        });
  
        // 2. Remove invalid || zero price
        const filtered = cleaned.filter((p) => p._cleanPrice !== null);
  
        // 3. Randomize order
        const randomized = filtered.sort(() => Math.random() - 0.5);
  
        // Set final list
        setAllProducts(randomized);
  
        // Build unique categories from DB products (but only from valid items)
        const uniqueCategories = Array.from(
          new Set(
            randomized
              .map((p) => p.category || p.product_type)
              .filter(Boolean)
          )
        ).sort();
  
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
      }
    }
  
    fetchProducts();
  }, []);
  

  // Filter products by selected category BEFORE pagination
  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter(
          (p) => (p.category || p.product_type) === selectedCategory
        );

  const totalPages =
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const current = filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);

  // ---------- inline styles ----------
  const pageHeaderStyle = {
    padding: "1.5rem 0",
    background: "#0d7f73",
    textAlign: "center",
    color: "white",
  };

  const categoryContainerStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "1rem",
  };

  const baseCategoryButtonStyle = {
    padding: "6px 14px",
    borderRadius: "20px",
    border: "1px solid white",
    backgroundColor: "#0d7f73",
    color: "white",
    cursor: "pointer",
    fontSize: "0.9rem",
  };

  const activeCategoryButtonStyle = {
    ...baseCategoryButtonStyle,
    backgroundColor: "white",
    color: "#0d7f73",
  };

  const paginationContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "1.5rem",
    padding: "0.75rem 1rem",
    borderRadius: "9999px",
    backgroundColor: "#00666633",
  };

  const basePageButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "32px",
    height: "32px",
    padding: "0 8px",
    borderRadius: "9999px",
    fontSize: "0.85rem",
    fontWeight: 500,
    border: "1px solid #0d7f73",
    backgroundColor: "#0d7f73",
    color: "#f4f7f7",
    cursor: "pointer",
    transition: "background-color 0.15s ease, color 0.15s ease",
  };

  const activePageButtonStyle = {
    ...basePageButtonStyle,
    backgroundColor: "#f4f7f7",
    color: "#0d7f73",
  };

  const disabledButtonStyle = {
    ...basePageButtonStyle,
    opacity: 0.4,
    cursor: "default",
  };
  // -----------------------------------

  return (
    <>
      {/* Categorical header instead of #stayhome */}
      <section id="page-header" style={pageHeaderStyle}>
        <h2>Browse by Category</h2>
        <p>
          {selectedCategory === "All"
            ? "Showing all products"
            : `Showing category: ${selectedCategory}`}
        </p>

        <div style={categoryContainerStyle}>
          {/* "All" button */}
          <button
            type="button"
            style={
              selectedCategory === "All"
                ? activeCategoryButtonStyle
                : baseCategoryButtonStyle
            }
            onClick={() => {
              setSelectedCategory("All");
              setPage(1);
            }}
          >
            All
          </button>

          {/* DB-driven categories */}
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              style={
                selectedCategory === cat
                  ? activeCategoryButtonStyle
                  : baseCategoryButtonStyle
              }
              onClick={() => {
                setSelectedCategory(cat);
                setPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section id="shop-products" className="section-p1">
        <h2>
          {selectedCategory === "All"
            ? "All Products"
            : `Category: ${selectedCategory}`}
        </h2>
        <p>Browse our catalog</p>

        <div className="pro-container">
          {current.map((p) => (
            <ProductCard key={p._id || p.id || p.name} product={p} />
          ))}
        </div>

        {totalPages > 1 && (
          <div id="pagination" style={paginationContainerStyle}>
            {/* First page */}
            <button
              type="button"
              style={page === 1 ? disabledButtonStyle : basePageButtonStyle}
              disabled={page === 1}
              onClick={() => setPage(1)}
            >
              {"<<"}
            </button>

            {/* Previous page */}
            <button
              type="button"
              style={page === 1 ? disabledButtonStyle : basePageButtonStyle}
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              {"<"}
            </button>

            {/* Page numbers (limited) */}
            {getPageNumbers(page, totalPages).map((n) => (
              <button
                key={n}
                type="button"
                style={
                  n === page ? activePageButtonStyle : basePageButtonStyle
                }
                onClick={() => {
                  setPage(n);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {n}
              </button>
            ))}

            {/* Next page */}
            <button
              type="button"
              style={
                page === totalPages ? disabledButtonStyle : basePageButtonStyle
              }
              disabled={page === totalPages}
              onClick={() =>
                setPage((p) => Math.min(p + 1, totalPages))
              }
            >
              {">"}
            </button>

            {/* Last page */}
            <button
              type="button"
              style={
                page === totalPages ? disabledButtonStyle : basePageButtonStyle
              }
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
            >
              {">>"}
            </button>
          </div>
        )}
      </section>

      <Newsletter />
    </>
  );
}
