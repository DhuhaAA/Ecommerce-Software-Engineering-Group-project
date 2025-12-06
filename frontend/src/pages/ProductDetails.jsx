import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const API_BASE_URL = "http://10.0.0.17:5000";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // ---------- INLINE CSS ----------
  const styles = {
    colorPicker: {
      margin: "1rem 0",
    },
    swatchContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
      margin: "0.5rem 0 0.75rem",
    },
    swatch: {
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      border: "2px solid #ddd",
      cursor: "pointer",
      outline: "none",
    },
    selectedSwatch: {
      border: "2px solid #088178",
      boxShadow: "0 0 0 2px #08817855",
    },
    selectedLabel: {
      marginTop: "0.4rem",
      fontSize: "0.9rem",
    },
  };
  // --------------------------------

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        setProduct(data);

        if (data.product_colors?.length > 0) {
          setSelectedColor(data.product_colors[0]);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <section className="section-p1">
        <p>Loading product...</p>
      </section>
    );
  }

  const priceNum = Number(
    String(product.price || "").replace(/[^0-9.]/g, "")
  );

  const handleAddToCart = () => {
    const itemWithColor = {
      ...product,
      selectedColor,
    };
    addToCart(itemWithColor, quantity);
  };

  return (
    <section id="prodetails" className="section-p1">
      <div className="single-pro-image">
        <img
          src={
            product.image_link ||
            product.api_featured_image ||
            "/img/products/f1.jpg"
          }
          width="100%"
          id="MainImg"
          alt={product.name}
        />
      </div>

      <div className="single-pro-details">
        <h6>{product.category || "Category"}</h6>
        <h4>{product.name}</h4>

        <h2>
          $
          {Number.isFinite(priceNum)
            ? priceNum.toFixed(2)
            : "0.00"}
        </h2>

        {/* ----- COLOR PICKER ----- */}
        {product.product_colors?.length > 0 && (
          <div style={styles.colorPicker}>
            <h5>Available Colors</h5>

            <div style={styles.swatchContainer}>
              {product.product_colors.map((c, idx) => {
                const isSelected =
                  selectedColor?.colour_name === c.colour_name;

                return (
                  <button
                    key={idx}
                    type="button"
                    style={{
                      ...styles.swatch,
                      backgroundColor: c.hex_value,
                      ...(isSelected ? styles.selectedSwatch : {}),
                    }}
                    onClick={() => setSelectedColor(c)}
                    title={c.colour_name}
                  />
                );
              })}
            </div>

            <select
              value={selectedColor?.colour_name || ""}
              onChange={(e) => {
                const chosen = product.product_colors.find(
                  (c) => c.colour_name === e.target.value
                );
                setSelectedColor(chosen);
              }}
            >
              {product.product_colors.map((c, idx) => (
                <option key={idx} value={c.colour_name}>
                  {c.colour_name}
                </option>
              ))}
            </select>

            {selectedColor && (
              <p style={styles.selectedLabel}>
                Selected color: <strong>{selectedColor.colour_name}</strong>
              </p>
            )}
          </div>
        )}
        {/* ------------------------- */}

        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, Number(e.target.value) || 1))
          }
        />

        <button className="normal" onClick={handleAddToCart}>
          Add To Cart
        </button>

        <h4>Product Details</h4>
        <span>{product.description || "No description available."}</span>
      </div>
    </section>
  );
}
