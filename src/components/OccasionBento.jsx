import React from "react";
import { Link } from "react-router-dom";

const occasionsData = [
  {
    id: "bridal",
    title: "Wedding & Bridal",
    kicker: "CEREMONIAL HEIRLOOMS",
    tagline: "Woven to anchor the most profound chapter of your life.",
    description: "Heavy 3-ply mulberry silks, interlocking korvai borders, and dense zari jangla designed to become family treasures.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85",
    link: "/collections?search=Wedding",
    isLarge: true,
  },
  {
    id: "festive",
    title: "Festive & Rituals",
    kicker: "GOLD & LIGHT",
    tagline: "Vibrant hues and joyous tapestries.",
    description: "Paithani peacocks, Banarasi butti, and celebratory drapes.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85",
    link: "/collections?search=Festive",
    isLarge: false,
  },
  {
    id: "evening",
    title: "Evening Soirées",
    kicker: "AFTER DARK",
    tagline: "Metallic threads that contour in low light.",
    description: "Midnight Banarasi silks and muted brocades for receptions.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
    link: "/collections?search=Evening",
    isLarge: false,
  },
  {
    id: "everyday",
    title: "Everyday Luxury",
    kicker: "QUIET ELEVATION",
    tagline: "Breathable textures that become familiar.",
    description: "Wild Tussar, organic linen, and handloom cottons.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    link: "/collections?search=Everyday",
    isLarge: false,
  },
  {
    id: "gifting",
    title: "Heirloom Gifting",
    kicker: "TOKEN OF REVERENCE",
    tagline: "A gift that speaks of thoughtfulness.",
    description: "Packaged in hand-crafted muslin bags and gift boxes.",
    image: "https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?auto=format&fit=crop&w=900&q=85",
    link: "/collections?search=Gift",
    isLarge: false,
  },
];

export function OccasionBento() {
  const bridal = occasionsData[0];
  const gridCards = occasionsData.slice(1);

  return (
    <section className="occasion-bento-section" id="occasions" aria-label="Shop Sarees by Occasion">
      <div className="bento-container">
        {/* Section Header */}
        <div className="section-header-centered">
          <span className="editorial-kicker">CURATED BY MOOD & MOMENT</span>
          <h2 className="editorial-display-title">
            Sarees for Every Chapter
          </h2>
          <p className="section-sub-copy">
            From monumental vows to quiet Sunday afternoon drapes, discover handwoven silhouettes shaped for how you want to feel.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="occasion-bento-grid">
          {/* Large Vertical Feature Card: Wedding & Bridal */}
          <Link
            to={bridal.link}
            className="bento-card bento-card-feature"
            aria-label={`Explore ${bridal.title}`}
          >
            <div className="bento-media-box">
              <img
                src={bridal.image}
                alt={bridal.title}
                className="bento-bg-img"
                loading="lazy"
              />
              <div className="bento-gradient-scrim" />
            </div>

            <div className="bento-content-box">
              <span className="bento-kicker">{bridal.kicker}</span>
              <h3 className="bento-title">{bridal.title}</h3>
              <p className="bento-tagline">{bridal.tagline}</p>
              <p className="bento-desc">{bridal.description}</p>
              <div className="bento-explore-pill">
                <span>Explore Bridal Edit</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          </Link>

          {/* Right Bento Quadrant: 4 smaller occasion cards */}
          <div className="bento-quad-subgrid">
            {gridCards.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="bento-card bento-card-sub"
                aria-label={`Explore ${item.title}`}
              >
                <div className="bento-media-box">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="bento-bg-img"
                    loading="lazy"
                  />
                  <div className="bento-gradient-scrim" />
                </div>

                <div className="bento-content-box">
                  <span className="bento-kicker">{item.kicker}</span>
                  <h3 className="bento-title">{item.title}</h3>
                  <p className="bento-tagline">{item.tagline}</p>
                  <div className="bento-explore-pill">
                    <span>Explore</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
