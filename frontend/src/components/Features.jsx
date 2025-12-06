export default function Features() {
    const items = [
      { img: "../assets/features/truck.png", label: "Free Shipping" },
      { img: "../assets/features/shippingbox.png", label: "Online Order" },
      { img: "../assets/features/pricetag.png", label: "Save Money" },
      { img: "../assets/features/star.png", label: "Promotions" },
      { img: "../assets/features/hat.png", label: "Happy Sell" },
      { img: "../assets/features/recycle.png", label: "24/7 Support" },
    ];

    function parseItem(){
        
    }
  
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
  