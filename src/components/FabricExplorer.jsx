import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import { trackEvent } from "../utils/analytics";

const fabricsData = [
  {
    id: "silk",
    name: "Mulberry Silk",
    shortName: "Silk",
    kicker: "THE HEIRLOOM BENCHMARK",
    tagline: "Heavy, assured fall with a rich natural lustre.",
    description: "Spun from 100% pure filature silk yarns. Mulberry silk holds structured pleats effortlessly and retains a gentle, ambient warmth in evening lighting.",
    handFeel: "Smooth, cool to the touch, dense and fluid",
    weight: "720–860 grams (Structured heavy drape)",
    transparency: "Completely opaque",
    textureImg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
    matchingProductIds: [2, 1]
  },
  {
    id: "organza",
    name: "Crisp Organza",
    shortName: "Organza",
    kicker: "GOSSAMER STRUCTURE",
    tagline: "Weightless translucency that holds an architectural silhouette.",
    description: "Woven with tightly twisted un-degummed silk filaments. Organza produces a crisp, ethereal halo effect with a glass-like sheen that catches sunlight.",
    handFeel: "Crisp, airy, slightly paper-like finish",
    weight: "320–380 grams (Featherweight)",
    transparency: "Semi-translucent gossamer",
    textureImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85",
    matchingProductIds: [6, 3]
  },
  {
    id: "chanderi",
    name: "Chanderi Gossamer",
    shortName: "Chanderi",
    kicker: "ROYAL MADHYA PRADESH HERITAGE",
    tagline: "Luminous silk warp with ultra-fine spun cotton weft.",
    description: "Famous for its micro ashrafi butti motifs and subtle sheer bounce. Chanderi drapes like a soft whisper and breathes comfortably through warm festive days.",
    handFeel: "Soft, feather-light, breathable bounce",
    weight: "390–440 grams (Ultralight)",
    transparency: "Subtly sheer against light",
    textureImg: "https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?auto=format&fit=crop&w=1200&q=85",
    matchingProductIds: [3, 7]
  },
  {
    id: "cotton",
    name: "Handloom Cotton",
    shortName: "Cotton",
    kicker: "ORGANIC EARTHY BREATHABILITY",
    tagline: "High-count desi cotton with an authentic artisan hand.",
    description: "Spun from natural indigenous cotton fibres. Woven slowly on wooden frame looms, growing softer with every wash while retaining a poised drape.",
    handFeel: "Matte, breathable, natural slub texture",
    weight: "480–540 grams (Daily ease)",
    transparency: "Opaque",
    textureImg: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85",
    matchingProductIds: [7, 5]
  },
  {
    id: "tussar",
    name: "Wild Tussar",
    shortName: "Tussar",
    kicker: "ORGANIC FOREST SILK",
    tagline: "Richly textured with natural gold undertones and organic slub.",
    description: "Harvested from wild forest silkworms in Bhagalpur. Tussar possesses an earthy, porous texture with a subdued matte sheen that never looks synthetic.",
    handFeel: "Dry, slightly granular, structured",
    weight: "510–580 grams (Medium weight)",
    transparency: "Opaque",
    textureImg: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
    matchingProductIds: [5, 4]
  },
  {
    id: "banarasi",
    name: "Banarasi Brocade",
    shortName: "Banarasi",
    kicker: "TIME-HONOURED KADWA BROCADE",
    tagline: "Intricate metallic zari woven without floating threads at back.",
    description: "The gold standard of Indian ceremonial dressing. Every leaf, vine, and jangla motif is individually carved into the warp using tested gold zari.",
    handFeel: "Sumptuous, substantial, deeply contoured",
    weight: "780–920 grams (Opulent ceremonial weight)",
    transparency: "Completely opaque",
    textureImg: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    matchingProductIds: [1, 8]
  }
];

export function FabricExplorer() {
  const [activeTab, setActiveTab] = useState(0);
  const detailBoxRef = useRef(null);
  const { addToBag, money } = useStore();

  const currentFabric = fabricsData[activeTab];

  const handleSelectTab = (idx) => {
    if (idx === activeTab) return;

    gsap.to(detailBoxRef.current, {
      opacity: 0,
      y: 12,
      scale: 0.98,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(idx);
        gsap.fromTo(
          detailBoxRef.current,
          { opacity: 0, y: 16, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
        );
      }
    });

    trackEvent("fabric_tab_select", { fabric: fabricsData[idx].name });
  };

  const matchingProducts = products.filter((p) =>
    currentFabric.matchingProductIds.includes(p.id)
  );

  return (
    <section className="fabric-explorer-section" id="fabrics" aria-label="Interactive Fabric Texture Discovery">
      <div className="fabric-container">
        {/* Section Heading */}
        <div className="section-header-centered">
          <span className="editorial-kicker">TACTILE DISCOVERY</span>
          <h2 className="editorial-display-title">Choose Your Texture</h2>
          <p className="section-sub-copy">
            A saree is defined first by how it feels against your skin. Select a weave below to discover its physical traits, weight, and recommended silhouettes.
          </p>
        </div>

        {/* Horizontal Category Tabs Row */}
        <div className="fabric-tabs-scroll-wrap" role="tablist" aria-label="Fabric materials">
          {fabricsData.map((f, idx) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={activeTab === idx}
              className={`fabric-pill-tab ${activeTab === idx ? "is-active" : ""}`}
              onClick={() => handleSelectTab(idx)}
            >
              <span className="tab-bullet">✦</span>
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Detail Card with Crossfade */}
        <div className="fabric-stage-box" ref={detailBoxRef}>
          <div className="fabric-stage-grid">
            {/* Left: Texture Visual */}
            <div className="fabric-texture-preview">
              <div className="texture-frame">
                <img
                  src={currentFabric.textureImg}
                  alt={`${currentFabric.name} weave texture detail`}
                  className="texture-macro-img"
                />
                <div className="texture-zoom-tag">
                  <span>MACRO WEAVE DETAIL</span>
                </div>
              </div>
            </div>

            {/* Middle: Fabric Specifications */}
            <div className="fabric-specs-pane">
              <span className="fabric-spec-kicker">{currentFabric.kicker}</span>
              <h3 className="fabric-spec-title">{currentFabric.name}</h3>
              <p className="fabric-tagline">{currentFabric.tagline}</p>
              <p className="fabric-description">{currentFabric.description}</p>

              <div className="fabric-attributes-list">
                <div className="fabric-attr-item">
                  <span className="attr-name">Hand Feel:</span>
                  <span className="attr-value">{currentFabric.handFeel}</span>
                </div>
                <div className="fabric-attr-item">
                  <span className="attr-name">Weight Class:</span>
                  <span className="attr-value">{currentFabric.weight}</span>
                </div>
                <div className="fabric-attr-item">
                  <span className="attr-name">Fall & Opacity:</span>
                  <span className="attr-value">{currentFabric.transparency}</span>
                </div>
              </div>
            </div>

            {/* Right: Curated Recommendations */}
            <div className="fabric-recommendations-pane">
              <span className="recommendations-heading">Recommended Silhouettes</span>
              <div className="recommended-cards-stack">
                {matchingProducts.map((prod) => (
                  <div key={prod.id} className="mini-recommendation-card">
                    <img
                      src={prod.images?.[0] || "/products/1.svg"}
                      alt={prod.name}
                      className="mini-card-thumb"
                    />
                    <div className="mini-card-info">
                      <h4 className="mini-card-title">{prod.name}</h4>
                      <span className="mini-card-price">{money(prod.price)}</span>
                      <div className="mini-card-actions">
                        <Link to={`/products/${prod.slug}`} className="mini-view-link">
                          View Saree ↗
                        </Link>
                        <button
                          className="mini-add-btn"
                          onClick={() => addToBag(prod, 1)}
                          aria-label={`Add ${prod.name} to bag`}
                        >
                          + Bag
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
