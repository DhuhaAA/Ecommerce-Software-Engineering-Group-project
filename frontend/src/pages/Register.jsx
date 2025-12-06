export default function Register() {
    const handleSubmit = (e) => {
      e.preventDefault();
      // hook this up to your backend later
      alert("Register not wired yet – backend coming soon.");
    };
  
    return (
      <section className="section-p1" style={{ maxWidth: 500, margin: "60px auto" }}>
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
            style={{ padding: 12, border: "1px solid #ccc", borderRadius: 4 }}
          />
          <input
            type="email"
            id="regEmail"
            placeholder="Email"
            required
            style={{ padding: 12, border: "1px solid #ccc", borderRadius: 4 }}
          />
          <input
            type="password"
            id="regPassword"
            placeholder="Password"
            required
            style={{ padding: 12, border: "1px solid #ccc", borderRadius: 4 }}
          />
  
          <button
            type="submit"
            className="normal"
            style={{ background: "#088178", color: "white" }}
          >
            Register
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
  