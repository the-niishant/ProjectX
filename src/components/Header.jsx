import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { trackEvent } from "../utils/analytics";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { wishlist, bagItemCount, setIsCartOpen, setIsSearchOpen } = useStore();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <div className="announcement-strip">
        <span>Handcrafted in India · Complimentary Express Shipping Over ₹10,000 · Authenticity Guaranteed</span>
      </div>

      <header
        className={`site-header ${isScrolled ? "is-scrolled" : ""} ${isHome ? "is-home-header" : ""}`}
        role="banner"
      >
        {/* Mobile menu trigger */}
        <button
          className={`menu-toggle ${mobileMenuOpen ? "is-active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
        </button>

        {/* Brand Wordmark & Monogram */}
        <Link to="/" className="wordmark" onClick={closeMobileMenu} aria-label="Elite Weavers Home">
          <span className="wordmark-monogram">EW</span>
          <div className="wordmark-text">
            <span className="wordmark-top">Elite</span>
            <strong className="wordmark-bottom">Weavers</strong>
          </div>
        </Link>

        {/* Primary Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink
            to="/collections?filter=New"
            className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
          >
            New In
          </NavLink>
          <NavLink
            to="/collections"
            className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
          >
            Sarees
          </NavLink>
          <NavLink
            to="/collections"
            className="nav-link"
          >
            Collections
          </NavLink>
          <a
            href="#occasions"
            className="nav-link"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                document.getElementById("occasions")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Occasions
          </a>
          <NavLink
            to="/heritage"
            className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
          >
            Craft
          </NavLink>
          <NavLink
            to="/journal"
            className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
          >
            Journal
          </NavLink>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <button
            className="action-btn search-trigger"
            onClick={() => {
              setIsSearchOpen(true);
              trackEvent("open_search");
            }}
            aria-label="Search collection"
          >
            <svg className="action-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="action-text">Search</span>
          </button>

          <Link
            to="/wishlist"
            className="action-btn wishlist-trigger"
            onClick={closeMobileMenu}
            aria-label={`Wishlist, ${wishlist.length} saved pieces`}
          >
            <svg className="action-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="action-text">Wishlist</span>
            {wishlist.length > 0 && <sup className="badge">{wishlist.length}</sup>}
          </Link>

          <button
            className="action-btn bag-trigger"
            onClick={() => {
              setIsCartOpen(true);
              trackEvent("open_cart");
            }}
            aria-label={`Shopping bag, ${bagItemCount} items`}
          >
            <svg className="action-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="action-text">Bag</span>
            {bagItemCount > 0 && <sup className="badge">{bagItemCount}</sup>}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={closeMobileMenu}>
          <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-head">
              <span className="mobile-nav-title">Navigation</span>
              <button className="mobile-nav-close" onClick={closeMobileMenu} aria-label="Close menu">
                ✕
              </button>
            </div>
            <nav className="mobile-nav-links">
              <Link to="/collections?filter=New" onClick={closeMobileMenu}>
                New In <span>↗</span>
              </Link>
              <Link to="/collections" onClick={closeMobileMenu}>
                All Sarees <span>↗</span>
              </Link>
              <a
                href="#occasions"
                onClick={() => {
                  closeMobileMenu();
                  document.getElementById("occasions")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Shop by Occasion <span>↗</span>
              </a>
              <Link to="/heritage" onClick={closeMobileMenu}>
                The Craft & Weavers <span>↗</span>
              </Link>
              <Link to="/journal" onClick={closeMobileMenu}>
                Editorial Journal <span>↗</span>
              </Link>
              <Link to="/wishlist" onClick={closeMobileMenu}>
                Wishlist ({wishlist.length}) <span>↗</span>
              </Link>
              <button
                className="mobile-cart-btn"
                onClick={() => {
                  closeMobileMenu();
                  setIsCartOpen(true);
                }}
              >
                Shopping Bag ({bagItemCount}) <span>↗</span>
              </button>
            </nav>
            <div className="mobile-nav-footer">
              <p>Pure Handloom Silks · Woven slowly in Varanasi & Kanchipuram</p>
              <small>Complimentary insured delivery across India</small>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
