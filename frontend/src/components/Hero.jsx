import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="hero">
      <h4>Trade-in-offer</h4>
      <h2>#hashtaghere</h2>
      <h1>On all products</h1>
      <p>Save more, up to 70% off!</p>
      <Link to="/shop">
        <button>Shop Now</button>
      </Link>
    </section>
  );
}
