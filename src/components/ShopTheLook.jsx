import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";

const lookHotspots = [
  {
    id: "saree",
    x: 48,
    y: 54,
    title: "Rohini Bridal Banarasi",
    craft: "Pure Mulberry Silk & Hand-Interlocked Zari",
    price: 28500,
    productSlug: "rohini-bridal-banarasi",
    productId: 10,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "jewelry",
    x: 52,
    y: 28,
    title: "Royal Emerald Heritage Choker",
    craft: "22K Gold Foil & Uncut Polki Diamonds",
    price: 45000,
    productSlug: "aranya-kanjivaram",
    productId: 2,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "pallu",
    x: 72,
    y: 70,
    title: "Antique Kadwa Zari Border",
    craft: "Pure Gold Tested Zari with Chevron Edge",
    price: 18900,
    productSlug: "nila-banarasi-silk",
    productId: 1,
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=85",
  }
];

export function ShopTheLook() {
  const [activeHotspot, setActiveHotspot] = useState(lookHotspots[0]);
  const { addToBag, money } = useStore();

  const handleHotspotClick = (spot) => {
    setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
  };

  const getProductForHotspot = (spot) => {
    return products.find((p) => p.id === spot.productId) || products[0];
  };

  return (
    <section className="shop-the-look-section" aria-label="Shop The Look Editorial Outfit">
      <div className="look-container">
        {/* Section Heading */}
        <div className="section-header-centered">
          <span className="editorial-kicker">STYLED SILHOUETTES</span>
          <h2 className="editorial-display-title">Shop the Look</h2>
          <p className="section-sub-copy">
            Complete the ceremonial ensemble. Tap the pulsating gold beacons on the editorial image to reveal each handcrafted component.
          </p>
        </div>

        {/* Visual Outfit Canvas with Interactive Hotspots */}
        <div className="look-canvas-wrapper">
          <div className="look-media-frame">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85"
              alt="Editorial styled bridal look featuring crimson saree, heritage jewelry, and gold zari pallu"
              className="look-main-photo"
              loading="lazy"
            />
            <div className="look-ambient-overlay" />

            {/* Interactive Hotspot Beacons */}
            {lookHotspots.map((spot) => {
              const isSelected = activeHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  className={`look-hotspot-beacon ${isSelected ? "is-active" : ""}`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onClick={() => handleHotspotClick(spot)}
                  aria-label={`View ${spot.title}`}
                  aria-expanded={isSelected}
                >
                  <span className="beacon-pulse" />
                  <span className="beacon-dot">✦</span>
                </button>
              );
            })}

            {/* Floating Product Card */}
            {activeHotspot && (
              <div
                className="look-floating-card"
                style={{
                  left: `clamp(16px, ${activeHotspot.x}%, calc(100% - 320px))`,
                  top: `clamp(16px, ${activeHotspot.y - 15}%, calc(100% - 240px))`
                }}
              >
                <button
                  className="floating-card-close"
                  onClick={() => setActiveHotspot(null)}
                  aria-label="Close detail card"
                >
                  ✕
                </button>

                <div className="floating-card-body">
                  <img
                    src={activeHotspot.image}
                    alt={activeHotspot.title}
                    className="floating-card-thumb"
                  />
                  <div className="floating-card-meta">
                    <span className="floating-card-craft">{activeHotspot.craft}</span>
                    <h3 className="floating-card-title">{activeHotspot.title}</h3>
                    <span className="floating-card-price">{money(activeHotspot.price)}</span>

                    <div className="floating-card-actions">
                      <Link
                        to={`/products/${activeHotspot.productSlug}`}
                        className="floating-view-link"
                      >
                        <span>View Piece</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </Link>
                      <button
                        className="floating-add-btn"
                        onClick={() => addToBag(getProductForHotspot(activeHotspot), 1)}
                        aria-label={`Add ${activeHotspot.title} to bag`}
                      >
                        + Bag
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
