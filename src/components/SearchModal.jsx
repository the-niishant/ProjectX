import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";
import { trackEvent } from "../utils/analytics";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, money } = useStore();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    }
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const matchingProducts = trimmedQuery
    ? products.filter((p) => {
        const fullText = `${p.name} ${p.category} ${p.fabric} ${p.colour} ${p.origin} ${p.occasion.join(" ")} ${p.weave} ${p.tag}`.toLowerCase();
        return fullText.includes(trimmedQuery);
      })
    : [];

  const handleSelectProduct = (slug) => {
    setIsSearchOpen(false);
    trackEvent("view_product", { slug, source: "search" });
    navigate(`/products/${slug}`);
  };

  const handleChipClick = (term) => {
    setSearchQuery(term);
  };

  return (
    <div className="search-backdrop" onClick={() => setIsSearchOpen(false)} role="dialog" aria-modal="true">
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-header">
          <svg className="search-icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sarees, silk, handloom..."
            className="search-main-input"
            aria-label="Search the collection"
          />
          <button
            className="search-close-btn"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
          >
            ×
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="search-suggestions-row">
          <span className="suggestions-label">Popular searches:</span>
          {["Banarasi", "Kanjivaram", "Chanderi", "Mulberry silk", "Wedding", "Festive", "Indigo", "Handloom"].map((tag) => (
            <button
              key={tag}
              type="button"
              className={`search-chip ${searchQuery.toLowerCase() === tag.toLowerCase() ? "is-selected" : ""}`}
              onClick={() => handleChipClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="search-results-area">
          {trimmedQuery ? (
            matchingProducts.length > 0 ? (
              <div className="search-results-grid">
                <p className="search-results-count">
                  Showing {matchingProducts.length} {matchingProducts.length === 1 ? "piece" : "pieces"} for "{searchQuery}"
                </p>
                <div className="search-items-row">
                  {matchingProducts.map((product) => (
                    <div
                      key={product.id}
                      className="search-item-card"
                      onClick={() => handleSelectProduct(product.slug)}
                    >
                      <img src={product.images[0]} alt={product.name} />
                      <div className="search-item-info">
                        <span className="search-item-craft">{product.category} · {product.colour}</span>
                        <h4>{product.name}</h4>
                        <span className="search-item-price">{money(product.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="search-no-results">
                <h3>No pieces match that search</h3>
                <p>Try a fabric, colour, region, or occasion.</p>
                <div className="suggested-queries">
                  <button onClick={() => setSearchQuery("silk")}>Explore Silks</button>
                  <button onClick={() => setSearchQuery("wedding")}>Wedding Edit</button>
                  <button onClick={() => setSearchQuery("handloom")}>Pure Handloom</button>
                </div>
              </div>
            )
          ) : (
            <div className="search-initial-prompt">
              <p>Type to discover pieces by craft (Banarasi, Chanderi), fabric (Silk, Linen), or occasion (Wedding, Festive).</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
