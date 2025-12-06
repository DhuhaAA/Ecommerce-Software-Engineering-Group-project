// src/components/Hero.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const slides = [
  {
    image: "/assets/hero/img/hero-image-1.png",
    headline: "Glow Up Your Look",
    sub: "New arrivals from top beauty brands.",
  },
  {
    image: "/assets/hero/img/hero-image-2.png",
    headline: "Bold. Bright. You.",
    sub: "Colorful palettes and lip sets on sale.",
  },
  {
    image: "/assets/hero/img/hero-image-3.png",
    headline: "Skin First, Makeup Second",
    sub: "Hydrating bases and lightweight coverage.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const slideCount = slides.length;

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 5000); // 5s per slide
    return () => clearInterval(id);
  }, [slideCount]);

  const goToSlide = (index) => setCurrent(index);

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="hero-content">
            <p className="hero-tagline">SephyYoung</p>
            <h1>{slide.headline}</h1>
            <p className="hero-sub">{slide.sub}</p>
            <Link to="/shop">
              <button className="hero-btn">Shop Now</button>
            </Link>
          </div>
        </div>
      ))}

      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === current ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
