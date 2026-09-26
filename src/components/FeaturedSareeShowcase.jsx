import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import { trackEvent } from "../utils/analytics";

gsap.registerPlugin(ScrollTrigger);

// 5 Curated Iconic Saree Stories as specified in PRD Section 9
const showcaseItems = [
  {
    ...products.find((p) => p.id === 2), // Aranya Kanjivaram
    label: "Kanchipuram Silk",
    subtitle: "The Korvai Interlock & Solid Temple Zari",
    bgTint: "rgba(247, 242, 234, 1)",
    paletteAccent: "#3B4A3F",
    swatches: [
      { name: "Forest & Crimson", color: "#2B4032", imageIdx: 0 },
      { name: "Antique Gold", color: "#C6A15B", imageIdx: 1 },
      { name: "Temple Ruby", color: "#682533", imageIdx: 2 }
    ]
  },
  {
    ...products.find((p) => p.id === 1), // Nila Banarasi
    label: "Banarasi Kadwa Brocade",
    subtitle: "Midnight Silk with Antique Jangla Motifs",
    bgTint: "rgba(239, 241, 245, 1)",
    paletteAccent: "#182C48",
    swatches: [
      { name: "Midnight Indigo", color: "#182C48", imageIdx: 0 },
      { name: "Zari Sheen", color: "#C6A15B", imageIdx: 1 },
      { name: "Royal Navy", color: "#0A1826", imageIdx: 2 }
    ]
  },
  {
    ...products.find((p) => p.id === 3), // Mogra Chanderi
    label: "Chanderi Gossamer",
    subtitle: "Luminescent Silk-Cotton with Ashrafi Butti",
    bgTint: "rgba(248, 245, 239, 1)",
    paletteAccent: "#847B6F",
    swatches: [
      { name: "Ivory Mogra", color: "#FAF6EE", imageIdx: 0 },
      { name: "Champagne Zari", color: "#D8C7A3", imageIdx: 1 },
      { name: "Muted Saffron", color: "#C6A15B", imageIdx: 2 }
    ]
  },
  {
    ...products.find((p) => p.id === 6), // Malhar Organza
    label: "Organza Saffron",
    subtitle: "Crisp Gossamer Weave with Gilded Border",
    bgTint: "rgba(252, 246, 240, 1)",
    paletteAccent: "#9E6D38",
    swatches: [
      { name: "Warm Saffron", color: "#D9883B", imageIdx: 0 },
      { name: "Sunrise Gold", color: "#C6A15B", imageIdx: 1 },
      { name: "Blush Rose", color: "#B86B77", imageIdx: 2 }
    ]
  },
  {
    ...products.find((p) => p.id === 5), // Neel Tussar
    label: "Wild Tussar Silk",
    subtitle: "Organic Textured Slub Dyed in Small Batches",
    bgTint: "rgba(244, 241, 236, 1)",
    paletteAccent: "#4B443B",
    swatches: [
      { name: "Raw Indigo", color: "#2B3D52", imageIdx: 0 },
      { name: "Copper Slub", color: "#9E6446", imageIdx: 1 },
      { name: "Natural Earth", color: "#6E5B4B", imageIdx: 2 }
    ]
  }
];

export function FeaturedSareeShowcase() {
  const containerRef = useRef(null);
  const imageFrameRef = useRef(null);
  const infoRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSwatch, setSelectedSwatch] = useState(0);
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const { addToBag, setQuickViewProduct, money, isWished, toggleWish } = useStore();

  const currentItem = showcaseItems[activeIndex] || showcaseItems[0];
  const wished = isWished(currentItem?.id);

  // GSAP Pinned ScrollTrigger with precise product-swapping transitions
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=3200",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Calculate step 0 to 4
          const total = showcaseItems.length;
          const targetIndex = Math.min(Math.floor(progress * total), total - 1);

          if (targetIndex !== activeIndexRef.current) {
            transitionProduct(targetIndex);
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const transitionProduct = (nextIndex) => {
    if (nextIndex === activeIndexRef.current) return;

    // Outgoing animation: opacity 1 -> 0, x 0 -> -60, scale 1 -> 0.96, blur 0 -> 8px
    gsap.to(".showcase-active-img", {
      opacity: 0,
      x: -60,
      scale: 0.96,
      filter: "blur(8px)",
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveIndex(nextIndex);
        setSelectedSwatch(0);

        // Incoming animation: opacity 0 -> 1, x 60 -> 0, scale 0.86 -> 1, blur 8px -> 0
        gsap.fromTo(
          ".showcase-active-img",
          { opacity: 0, x: 60, scale: 0.88, filter: "blur(6px)" },
          { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 0.65, ease: "power3.out" }
        );

        // Text reveal
        gsap.fromTo(
          ".showcase-text-block",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
        );
      }
    });
  };

  const handleManualSelect = (index) => {
    transitionProduct(index);
    trackEvent("showcase_tab_click", { index, sareeName: showcaseItems[index].name });
  };

  const currentImageSrc =
    currentItem.images?.[selectedSwatch] ||
    currentItem.images?.[0] ||
    "/products/1.svg";

  return (
    <section
      className="featured-showcase-section"
      ref={containerRef}
      style={{ backgroundColor: currentItem.bgTint }}
      aria-label="Featured Saree Editions"
    >
      {/* Background Ambience Tint Transition */}
      <div className="showcase-container">
        {/* Section Overline Header */}
        <div className="showcase-top-bar">
          <div className="showcase-badge-pill">
            <span className="sparkle">✦</span>
            <span>SHOWCASE CURATION</span>
          </div>
          <span className="showcase-pagination-label">
            {`0${activeIndex + 1}`} / {`0${showcaseItems.length}`}
          </span>
        </div>

        {/* 55% Left Media / 45% Right Story Grid */}
        <div className="showcase-main-grid">
          {/* Left Column: Big Editorial Saree Frame */}
          <div className="showcase-media-col" ref={imageFrameRef}>
            <div className="showcase-card-stage">
              <span className="showcase-arch-frame" aria-hidden="true" />
              <img
                src={currentImageSrc}
                alt={`${currentItem.name} - ${currentItem.label}`}
                className="showcase-active-img"
                loading="eager"
              />

              {/* Wishlist Floating Button */}
              <button
                className={`showcase-wishlist-btn ${wished ? "is-active" : ""}`}
                onClick={() => toggleWish(currentItem.id)}
                aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>

              {/* Tag Badge */}
              <div className="showcase-craft-pill">
                <span>{currentItem.origin?.split(",")?.[0]}</span>
                <i>·</i>
                <span>{currentItem.weave?.split(" ")?.[0]}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Product Information */}
          <div className="showcase-info-col" ref={infoRef}>
            <div className="showcase-text-block">
              <p className="showcase-category-label">
                {currentItem.label}
              </p>

              <h2 className="showcase-product-name">
                {currentItem.name}
              </h2>

              <p className="showcase-subtitle-note">
                {currentItem.subtitle}
              </p>

              <p className="showcase-editorial-desc">
                {currentItem.description}
              </p>

              {/* Fabric Specs Badges */}
              <div className="showcase-specs-row">
                <div className="spec-badge">
                  <span className="spec-kicker">Fabric</span>
                  <strong className="spec-val">{currentItem.fabric}</strong>
                </div>
                <div className="spec-badge">
                  <span className="spec-kicker">Origin</span>
                  <strong className="spec-val">{currentItem.origin}</strong>
                </div>
                <div className="spec-badge">
                  <span className="spec-kicker">Weight</span>
                  <strong className="spec-val">{currentItem.weight}</strong>
                </div>
              </div>

              {/* Pricing */}
              <div className="showcase-price-box">
                <span className="showcase-price-amount">
                  {money(currentItem.price)}
                </span>
                {currentItem.compareAt && (
                  <span className="showcase-compare-at">
                    {money(currentItem.compareAt)}
                  </span>
                )}
                <span className="showcase-tax-note">Inclusive of all taxes & insured shipping</span>
              </div>

              {/* Colorway Swatches */}
              <div className="showcase-swatches-section">
                <span className="swatches-title">
                  Available Perspectives: <em>{currentItem.swatches[selectedSwatch]?.name}</em>
                </span>
                <div className="swatches-group" role="radiogroup" aria-label="Saree perspectives and drape">
                  {currentItem.swatches.map((swatch, idx) => (
                    <button
                      key={swatch.name}
                      role="radio"
                      aria-checked={selectedSwatch === idx}
                      className={`swatch-circle-btn ${selectedSwatch === idx ? "is-selected" : ""}`}
                      style={{ "--swatch-fill": swatch.color }}
                      onClick={() => setSelectedSwatch(idx)}
                      title={swatch.name}
                    >
                      <span className="swatch-inner" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="showcase-actions-group">
                <button
                  className="showcase-add-btn"
                  onClick={() => {
                    addToBag(currentItem, 1);
                    trackEvent("add_to_bag_showcase", { productId: currentItem.id, productName: currentItem.name });
                  }}
                  aria-label={`Add ${currentItem.name} to shopping bag`}
                >
                  <span>Add to Bag</span>
                  <span className="btn-gold-accent">✦</span>
                </button>

                <button
                  className="showcase-quickview-btn"
                  onClick={() => setQuickViewProduct(currentItem)}
                  aria-label={`Quick inspect details for ${currentItem.name}`}
                >
                  <span>View Details</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Segmented Progress Indicator (PRD Section 9) */}
        <div className="showcase-segmented-nav" aria-label="Showcase Product Navigation">
          {showcaseItems.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                className={`segmented-step-btn ${isActive ? "is-active" : ""}`}
                onClick={() => handleManualSelect(idx)}
                aria-label={`Switch to piece 0${idx + 1}: ${item.name}`}
              >
                <div className="step-num-wrap">
                  <span className="step-num">{`0${idx + 1}`}</span>
                  <span className="step-name">{item.name}</span>
                </div>
                <div className="step-track-bar">
                  <div className="step-fill-bar" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}