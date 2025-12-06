import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  const toggleMobile = () => setMobileOpen((o) => !o);
  const closeMobile = () => setMobileOpen(false);

  return (
    <section id="header">
      <Link to="/">
        <img src="" className="logo" alt="" />
      </Link>

      <div>
        <ul id="navbar" className={mobileOpen ? "active" : ""}>
          <li>
            <NavLink to="/" onClick={closeMobile} className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" onClick={closeMobile} className={({ isActive }) => (isActive ? "active" : "")}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" onClick={closeMobile} className={({ isActive }) => (isActive ? "active" : "")}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" onClick={closeMobile} className={({ isActive }) => (isActive ? "active" : "")}>
              Register
            </NavLink>
          </li>
          <li id="lg-bag">
            <NavLink to="/cart" onClick={closeMobile} className={({ isActive }) => (isActive ? "active" : "")}>
              <i className="fa fa-shopping-bag"></i>
              {totalItems > 0 && <span style={{ marginLeft: 4 }}>({totalItems})</span>}
            </NavLink>
          </li>
          <button id="close" onClick={closeMobile}>
            <i className="far fa-times"></i>
          </button>
        </ul>
      </div>

      <div id="mobile">
        <Link to="/cart">
          <i className="far fa-shopping-bag"></i>
        </Link>
        <i id="bar" className="fas fa-outdent" onClick={toggleMobile}></i>
      </div>
    </section>
  );
}
