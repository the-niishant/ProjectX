import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { products, allCategories, allFabrics, allOccasions, allColors, priceRanges } from "../data/products";
import { collections } from "../data/collections";
import { ProductCard } from "../components/ProductCard";
import { trackEvent } from "../utils/analytics";

export function Collections() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial values from URL query params
  const paramFilter = searchParams.get("filter") || "All pieces";
  const paramSearch = searchParams.get("search") || "";

  const [selectedCraft, setSelectedCraft] = useState(paramFilter);
  const [selectedFabric, setSelectedFabric] = useState("All fabrics");
  const [selectedOccasion, setSelectedOccasion] = useState("All occasions");
  const [selectedColor, setSelectedColor] = useState("All colours");
  const [selectedPriceLabel, setSelectedPriceLabel] = useState("All prices");
  const [sortOrder, setSortOrder] = useState("curated");
  const [searchQuery, setSearchQuery] = useState(paramSearch);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => setIsLoading(false), 220);
    return () => window.clearTimeout(timer);
  }, [selectedCraft, selectedFabric, selectedOccasion, selectedColor, selectedPriceLabel, searchQuery, sortOrder]);

  // Sync state if URL searchParams change
  useEffect(() => {
    const f = searchParams.get("filter");
    if (f) setSelectedCraft(f);
    const s = searchParams.get("search");
    if (s) setSearchQuery(s);
  }, [searchParams]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCraft !== "All pieces") count++;
    if (selectedFabric !== "All fabrics") count++;
    if (selectedOccasion !== "All occasions") count++;
    if (selectedColor !== "All colours") count++;
    if (selectedPriceLabel !== "All prices") count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedCraft, selectedFabric, selectedOccasion, selectedColor, selectedPriceLabel, searchQuery]);

  const handleClearAll = () => {
    setSelectedCraft("All pieces");
    setSelectedFabric("All fabrics");
    setSelectedOccasion("All occasions");
    setSelectedColor("All colours");
    setSelectedPriceLabel("All prices");
    setSearchQuery("");
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const range = priceRanges.find((r) => r.label === selectedPriceLabel) || priceRanges[0];

    return products.filter((p) => {
      // Craft filter
      if (selectedCraft !== "All pieces" && p.category !== selectedCraft && p.tag !== selectedCraft) {
        return false;
      }
      // Fabric filter
      if (selectedFabric !== "All fabrics" && p.fabric !== selectedFabric) {
        return false;
      }
      // Occasion filter
      if (selectedOccasion !== "All occasions" && !p.occasion.includes(selectedOccasion)) {
        return false;
      }
      // Color filter
      if (selectedColor !== "All colours" && p.colour !== selectedColor && p.colourFamily !== selectedColor) {
        return false;
      }
      // Price range
      if (p.price < range.min || p.price > range.max) {
        return false;
      }
      // Keyword search
      if (searchQuery.trim()) {
        const text = `${p.name} ${p.category} ${p.fabric} ${p.colour} ${p.origin} ${p.occasion.join(" ")} ${p.weave} ${p.tag}`.toLowerCase();
        if (!text.includes(searchQuery.trim().toLowerCase())) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      if (sortOrder === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortOrder === "loved") return b.rating - a.rating;
      return a.id - b.id; // Curated default
    });
  }, [selectedCraft, selectedFabric, selectedOccasion, selectedColor, selectedPriceLabel, searchQuery, sortOrder]);

  return (
    <div className="collections-page">
      {/* Editorial Header */}
      <section className="collections-hero-header">
        <div className="collections-header-inner">
          <p className="section-kicker">The loom index</p>
          <h1 className="collections-page-title">
            Find the piece by<br />
            <em>how it feels.</em>
          </h1>
          <p className="collections-page-intro">
            Browse regional craft, familiar fabrics, and the colours that stay with you.
            Every piece is woven by hand with certified natural fibers and pure zari.
          </p>
        </div>

        {/* Curated Collection Slugs Quick Strip */}
        <div className="collection-curations-strip">
          <span className="strip-label">Curations:</span>
          {collections.map((col) => (
            <Link key={col.id} to={`/collections/${col.slug}`} className="curation-pill-link">
              {col.name} <span>↗</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Filter & Products Section */}
      <div className="collections-layout-container">
        {/* Mobile filter toggle */}
        <div className="mobile-filter-bar">
          <button
            className="mobile-filter-trigger"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>

          <span className="mobile-products-count">
            {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}
          </span>

          <label className="mobile-sort-select">
            <span className="sr-only">Sort by</span>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="curated">Curated</option>
              <option value="newest">Newest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </label>
        </div>

        {/* Sidebar Filters */}
        <aside className={`collections-filters-sidebar ${mobileFilterOpen ? "is-open" : ""}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            {activeFiltersCount > 0 && (
              <button className="clear-all-btn" onClick={handleClearAll}>
                Clear all
              </button>
            )}
            <button
              className="sidebar-close-btn"
              onClick={() => setMobileFilterOpen(false)}
              aria-label="Close filters"
            >
              ×
            </button>
          </div>

          {/* Search within collection */}
          <div className="filter-group">
            <label className="filter-group-title" htmlFor="sidebar-keyword">Keyword</label>
            <input
              id="sidebar-keyword"
              type="text"
              className="filter-text-input"
              placeholder="Filter by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Craft Filter */}
          <div className="filter-group">
            <span className="filter-group-title">Craft & Tradition</span>
            <div className="filter-options-list">
              {allCategories.map((craft) => (
                <button
                  key={craft}
                  className={`filter-option-btn ${selectedCraft === craft ? "is-selected" : ""}`}
                  onClick={() => {
                    setSelectedCraft(craft);
                    trackEvent("filter_collection", { filterType: "craft", value: craft });
                  }}
                >
                  <span>{craft}</span>
                  <span className="option-check">{selectedCraft === craft ? "✓" : ""}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Filter */}
          <div className="filter-group">
            <span className="filter-group-title">Fabric Composition</span>
            <div className="filter-options-list">
              {allFabrics.map((fabric) => (
                <button
                  key={fabric}
                  className={`filter-option-btn ${selectedFabric === fabric ? "is-selected" : ""}`}
                  onClick={() => {
                    setSelectedFabric(fabric);
                    trackEvent("filter_collection", { filterType: "fabric", value: fabric });
                  }}
                >
                  <span>{fabric}</span>
                  <span className="option-check">{selectedFabric === fabric ? "✓" : ""}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Occasion Filter */}
          <div className="filter-group">
            <span className="filter-group-title">Occasion</span>
            <div className="filter-options-list">
              {allOccasions.map((occasion) => (
                <button
                  key={occasion}
                  className={`filter-option-btn ${selectedOccasion === occasion ? "is-selected" : ""}`}
                  onClick={() => {
                    setSelectedOccasion(occasion);
                    trackEvent("filter_collection", { filterType: "occasion", value: occasion });
                  }}
                >
                  <span>{occasion}</span>
                  <span className="option-check">{selectedOccasion === occasion ? "✓" : ""}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Colour Filter */}
          <div className="filter-group">
            <span className="filter-group-title">Colour Tone</span>
            <div className="filter-options-list">
              {allColors.map((color) => (
                <button
                  key={color}
                  className={`filter-option-btn ${selectedColor === color ? "is-selected" : ""}`}
                  onClick={() => {
                    setSelectedColor(color);
                    trackEvent("filter_collection", { filterType: "color", value: color });
                  }}
                >
                  <span>{color}</span>
                  <span className="option-check">{selectedColor === color ? "✓" : ""}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <span className="filter-group-title">Price Range</span>
            <div className="filter-options-list">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  className={`filter-option-btn ${selectedPriceLabel === range.label ? "is-selected" : ""}`}
                  onClick={() => {
                    setSelectedPriceLabel(range.label);
                    trackEvent("filter_collection", { filterType: "price", value: range.label });
                  }}
                >
                  <span>{range.label}</span>
                  <span className="option-check">{selectedPriceLabel === range.label ? "✓" : ""}</span>
                </button>
              ))}
            </div>
          </div>

          {mobileFilterOpen && (
            <div className="mobile-filter-footer">
              <button
                className="primary-button"
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply Filters ({filteredProducts.length} pieces)
              </button>
            </div>
          )}
        </aside>

        {/* Product Grid Area */}
        <main className="collections-results-main">
          {/* Top Bar for Desktop */}
          <div className="collections-top-bar">
            <div className="active-filter-summary">
              <span className="product-count-label">
                Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "piece" : "pieces"}
              </span>

              {activeFiltersCount > 0 && (
                <div className="active-tag-pills">
                  {selectedCraft !== "All pieces" && (
                    <span className="active-pill" onClick={() => setSelectedCraft("All pieces")}>
                      Craft: {selectedCraft} ×
                    </span>
                  )}
                  {selectedFabric !== "All fabrics" && (
                    <span className="active-pill" onClick={() => setSelectedFabric("All fabrics")}>
                      Fabric: {selectedFabric} ×
                    </span>
                  )}
                  {selectedOccasion !== "All occasions" && (
                    <span className="active-pill" onClick={() => setSelectedOccasion("All occasions")}>
                      Occasion: {selectedOccasion} ×
                    </span>
                  )}
                  {selectedColor !== "All colours" && (
                    <span className="active-pill" onClick={() => setSelectedColor("All colours")}>
                      Color: {selectedColor} ×
                    </span>
                  )}
                  {selectedPriceLabel !== "All prices" && (
                    <span className="active-pill" onClick={() => setSelectedPriceLabel("All prices")}>
                      Price: {selectedPriceLabel} ×
                    </span>
                  )}
                  {searchQuery.trim() && (
                    <span className="active-pill" onClick={() => setSearchQuery("")}>
                      "{searchQuery}" ×
                    </span>
                  )}
                </div>
              )}
            </div>

            <label className="desktop-sort-label">
              <span>Sort</span>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="curated">Curated</option>
                <option value="newest">Newest</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="loved">Highest rated</option>
              </select>
            </label>
          </div>

          {isLoading ? (
            <div className="catalog-products-grid catalog-products-skeleton" aria-label="Loading the edit">
              {Array.from({ length: 6 }, (_, index) => <div className="product-skeleton" key={index}><span /><span /><span /></div>)}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="catalog-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="catalog-empty-view">
              <span className="empty-symbol">✦</span>
              <h2>Nothing here, yet.</h2>
              <p>Try widening the filters or return to the full edit.</p>
              <button className="primary-button" onClick={handleClearAll}>
                Clear all filters <span>↗</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
