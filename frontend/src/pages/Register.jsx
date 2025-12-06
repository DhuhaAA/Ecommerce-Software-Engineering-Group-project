import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://10.0.0.17:5000";
const REGISTER_ENDPOINT = `${API_BASE_URL}/api/users/register`;

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "regName") setForm((f) => ({ ...f, name: value }));
    if (id === "regEmail") setForm((f) => ({ ...f, email: value }));
    if (id === "regPassword") setForm((f) => ({ ...f, password: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(REGISTER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to register");
      }

      // success: optionally you might store token, etc.
      // For now just send them to login:
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="section-p1"
      style={{ maxWidth: 500, margin: "60px auto" }}
    >
      <h2>Create Account</h2>

      <form
        id="registerForm"
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
      >
        <input
          type="text"
          id="regName"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={handleChange}
          style={{ padding: 12, border: "1px solid #ccc", borderRadius: 4 }}
        />
        <input
          type="email"
          id="regEmail"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          style={{ padding: 12, border: "1px solid #ccc", borderRadius: 4 }}
        />
        <input
          type="password"
          id="regPassword"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
          style={{ padding: 12, border: "1px solid #ccc", borderRadius: 4 }}
        />

        {error && (
          <p style={{ color: "red", fontSize: "0.9rem", marginTop: 4 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="normal"
          disabled={loading}
          style={{
            background: "#088178",
            color: "white",
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: 15 }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#088178" }}>
          Login here
        </a>
      </p>
    </section>
  );
}
