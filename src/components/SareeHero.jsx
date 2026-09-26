import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero3DExperience = lazy(() =>
  import("./Hero3DExperience").then((mod) => ({ default: mod.Hero3DExperience }))
);

gsap.registerPlugin(ScrollTrigger);

export function SareeHero() {
  const heroWrapperRef = useRef(null);
  const heroFrameRef = useRef(null);
  const mediaRef = useRef(null);
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const actionsRef = useRef(null);
  const kickerRef = useRef(null);
  const progressLineRef = useRef(null);

  const [experienceMode, setExperienceMode] = useState("cinematic"); // "cinematic" | "3d"

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // 1. Initial Silk Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        mediaRef.current,
        { scale: 1.12, opacity: 0.8 },
        { scale: 1.0, opacity: 1, duration: 1.6, ease: "power2.out" }
      )
        .fromTo(
          kickerRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=1.1"
        )
        .fromTo(
          headlineRef.current?.querySelectorAll(".headline-line"),
          { y: "115%", rotateZ: 1.5, opacity: 0 },
          { y: "0%", rotateZ: 0, opacity: 1, duration: 1.2, stagger: 0.12 },
          "-=0.9"
        )
        .fromTo(
          copyRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          actionsRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        );

      // 2. Hero Transformation on Scroll (AURELLE Reference transformation)
      if (!prefersReducedMotion && heroFrameRef.current) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroWrapperRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            anticipatePin: 1
          }
        });

        // Scales into rounded editorial frame
        scrollTl
          .to(heroFrameRef.current, {
            scale: 0.92,
            borderRadius: "32px",
            yPercent: 8,
            boxShadow: "0 25px 60px rgba(30, 23, 20, 0.28)",
            ease: "none"
          }, 0)
          .to(mediaRef.current, {
            yPercent: 12,
            scale: 1.05,
            ease: "none"
          }, 0)
          .to(headlineRef.current, {
            y: -120,
            opacity: 0.35,
            ease: "none"
          }, 0)
          .to([copyRef.current, actionsRef.current], {
            y: -60,
            opacity: 0.2,
            ease: "none"
          }, 0)
          .to(progressLineRef.current, {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none"
          }, 0);
      }
    }, heroWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-scroll-wrapper" ref={heroWrapperRef}>
      <section className="hero-cinematic-frame" ref={heroFrameRef} aria-label="Haute Couture Handcrafted Sarees">
        {/* Visual Media Layer: Cinematic Imagery or 3D Silk Drape */}
        <div className="hero-media-container" ref={mediaRef}>
          {experienceMode === "cinematic" ? (
            <>
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=88"
                alt="Editorial portrait of a woman draped in deep crimson and antique gold zari bridal saree"
                className="hero-primary-photo"
                loading="eager"
              />
              <div className="hero-atmosphere-scrim" />
              <div className="hero-vignette" />
            </>
          ) : (
            <Suspense
              fallback={
                <div className="hero-3d-fallback">
                  <img
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85"
                    alt="Tactile silk fabric drape loading"
                    className="hero-3d-fallback-img"
                  />
                </div>
              }
            >
              <Hero3DExperience active={true} />
            </Suspense>
          )}
        </div>

        {/* Mode Toggle Pill */}
        <div className="hero-mode-pill">
          <button
            className={`mode-btn ${experienceMode === "cinematic" ? "is-active" : ""}`}
            onClick={() => setExperienceMode("cinematic")}
            aria-label="Switch to Cinematic Editorial View"
          >
            Editorial Film
          </button>
          <span className="mode-pill-separator">·</span>
          <button
            className={`mode-btn ${experienceMode === "3d" ? "is-active" : ""}`}
            onClick={() => setExperienceMode("3d")}
            aria-label="Switch to 3D Silk Tactile Drape"
          >
            3D Silk Drape ✦
          </button>
        </div>

        {/* Editorial Content Overlay */}
        <div className="hero-content-lockup">
          <p className="hero-overline" ref={kickerRef}>
            THE NEW EDITION · HANDCRAFTED IN INDIA
          </p>

          <h1 className="hero-display-headline" ref={headlineRef}>
            <span className="headline-line-wrap">
              <span className="headline-line">Draped in</span>
            </span>
            <span className="headline-line-wrap">
              <span className="headline-line hero-headline-italic">something timeless.</span>
            </span>
          </h1>

          <p className="hero-supporting-copy" ref={copyRef}>
            Handcrafted sarees created for celebrations, rituals and unforgettable moments.
            Woven slowly in Varanasi and Kanchipuram with pure mulberry silk and hand-interlocked zari.
          </p>

          <div className="hero-cta-actions" ref={actionsRef}>
            <Link to="/collections" className="hero-primary-btn">
              <span>Explore Collection</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Link>
            <Link to="/heritage" className="hero-secondary-btn">
              <span>Discover the Craft</span>
            </Link>
          </div>
        </div>

        {/* Bottom Scroll Cue & Thin Vertical Progress Line */}
        <div className="hero-bottom-cue" aria-hidden="true">
          <span className="cue-label">SCROLL TO DISCOVER</span>
          <div className="cue-line-track">
            <div className="cue-line-progress" ref={progressLineRef} />
          </div>
        </div>

        {/* Luxury Corner Metadata Badges */}
        <div className="hero-corner-tag top-left-tag">
          <span>01 / 05 EDITIONS</span>
        </div>
        <div className="hero-corner-tag bottom-right-tag">
          <span>GENUINE SILK MARK · HANDLOOM CERTIFIED</span>
        </div>
      </section>
    </div>
  );
}