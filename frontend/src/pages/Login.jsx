import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://10.0.0.17:5000";
const LOGIN_ENDPOINT = `${API_BASE_URL}/api/users/login`;

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // If backend returns a token, store it (optional)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Redirect to homepage or account page
      navigate("/");

    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="section-p1"
      style={{ maxWidth: 500, margin: "60px auto" }}
    >
      <h2>Login</h2>
      <p>Please enter your credentials.</p>

      <form
        id="loginForm"
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
      >
        <input
          type="email"
          id="loginEmail"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 12, border: "1px solid #ccc", borderRadius: 4 }}
        />

        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 12, border: "1px solid #ccc", borderRadius: 4 }}
        />

        {error && (
          <p style={{ color: "red", marginTop: 0, fontSize: "0.9rem" }}>
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 15 }}>
        Don't have an account?{" "}
        <a href="/register" style={{ color: "#088178" }}>
          Register here
        </a>
      </p>
    </section>
  );
}
