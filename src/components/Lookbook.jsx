import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

const lookbookItems = [
  {
    lookNumber: "01",
    title: "The Midnight Banarasi",
    collection: "The Night Loom · Varanasi",
    caption: "Heavy pure silk kadwa brocade reflecting the quiet geometry of temple steeples after dark.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85",
    productLink: "/products/nila-banarasi-silk",
    productName: "Nila Banarasi Silk"
  },
  {
    lookNumber: "02",
    title: "The Temple Sovereign",
    collection: "Southern Light · Kanchipuram",
    caption: "Forest green body interlocked by hand with an unyielding crimson and gold gopuram border.",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85",
    productLink: "/products/aranya-kanjivaram",
    productName: "Aranya Kanjivaram"
  },
  {
    lookNumber: "03",
    title: "The Gossamer Veil",
    collection: "Barely There · Pranpur",
    caption: "Ivory un-degummed silk warp yielding a translucent, breathless fall for warm ceremonies.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
    productLink: "/products/mogra-chanderi",
    productName: "Mogra Chanderi"
  },
  {
    lookNumber: "04",
    title: "The Regal Paithani",
    collection: "The Celebration Edit · Yeola",
    caption: "Rose filature silk crowned by an interlocking tapestry peacock pallu in jewel tones.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
    productLink: "/products/gul-paithani",
    productName: "Gul Paithani"
  },
  {
    lookNumber: "05",
    title: "The Solar Saffron",
    collection: "Modern Heirlooms · Chanderi",
    caption: "Fine crisp organza with micro metallic selvedge creating an architectural silhouette.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
    productLink: "/products/malhar-organza",
    productName: "Malhar Organza"
  }
];

export function Lookbook() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressLineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024;

      if (!prefersReducedMotion && isDesktop && trackRef.current) {
        const track = trackRef.current;
        const totalScroll = track.scrollWidth - window.innerWidth + 120;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalScroll * 1.2}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            }
          }
        });

        // Horizontal translation
        tl.to(track, {
          x: () => -totalScroll,
          ease: "none"
        }, 0);

        // Independent subtle parallax on all lookbook images inside cards
        const innerImages = track.querySelectorAll(".lookbook-card-photo");
        innerImages.forEach((img) => {
          tl.fromTo(
            img,
            { xPercent: 12 },
            { xPercent: -12, ease: "none" },
            0
          );
        });

        // Gold Progress line
        tl.to(
          progressLineRef.current,
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none"
          },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="lookbook-section" ref={sectionRef} id="lookbook" aria-label="Editorial Lookbook">
      <div className="lookbook-inner-container">
        {/* Header */}
        <div className="lookbook-header-bar">
          <div className="lookbook-title-wrap">
            <span className="editorial-kicker">AUTUMN / WINTER CAMPAIGN</span>
            <h2 className="editorial-display-title">The Lookbook</h2>
          </div>
          <div className="lookbook-meta-indicator">
            <span className="current-look-count">
              {`0${Math.min(Math.floor(scrollProgress * lookbookItems.length) + 1, lookbookItems.length)}`} / 05
            </span>
            <span className="lookbook-drag-hint">SCROLL HORIZONTALLY →</span>
          </div>
        </div>

        {/* Horizontal Track of Large Editorial Frames */}
        <div className="lookbook-track-window">
          <div className="lookbook-track" ref={trackRef}>
            {lookbookItems.map((item) => (
              <div key={item.lookNumber} className="lookbook-card">
                <div className="lookbook-media-wrap">
                  <div className="lookbook-photo-overflow">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="lookbook-card-photo"
                      loading="lazy"
                    />
                  </div>
                  <div className="lookbook-tag-pill">
                    <span>LOOK {item.lookNumber}</span>
                  </div>
                </div>

                <div className="lookbook-card-info">
                  <span className="lookbook-collection-name">{item.collection}</span>
                  <h3 className="lookbook-look-title">{item.title}</h3>
                  <p className="lookbook-caption">{item.caption}</p>
                  <Link to={item.productLink} className="lookbook-view-cta">
                    <span>Shop {item.productName}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thin Gold Progress Line underneath */}
        <div className="lookbook-progress-wrapper" aria-hidden="true">
          <div className="lookbook-progress-track">
            <div className="lookbook-progress-bar" ref={progressLineRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
