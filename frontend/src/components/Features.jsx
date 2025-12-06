export default function Features() {
    const items = [
      { img: "/img/features/truck.png", label: "Free Shipping" },
      { img: "/img/features/shippingbox.png", label: "Online Order" },
      { img: "/img/features/pricetag.png", label: "Save Money" },
      { img: "/img/features/star.png", label: "Promotions" },
      { img: "/img/features/hat.png", label: "Happy Sell" },
      { img: "/img/features/recycle.png", label: "24/7 Support" },
    ];
  
    return (
      <section id="feature" className="section-p1">
        {items.map((f) => (
          <div className="fe-box" key={f.label}>
            <img src={f.img} alt={f.label} />
            <h6>{f.label}</h6>
          </div>
        ))}
      </section>
    );
  }
  