import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CraftSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const headlineRef = useRef(null);
  const countersRef = useRef(null);

  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Animated counters object
      const counts = { hours: 0, purity: 0, artisans: 0 };

      const isDesktop = window.innerWidth >= 1024;

      if (!prefersReducedMotion && isDesktop) {
        // Word reveal starts when section scrolls into view
        gsap.fromTo(
          headlineRef.current?.querySelectorAll(".word-reveal"),
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.08,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Pinned Split-Screen Animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1600",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1
          }
        });

        // Ken-Burns image zoom & subtle pan
        tl.fromTo(
          imageRef.current,
          { scale: 1.15, xPercent: -2 },
          { scale: 1.0, xPercent: 0, ease: "none" },
          0
        )
          // Scrub counters from 0 to target
          .to(
            counts,
            {
              hours: 120,
              purity: 100,
              artisans: 40,
              ease: "none",
              onUpdate: () => {
                setCounter1(Math.round(counts.hours));
                setCounter2(Math.round(counts.purity));
                setCounter3(Math.round(counts.artisans));
              }
            },
            0
          );
      } else {
        // Fallback for mobile / reduced motion: trigger when in view
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(counts, {
              hours: 120,
              purity: 100,
              artisans: 40,
              duration: 2.0,
              ease: "power2.out",
              onUpdate: () => {
                setCounter1(Math.round(counts.hours));
                setCounter2(Math.round(counts.purity));
                setCounter3(Math.round(counts.artisans));
              }
            });
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="craft-story-section" ref={containerRef} aria-label="The Art of the Saree Craftsmanship">
      <div className="craft-split-container">
        {/* Left Column: Macro Craft Imagery (Ken-Burns) */}
        <div className="craft-media-column">
          <div className="craft-image-frame">
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1400&q=85"
              alt="Master artisan weaving authentic pure zari warp and silk weft"
              className="craft-macro-photo"
              loading="lazy"
            />
            <div className="craft-media-badge">
              <span className="badge-dot" />
              <span>HANDLOOM ATELIER · VARANASI</span>
            </div>
            <div className="craft-detail-thumb">
              <img
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=85"
                alt="Macro gold zari thread detail"
              />
              <span className="thumb-caption">Hand-interlocked kadwa zari</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Craft Narrative */}
        <div className="craft-narrative-column">
          <div className="craft-text-wrapper">
            <span className="editorial-kicker">THE ART OF THE SAREE</span>

            <h2 className="craft-headline" ref={headlineRef}>
              <span className="word-wrap"><span className="word-reveal">Every</span></span>{" "}
              <span className="word-wrap"><span className="word-reveal">thread</span></span>{" "}
              <span className="word-wrap"><span className="word-reveal">has</span></span>{" "}
              <span className="word-wrap"><span className="word-reveal craft-headline-italic">a story.</span></span>
            </h2>

            <p className="craft-narrative-lead">
              A saree is never manufactured; it is composed over weeks of concentrated breath and rhythmic shuttle movement.
              In Varanasi, Kanchipuram, and Maheshwar, our master weavers interlock silk threads using centuries-old pit looms.
            </p>

            <p className="craft-narrative-secondary">
              No automation, no synthetic dilution. Genuine metallic zari, vegetable and gentle azo-free vats, and hand-counted warp threads give each piece an unmistakable weight, fall, and living heirloom soul.
            </p>

            {/* Animated Counters (PRD Section 14 & 15) */}
            <div className="craft-metrics-row" ref={countersRef}>
              <div className="metric-box">
                <span className="metric-value">{counter1}+</span>
                <span className="metric-label">Hours of Handwork</span>
              </div>
              <div className="metric-box">
                <span className="metric-value">{counter2}%</span>
                <span className="metric-label">Selected Natural Fibres</span>
              </div>
              <div className="metric-box">
                <span className="metric-value">{counter3}+</span>
                <span className="metric-label">Master Weaver Ateliers</span>
              </div>
            </div>

            <div className="craft-cta-wrap">
              <Link to="/heritage" className="craft-explore-btn">
                <span>Meet Our Weavers & Ateliers</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
