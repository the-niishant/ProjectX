import React from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "./ProductCard";

export function NewArrivals() {
  // Select 4 newest or curated fresh editions
  const newArrivals = products.filter((p) => p.isNew || p.id === 1 || p.id === 6 || p.id === 8 || p.id === 10).slice(0, 4);

  return (
    <section className="new-arrivals-section" id="new-arrivals" aria-label="New In Collection">
      <div className="new-arrivals-container">
        {/* Section Header */}
        <div className="section-header-editorial">
          <div className="header-left-col">
            <span className="editorial-kicker">JUST IN · AUTUMN / WINTER 2024</span>
            <h2 className="editorial-display-title">
              New Arrivals
            </h2>
          </div>
          <div className="header-right-col">
            <p className="section-intro-text">
              Fresh off the loom. Pure mulberry silks, organza sheers, and bridal brocades woven in limited edition quantities.
            </p>
            <Link to="/collections?filter=New" className="editorial-gold-link">
              <span>View all new pieces</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Link>
          </div>
        </div>

        {/* 4-Column Desktop / 2-Column Tablet & Mobile Grid */}
        <div className="new-arrivals-grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
