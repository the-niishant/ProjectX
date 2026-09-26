import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import { ProductCard } from "../components/ProductCard";

export function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToBag, isWished, toggleWish, setIsCartOpen, money } = useStore();

  const product = products.find((p) => p.slug === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState("details"); // 'details' | 'story' | 'care' | 'delivery' | 'reviews'
  const [zoomActive, setZoomActive] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    setOpenAccordion("details");
    setZoomActive(false);
  }, [slug]);

  if (!product) {
    return (
      <div className="product-not-found-view">
        <h2>Piece not found</h2>
        <p>The saree you are looking for may have moved into a private archive.</p>
        <Link to="/collections" className="primary-button">
          Browse active catalog <span>↗</span>
        </Link>
      </div>
    );
  }

  const wished = isWished(product.id);
  const images = product.images || [product.image];

  const handleBuyNow = () => {
    addToBag(product, quantity);
    navigate("/checkout");
  };

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const relatedProducts = products.filter((p) =>
    product.relatedProductIds?.includes(p.id)
  );

  return (
    <div className="product-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="product-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/collections">Collections</Link>
        <span>/</span>
        <Link to={`/collections?filter=${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span className="current-crumb">{product.name}</span>
      </nav>

      <div className="product-detail-layout">
        {/* Left Column: Image Gallery */}
        <div className="product-gallery-col">
          <div
            className={`product-hero-stage ${zoomActive ? "is-zoomed" : ""}`}
            onClick={() => setZoomActive(!zoomActive)}
            title="Click to zoom image"
          >
            <img
              src={images[activeImageIndex] || images[0]}
              alt={`${product.name} drape view ${activeImageIndex + 1}`}
              className="product-active-img"
            />
            <span className="zoom-hint-pill">
              {zoomActive ? "Click to reset" : "Click to magnify"}
            </span>
          </div>

          {images.length > 1 && (
            <div className="product-thumbnail-row">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`gallery-thumb-btn ${idx === activeImageIndex ? "is-active" : ""}`}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Narrative & Commerce Controls */}
        <div className="product-commerce-col">
          <div className="commerce-header-block">
            <div className="meta-tag-row">
              <span className="craft-origin-tag">
                {product.category} · Woven in {product.origin}
              </span>
              <span className={`stock-status-pill ${product.stockState}`}>
                {product.stockState === "in_stock"
                  ? "Ready to ship"
                  : product.stockState === "low_stock"
                  ? "Last few available"
                  : "Made to order"}
              </span>
            </div>

            <h1 className="product-page-title">{product.name}</h1>

            <div className="product-page-price-bar">
              <div className="prices-group">
                <span className="page-price-current">{money(product.price)}</span>
                {product.compareAt && (
                  <span className="page-price-compare">{money(product.compareAt)}</span>
                )}
              </div>
              <span className="tax-shipping-included">Taxes included · Complimentary pan-India shipping</span>
            </div>
          </div>

          <p className="product-sensory-desc">{product.description}</p>

          {/* Quick Specifications Pill Bar */}
          <div className="quick-specs-bar">
            <div className="spec-pill">
              <span className="spec-label">Fabric</span>
              <span className="spec-val">{product.fabric}</span>
            </div>
            <div className="spec-pill">
              <span className="spec-label">Weave</span>
              <span className="spec-val">{product.weave}</span>
            </div>
            <div className="spec-pill">
              <span className="spec-label">Weight</span>
              <span className="spec-val">{product.weight}</span>
            </div>
            <div className="spec-pill">
              <span className="spec-label">Blouse Piece</span>
              <span className="spec-val">Included</span>
            </div>
          </div>

          {/* Action CTAs & Quantity */}
          <div className="commerce-action-block">
            <div className="quantity-and-wish-row">
              <div className="quantity-stepper large-stepper">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className={`wishlist-toggle-large-btn ${wished ? "is-wished" : ""}`}
                onClick={() => toggleWish(product.id)}
                aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>{wished ? "Saved to wishlist" : "Save to wishlist"}</span>
              </button>
            </div>

            <div className="primary-buttons-stack">
              <button
                className="primary-button add-to-bag-cta"
                onClick={() => addToBag(product, quantity)}
              >
                Add to bag · {money(product.price * quantity)}
              </button>
              <button
                className="secondary-button buy-now-cta"
                onClick={handleBuyNow}
              >
                Buy now with express checkout <span>↗</span>
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="product-trust-strip">
            <div className="trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              <span>Complimentary insured shipping over ₹10,000</span>
            </div>
            <div className="trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>100% Certified Authentic Handloom</span>
            </div>
            <div className="trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              <span>7-Day Hassle-Free Exchange Policy</span>
            </div>
          </div>

          {/* Accordion Panels */}
          <div className="product-accordions-group">
            {/* 1. The Details */}
            <div className="accordion-block">
              <button
                className="accordion-trigger-btn"
                onClick={() => toggleAccordion("details")}
                aria-expanded={openAccordion === "details"}
              >
                <span>The details</span>
                <span className="accordion-icon">{openAccordion === "details" ? "−" : "+"}</span>
              </button>
              {openAccordion === "details" && (
                <div className="accordion-content-body">
                  <dl className="details-def-list">
                    <div className="def-row">
                      <dt>Composition</dt>
                      <dd>{product.composition}</dd>
                    </div>
                    <div className="def-row">
                      <dt>Weave Type</dt>
                      <dd>{product.weave}</dd>
                    </div>
                    <div className="def-row">
                      <dt>Border</dt>
                      <dd>{product.border}</dd>
                    </div>
                    <div className="def-row">
                      <dt>Pallu</dt>
                      <dd>{product.pallu}</dd>
                    </div>
                    <div className="def-row">
                      <dt>Blouse Piece</dt>
                      <dd>{product.blousePiece}</dd>
                    </div>
                    <div className="def-row">
                      <dt>Length & Width</dt>
                      <dd>{product.length} × {product.width}</dd>
                    </div>
                    <div className="def-row">
                      <dt>Weight</dt>
                      <dd>{product.weight}</dd>
                    </div>
                    <div className="def-row">
                      <dt>Transparency</dt>
                      <dd>{product.transparency}</dd>
                    </div>
                    <div className="def-row">
                      <dt>SKU</dt>
                      <dd>EW-{product.category.toUpperCase().slice(0, 3)}-{product.id}04</dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>

            {/* 2. The Story / Provenance */}
            <div className="accordion-block">
              <button
                className="accordion-trigger-btn"
                onClick={() => toggleAccordion("story")}
                aria-expanded={openAccordion === "story"}
              >
                <span>The story</span>
                <span className="accordion-icon">{openAccordion === "story" ? "−" : "+"}</span>
              </button>
              {openAccordion === "story" && (
                <div className="accordion-content-body">
                  <p className="maker-note-p">{product.makerNote}</p>
                  <p className="atelier-note-p">
                    At Elite Weavers, provenance is purchase information, not decoration. Every handloom irregularity reflects human hand movement and is an organic hallmark of heirloom craft.
                  </p>
                </div>
              )}
            </div>

            {/* 3. Care Ritual */}
            <div className="accordion-block">
              <button
                className="accordion-trigger-btn"
                onClick={() => toggleAccordion("care")}
                aria-expanded={openAccordion === "care"}
              >
                <span>Care</span>
                <span className="accordion-icon">{openAccordion === "care" ? "−" : "+"}</span>
              </button>
              {openAccordion === "care" && (
                <div className="accordion-content-body">
                  <ul className="care-guidelines-list">
                    {product.care?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 4. Delivery & Returns */}
            <div className="accordion-block">
              <button
                className="accordion-trigger-btn"
                onClick={() => toggleAccordion("delivery")}
                aria-expanded={openAccordion === "delivery"}
              >
                <span>Delivery & returns</span>
                <span className="accordion-icon">{openAccordion === "delivery" ? "−" : "+"}</span>
              </button>
              {openAccordion === "delivery" && (
                <div className="accordion-content-body">
                  <p>{product.delivery}</p>
                  <p>{product.returns}</p>
                  <small className="disclaimer-note">
                    Colours may vary slightly by screen calibration and natural ambient sunlight.
                  </small>
                </div>
              )}
            </div>

            {/* 5. Customer Reviews */}
            <div className="accordion-block">
              <button
                className="accordion-trigger-btn"
                onClick={() => toggleAccordion("reviews")}
                aria-expanded={openAccordion === "reviews"}
              >
                <span>Reviews ({product.reviewCount})</span>
                <span className="accordion-icon">{openAccordion === "reviews" ? "−" : "+"}</span>
              </button>
              {openAccordion === "reviews" && (
                <div className="accordion-content-body">
                  <div className="reviews-summary-row">
                    <span className="rating-num">{product.rating}</span>
                    <span className="rating-stars">★★★★★</span>
                    <span className="rating-total">Based on {product.reviewCount} verified collector reviews</span>
                  </div>
                  <div className="review-quotes-stack">
                    <div className="single-review-quote">
                      <p>“The colour is even more beautiful in natural light. It feels special without feeling precious.”</p>
                      <cite>Meera S. · Mumbai</cite>
                    </div>
                    <div className="single-review-quote">
                      <p>“The hand of the fabric is extraordinary. I found the saree I will keep for my daughter.”</p>
                      <cite>Ananya R. · Bengaluru</cite>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together Recommendation */}
      <section className="frequently-bought-section">
        <div className="section-header-flex">
          <div>
            <p className="section-kicker">Styling Accompaniment</p>
            <h2 className="section-title">Complete the drape</h2>
          </div>
        </div>

        <div className="frequently-bought-card">
          <img
            src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80"
            alt="Hand-finished silk blouse piece"
          />
          <div className="frequently-bought-details">
            <h3>Hand-Spun Mulberry Silk Blouse Piece</h3>
            <p>1 Metre unstitched matching pure silk textile with artisanal zari selvedge. Custom-dyed to match {product.name}.</p>
            <div className="frequently-bought-price-row">
              <strong>₹3,400</strong>
              <button
                className="secondary-button"
                onClick={() => addToBag({
                  id: 999,
                  name: `Blouse Length for ${product.name}`,
                  category: "Blouse Piece",
                  colour: product.colour,
                  price: 3400,
                  images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80"]
                }, 1)}
              >
                Add accompaniment to bag
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="section-header-flex">
            <div>
              <p className="section-kicker">Considered Pairs</p>
              <h2 className="section-title">You may also appreciate</h2>
            </div>
          </div>

          <div className="catalog-products-grid">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
