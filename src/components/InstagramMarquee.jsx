import React, { useEffect, useRef } from "react";
import { useLenis } from "./LenisProvider";

const marqueeImages = [
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1598961942613-ba897716405b?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80"
];

export function InstagramMarquee() {
  const trackRef = useRef(null);
  const lenis = useLenis();
  const currentPosRef = useRef(0);
  const rafIdRef = useRef(null);

  useEffect(() => {
    let baseSpeed = 0.75; // Base continuous drift speed
    let extraSpeed = 0;

    const updateMarquee = () => {
      // Connect to Lenis scroll velocity if available
      if (lenis && lenis.velocity) {
        extraSpeed = Math.abs(lenis.velocity) * 0.45;
      } else {
        extraSpeed *= 0.92; // smooth decay
      }

      const step = baseSpeed + extraSpeed;
      currentPosRef.current += step;

      if (trackRef.current) {
        // Wrap around half width (since array is doubled)
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (currentPosRef.current >= halfWidth) {
          currentPosRef.current -= halfWidth;
        }
        trackRef.current.style.transform = `translate3d(-${currentPosRef.current}px, 0, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(updateMarquee);
    };

    rafIdRef.current = requestAnimationFrame(updateMarquee);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [lenis]);

  // Duplicate for seamless infinite loop
  const displayImages = [...marqueeImages, ...marqueeImages];

  return (
    <section className="instagram-marquee-section" aria-label="Social Media Editorial Gallery">
      <div className="marquee-wrapper">
        <div className="marquee-track" ref={trackRef}>
          {displayImages.map((src, idx) => (
            <div key={idx} className="marquee-item">
              <img
                src={src}
                alt="Elite Weavers visual editorial feed"
                className="marquee-photo"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Center Floating Frosted Brand Badge */}
        <div className="marquee-center-badge">
          <span className="badge-handle">@eliteweavers</span>
          <h3 className="badge-title">FOLLOW OUR JOURNEY</h3>
          <p className="badge-sub">Daily dispatches from the looms of Varanasi & Kanchipuram</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="badge-link"
          >
            <span>Explore Instagram</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
