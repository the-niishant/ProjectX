import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, allCategories } from "../data/products";
import { collections } from "../data/collections";
import { journalArticles } from "../data/journal";
import { ProductCard } from "../components/ProductCard";
import { useStore } from "../context/StoreContext";
import { trackEvent } from "../utils/analytics";

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState("All pieces");
  const [sortOrder, setSortOrder] = useState("curated");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { showToast } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 600);
    trackEvent("view_home");
    return () => clearTimeout(timer);
  }, []);

  // GSAP animations with prefers-reduced-motion check
  useLayoutEffect(() => {
    if (!ready || !containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Hero entrance
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-bg-media", { scale: 1.12, duration: 1.6, ease: "power2.out" }, 0)
          .from(".hero-kicker, .hero-title-line, .hero-copy, .hero-actions", {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 1.0
          }, 0.2)
          .from(".hero-detail-card", { x: 60, opacity: 0, rotate: 4, duration: 1.1 }, 0.4)
          .from(".hero-orbit-stamp, .hero-est-badge", { scale: 0, opacity: 0, stagger: 0.1, duration: 0.8 }, 0.6);

        // Hero Parallax on Scroll
        gsap.to(".hero-bg-media", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });

        gsap.to(".hero-text-lockup", {
          yPercent: -15,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });

        // Loom image parallax
        gsap.to(".loom-feature-img", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".loom-story-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        // Section reveals
        gsap.utils.toArray(".reveal-fade").forEach((elem) => {
          gsap.from(elem, {
            y: 35,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%"
            }
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [ready]);

  // Filtered products for homepage showcase
  const showcasedProducts = useMemo(() => {
    let list = products.filter((p) => {
      if (selectedCraft === "All pieces") return true;
      return p.category === selectedCraft;
    });

    if (sortOrder === "low") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortOrder === "newest") {
      list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return list;
  }, [selectedCraft, sortOrder]);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      showToast("Enter a valid email address.");
      return;
    }
    showToast("Thank you. You are on the list.");
    trackEvent("newsletter_signup", { source: "home" });
    setNewsletterEmail("");
  };

  return (
    <div className="home-view" ref={containerRef}>
      {/* Optional Preloader */}
      {!ready && (
        <div className="preloader-curtain">
          <span className="preloader-monogram">EW</span>
          <span className="preloader-bar"></span>
          <span className="preloader-subtext">Elite Weavers</span>
        </div>
      )}

      {/* Cinematic Hero */}
      <section className="hero-section" aria-label="Autumn 2024 Collection">
        <div className="hero-canvas-pattern"></div>
        <div className="hero-thread thread-1"></div>
        <div className="hero-thread thread-2"></div>
        <div className="hero-thread thread-3"></div>

        <img
          className="hero-bg-media"
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=90"
          alt="Woman draped in a deep crimson Banarasi silk saree"
        />
        <div className="hero-gradient-overlay"></div>

        <div className="hero-text-lockup">
          <p className="hero-kicker">The autumn edit / 2024</p>
          <h1 className="hero-headline">
            <span className="hero-title-line">Woven for</span>
            <span className="hero-title-line hero-title-italic">the occasion.</span>
          </h1>
          <p className="hero-copy">
            Sarees with a sense of place. Made by hand, chosen for the way they make you feel.
          </p>
          <div className="hero-actions">
            <Link to="/collections" className="primary-button hero-cta-btn">
              Discover the edit <span>↗</span>
            </Link>
            <Link to="/heritage" className="quiet-link">
              Meet the hands
            </Link>
          </div>
        </div>

        {/* Hero floating detail frame */}
        <div className="hero-detail-card">
          <div className="detail-frame-border"></div>
          <img
            src="/images/collection-hero.svg"
            alt="Macro detail of hand-interlocked zari border"
          />
          <span className="detail-card-caption">
            Hand finished<br />in Varanasi
          </span>
        </div>

        <div className="hero-est-badge">
          <span>EST.</span>
          <strong>2017</strong>
          <span>INDIA</span>
        </div>

        <div className="hero-orbit-stamp">
          <div className="orbit-rotating-ring">
            <span>Silk · Story · Ceremony · </span>
          </div>
        </div>

        <div className="hero-meta-footer">
          <span>01 / 05 Curations</span>
          <span className="scroll-cue">Scroll to enter</span>
          <span>India, slowly woven</span>
        </div>
      </section>

      {/* Brand Introduction */}
      <section className="intro-section reveal-fade">
        <div className="intro-vertical-line"></div>
        <p className="section-kicker">A considered wardrobe</p>
        <h2 className="section-title">
          The beauty of a saree<br />
          <em>is in its living story.</em>
        </h2>
        <p className="intro-paragraph">
          We work with master weavers across India to bring old techniques into the present.
          Each piece is selected for its hand, its history, and the woman it becomes.
        </p>
      </section>

      {/* Featured Collections Grid */}
      <section className="featured-collections-section" id="collections">
        <div className="section-header-flex reveal-fade">
          <div>
            <p className="section-kicker">The loom index</p>
            <h2 className="section-title">
              Five ways to wear<br />
              <em>the light.</em>
            </h2>
          </div>
          <Link to="/collections" className="editorial-arrow-link">
            Explore all collections <span>↗</span>
          </Link>
        </div>

        <div className="collections-asymmetric-grid">
          {collections.slice(0, 4).map((col, idx) => (
            <Link
              to={`/collections/${col.slug}`}
              className={`collection-tile tile-${idx}`}
              key={col.id}
              style={{ "--tile-color": col.color }}
            >
              <img src={col.heroImage} alt={col.name} loading="lazy" />
              <div className="collection-tile-scrim">
                <span className="tile-kicker">{col.kicker}</span>
                <h3 className="tile-title">{col.name}</h3>
                <small className="tile-note">{col.note}</small>
                <span className="tile-explore-cta">View curation ↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Craft Values Marquee Banner */}
      <div className="craft-values-band" aria-label="Our craft values">
        <div className="craft-values-track">
          <span>Pure Handloom</span>
          <i>✦</i>
          <span>Woven in India</span>
          <i>✦</i>
          <span>Pure Mulberry Silk</span>
          <i>✦</i>
          <span>Direct Weaver Partnerships</span>
          <i>✦</i>
          <span>Complimentary Insured Delivery</span>
          <i>✦</i>
          <span>Pure Handloom</span>
          <i>✦</i>
          <span>Woven with Care</span>
        </div>
      </div>

      {/* The Edit — Live Filterable Product Showcase */}
      <section className="products-showcase-section" id="the-edit">
        <div className="section-header-flex reveal-fade">
          <div>
            <p className="section-kicker">The edit</p>
            <h2 className="section-title">
              Pieces to keep<br />
              <em>close.</em>
            </h2>
          </div>

          <div className="filter-and-sort-wrap">
            <div className="filter-tabs-row" role="tablist">
              {allCategories.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selectedCraft === cat}
                  className={`craft-tab-btn ${selectedCraft === cat ? "is-active" : ""}`}
                  onClick={() => {
                    setSelectedCraft(cat);
                    trackEvent("filter_collection", { filterType: "craft", value: cat, source: "home" });
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <label className="sort-dropdown-label">
              <span>Sort</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                aria-label="Sort products"
              >
                <option value="curated">Curated</option>
                <option value="newest">New arrivals</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </label>
          </div>
        </div>

        <div className="product-cards-grid">
          {showcasedProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="showcase-bottom-cta">
          <Link to="/collections" className="primary-button">
            View full catalog ({products.length} pieces) <span>↗</span>
          </Link>
        </div>
      </section>

      {/* Category / Texture Explorer */}
      <section className="texture-explorer-section reveal-fade">
        <div className="explorer-copy">
          <p className="section-kicker">Find your texture</p>
          <h2 className="section-title">
            Shop by fabric,<br />
            <em>wear it your way.</em>
          </h2>
          <p className="explorer-lead">
            Whether you seek the structural weight of wedding silk or the gossamer breath of riverbank linen, discover sarees organized by tactile feeling.
          </p>
        </div>

        <div className="explorer-buttons-grid">
          {[
            { label: "Mulberry Silk", filter: "Mulberry silk" },
            { label: "Wild Tussar", filter: "Tussar silk" },
            { label: "Chanderi Gossamer", filter: "Silk-cotton" },
            { label: "Organic Linen", filter: "Linen-cotton" },
            { label: "Festive & Wedding", filter: "Wedding" },
            { label: "Everyday Heirlooms", filter: "Everyday" },
            { label: "Crisp Organza", filter: "Organza silk" },
            { label: "Fine Handloom Cotton", filter: "Cotton" }
          ].map((item) => (
            <Link
              key={item.label}
              to={`/collections?search=${encodeURIComponent(item.filter)}`}
              className="explorer-chip-link"
            >
              <span>{item.label}</span>
              <span className="arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Loom Story / Artisan Spotlight */}
      <section className="loom-story-section" id="heritage-spotlight">
        <div className="loom-image-column">
          <img
            className="loom-feature-img"
            src="/images/collection-hero.svg"
            alt="Hands working on a traditional wooden pit loom"
            loading="lazy"
          />
          <div className="loom-caption-box">
            <span>The hands<br />behind it</span>
          </div>
        </div>

        <div className="loom-copy-column">
          <p className="section-kicker">Our heritage</p>
          <h2 className="section-title">
            Before it is yours,<br />
            <em>it belongs to a story.</em>
          </h2>
          <p className="loom-narrative">
            In Kanchipuram, Varanasi, Maheshwar and beyond, the loom is still a place of patience.
            We partner with family-run ateliers who carry their methods forward one generation at a time.
            No automated mass production; only the deliberate handwork of master craftspeople.
          </p>
          <Link to="/heritage" className="editorial-arrow-link light-theme-link">
            Meet our weavers & ateliers <span>↗</span>
          </Link>
          <div className="loom-signature-stamp">E / W</div>
        </div>
      </section>

      {/* Editorial Journal Spotlight */}
      <section className="journal-spotlight-section">
        <div className="journal-main-feature reveal-fade">
          <Link to={`/journal/${journalArticles[0].slug}`} className="journal-feature-media">
            <img src={journalArticles[0].image} alt={journalArticles[0].title} loading="lazy" />
          </Link>
          <div className="journal-feature-info">
            <p className="section-kicker">From our journal · {journalArticles[0].category}</p>
            <h2 className="journal-feature-title">
              <Link to={`/journal/${journalArticles[0].slug}`}>
                {journalArticles[0].title}
              </Link>
            </h2>
            <p className="journal-feature-dek">{journalArticles[0].dek}</p>
            <Link to={`/journal/${journalArticles[0].slug}`} className="editorial-arrow-link">
              Read the story <span>↗</span>
            </Link>
          </div>
        </div>

        <div className="journal-side-feature reveal-fade">
          <Link to={`/journal/${journalArticles[3].slug}`} className="journal-side-media">
            <img src={journalArticles[3].image} alt={journalArticles[3].title} loading="lazy" />
          </Link>
          <div className="journal-side-info">
            <p className="section-kicker">{journalArticles[3].category} · {journalArticles[3].readTime}</p>
            <h3>
              <Link to={`/journal/${journalArticles[3].slug}`}>
                {journalArticles[3].title}
              </Link>
            </h3>
            <p>{journalArticles[3].dek}</p>
            <Link to="/journal" className="editorial-arrow-link">
              Explore all essays <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="testimonials-section reveal-fade">
        <p className="section-kicker">Worn and remembered</p>
        <h2 className="section-title">
          Pieces that become<br />
          <em>part of the story.</em>
        </h2>

        <div className="testimonials-grid">
          <blockquote className="testimonial-card">
            <p>“The colour is even more beautiful in natural light. It feels special without feeling precious.”</p>
            <cite>Meera S. · Mumbai</cite>
          </blockquote>

          <blockquote className="testimonial-card">
            <p>“The hand of the fabric is extraordinary. I found the saree I will keep for my daughter.”</p>
            <cite>Ananya R. · Bengaluru</cite>
          </blockquote>

          <blockquote className="testimonial-card">
            <p>“Everything arrived beautifully wrapped, with a personal note about the weaver.”</p>
            <cite>Clara D. · London</cite>
          </blockquote>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-banner-section reveal-fade">
        <div className="newsletter-text-col">
          <p className="section-kicker">A note, now and then</p>
          <h2 className="newsletter-headline">
            Stories from the loom,<br />
            <em>sent with care.</em>
          </h2>
        </div>

        <div className="newsletter-form-col">
          <form onSubmit={handleNewsletter} className="newsletter-signup-form">
            <label htmlFor="home-newsletter-email">Your email address</label>
            <div className="newsletter-input-wrap">
              <input
                id="home-newsletter-email"
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@example.com"
              />
              <button type="submit">Join the list <span>↗</span></button>
            </div>
            <small className="newsletter-reassurance">
              We write sparingly. Unsubscribe anytime.
            </small>
          </form>
        </div>
      </section>
    </div>
  );
}
