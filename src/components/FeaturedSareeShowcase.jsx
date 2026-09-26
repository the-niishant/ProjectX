import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

const featuredProducts = [
  { ...products[0], label: "Kanjivaram Silk" },
  { ...products[1], label: "Banarasi Brocade" },
  { ...products[3], label: "Chanderi Light" },
  { ...products[6], label: "Organza Saffron" },
  { ...products[7], label: "Cotton Cloud" }
];

export function FeaturedSareeShowcase() {
  const containerRef = useRef(null);
  const [activeProduct, setActiveProduct] = useState(0);
  const [flipState, setFlipState] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        pin: true,
        scrub: 1,
        anticipatePin: 1
      });

      // Scroll-driven product transitions
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        scrub: true,
        onUpdate: (self) => {
          const newIndex = Math.floor(self.progress * featuredProducts.length);
          if (newIndex !== activeProduct && newIndex < featuredProducts.length) {
            setActiveProduct(newIndex);
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="featured-showcase" ref={containerRef}>
      <div className="showcase-header">
        <span className="section-kicker">01 / 05</span>
        <h2 className="section-title">
          Kanchipuram Silk<br />
          <em>the art of contrast</em>
        </h2>
      </div>

      <div className="showcase-grid">
        <div className="showcase-image-column">
          <img
            src={featuredProducts[activeProduct]?.images?.[0] || "/products/1.svg"}
            alt={featuredProducts[activeProduct]?.name || "Featured saree"}
            className="showcase-main-image"
          />
        </div>

        <div className="showcase-details-column">
          <div className="product-info">
            <h3 className="product-name">{featuredProducts[activeProduct]?.name}</h3>
            <p className="product-description">
              {featuredProducts[activeProduct]?.description}
            </p>
            
            <div className="product-price">
              <span className="price-current">
                ₹{featuredProducts[activeProduct]?.price?.toLocaleString()}
              </span>
            </div>

            <div className="product-actions">
              <button className="primary-button">Add to Bag</button>
              <button className="secondary-button">Save to Wishlist</button>
            </div>

            <div className="product-meta">
              <span>{featuredProducts[activeProduct]?.fabric}</span>
              <span>{featuredProducts[activeProduct]?.origin}</span>
            </div>
          </div>

          <div className="product-gallery">
            {featuredProducts.map((_, i) => (
              <button
                key={i}
                className={`gallery-thumbnail ${i === activeProduct ? "is-active" : ""}`}
                onClick={() => setActiveProduct(i)}
              >
                <span className="thumbnail-index">{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="product-indicators">
        {featuredProducts.map((_, i) => (
          <span
            key={i}
            className={`indicator ${i === activeProduct ? "is-active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}