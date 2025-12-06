import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Success() {
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  // Optional: pretty version of the session id for display
  const prettySessionId = useMemo(() => {
    if (!sessionId) return null;
    if (sessionId.length <= 24) return sessionId;
    return `${sessionId.slice(0, 12)}…${sessionId.slice(-8)}`;
  }, [sessionId]);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <section id="page-header">
        <h2>Thank You for Your Purchase!</h2>
        <p>Your order was completed successfully.</p>
      </section>

      <section
        id="success"
        className="section-p1"
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
            border: "1px solid #1b3b45",
            borderRadius: 16,
            padding: "2.5rem 2rem",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            background: "rgba(5, 40, 50, 0.9)",
            color: "#f5f5f5",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              margin: "0 auto 1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#16a34a",
              boxShadow: "0 0 0 6px rgba(22, 163, 74, 0.2)",
              fontSize: "2.25rem",
            }}
          >
            ✓
          </div>

          <h3 style={{ marginBottom: "0.75rem", fontSize: "1.6rem" }}>
            Payment Successful
          </h3>

          <p
            style={{
              marginBottom: "0.5rem",
              color: "#d1e3ea",
              lineHeight: 1.6,
              fontSize: "0.98rem",
            }}
          >
            We’ve received your payment and are getting your order ready.
          </p>

          {prettySessionId && (
            <p
              style={{
                marginBottom: "0.75rem",
                fontSize: "0.9rem",
                color: "#cbd5f5",
              }}
            >
              <span style={{ display: "block", marginBottom: "0.15rem" }}>
                Order reference:
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                  wordBreak: "break-all", // safety so it never overflows
                }}
              >
                {prettySessionId}
              </span>
            </p>
          )}

          <p
            style={{
              marginBottom: "1.75rem",
              color: "#c8dde5",
              fontSize: "0.95rem",
              lineHeight: 1.5,
            }}
          >
            A confirmation email has been sent to you with your order details.
          </p>

          <Link
            to="/shop"
            style={{
              display: "inline-block",
              padding: "0.8rem 2.2rem",
              borderRadius: 999,
              border: "none",
              background: "#047857",
              color: "#f9fafb",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
              fontSize: "0.98rem",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    </>
  );
}
