import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import { trackEvent } from "../utils/analytics";

export function ProductRail() {
  const scrollContainerRef = useRef(null);
  const { addToBag, isWished, toggleWish, money } = useStore();

  const bestsellerProducts = products.filter(
    (p) => p.isBestSeller || [2, 1, 4, 3, 5, 8].includes(p.id)
  );

  const scrollByAmount = (offset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="product-rail-section" aria-label="Most Loved Bestsellers">
      <div className="product-rail-container">
        {/* Header with Navigation Controls */}
        <div className="rail-header-flex">
          <div className="rail-title-wrap">
            <span className="editorial-kicker">MOST LOVED</span>
            <h2 className="editorial-display-title">Pieces they keep coming back to.</h2>
          </div>

          <div className="rail-controls">
            <button
              className="rail-nav-btn prev-btn"
              onClick={() => scrollByAmount(-380)}
              aria-label="Scroll left through bestsellers"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <button
              className="rail-nav-btn next-btn"
              onClick={() => scrollByAmount(380)}
              aria-label="Scroll right through bestsellers"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Drag/Scroll Product Rail */}
        <div className="rail-scroll-track" ref={scrollContainerRef}>
          {bestsellerProducts.map((product) => {
            const wished = isWished(product.id);
            const image = product.images?.[0] || product.image;
            const fallbackImage = `/products/${product.id}.svg`;

            return (
              <article key={product.id} className="rail-product-card">
                <div className="rail-card-media">
                  <Link to={`/products/${product.slug}`} className="rail-image-link" aria-label={`View ${product.name}`}>
                    <img
                      src={image}
                      alt={product.name}
                      className="rail-card-img"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        if (event.currentTarget.src.endsWith(fallbackImage)) return;
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = fallbackImage;
                      }}
                    />
                  </Link>

                  <button
                    className={`rail-wishlist-btn ${wished ? "is-active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWish(product.id);
                    }}
                    aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>

                  {product.tag && (
                    <span className="rail-badge">{product.tag}</span>
                  )}

                  <button
                    className="rail-quick-add-btn"
                    onClick={() => {
                      addToBag(product, 1);
                      trackEvent("add_to_bag_rail", { productId: product.id, productName: product.name });
                    }}
                    aria-label={`Add ${product.name} to bag`}
                  >
                    <span>+ Quick Add</span>
                  </button>
                </div>

                <div className="rail-card-meta">
                  <span className="rail-craft-label">{product.category} · {product.fabric}</span>
                  <Link to={`/products/${product.slug}`}>
                    <h3 className="rail-product-title">{product.name}</h3>
                  </Link>
                  <div className="rail-price-row">
                    <span className="rail-current-price">{money(product.price)}</span>
                    {product.compareAt && (
                      <span className="rail-compare-price">{money(product.compareAt)}</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
