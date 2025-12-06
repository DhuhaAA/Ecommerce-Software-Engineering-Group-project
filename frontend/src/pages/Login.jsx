export default function Login() {
    const handleSubmit = (e) => {
      e.preventDefault();
      // hook this up to your backend later
      alert("Login not wired yet – backend coming soon.");
    };
  
    return (
      <section className="section-p1" style={{ maxWidth: 500, margin: "60px auto" }}>
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
            style={{ padding: 12, border: "1px solid #ccc", borderRadius: 4 }}
          />
          <input
            type="password"
            id="loginPassword"
            placeholder="Password"
            required
            style={{ padding: 12, border: "1px solid #ccc", borderRadius: 4 }}
          />
  
          <button
            type="submit"
            className="normal"
            style={{ background: "#088178", color: "white" }}
          >
            Login
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
  