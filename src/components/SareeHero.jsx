import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

gsap.registerPlugin(ScrollTrigger);

export function SareeHero() {
  const heroRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      
      // Hero entrance animation
      gsap.fromTo(
        hero.querySelector(".hero-bg-media"),
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-kicker",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-title",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
      );

      // Hero transformation on scroll
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          
          // Transform hero
          gsap.to(hero.querySelector(".hero-bg-media"), {
            scale: 0.85,
            duration: 0.1,
            immediateRender: false
          });

          gsap.to(hero.querySelector(".hero-overlay"), {
            opacity: 0,
            duration: 0.1,
            immediateRender: false
          });

          gsap.to(hero.querySelector(".hero-actions"), {
            opacity: 0,
            y: 20,
            duration: 0.1,
            immediateRender: false
          });

          // Round corners
          gsap.to(hero, {
            borderRadius: `${progress * 32}px`,
            duration: 0.1,
            immediateRender: false
          });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={heroRef} aria-label="Featured Collection">
      <div className="hero-bg-wrapper">
        <img
          className="hero-bg-media"
          src="/images/collection-hero.svg"
          alt="Premium silk saree draped in gold zari"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <p className="hero-kicker">THE NEW EDITION</p>
        <h1 className="hero-title">Woven for<br />the moments that matter.</h1>
        <p className="hero-copy">
          Handcrafted sarees created for celebrations, rituals and unforgettable moments.
        </p>
        <div className="hero-actions">
          <Link to="/collections" className="primary-button">
            Explore Collection
          </Link>
          <Link to="/heritage" className="quiet-link">
            Discover the Craft
          </Link>
        </div>
        <div className="hero-progress-indicator">
          <span>{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>
    </section>
  );
}