import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { wishlist, bagItemCount, setIsCartOpen, setIsSearchOpen } = useStore();
  const location = useLocation();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <div className="announcement-strip">
        <span>Complimentary shipping across India on orders over ₹10,000</span>
      </div>

      <header className="site-header">
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

        {/* Brand Wordmark */}
        <Link to="/" className="wordmark" onClick={closeMobileMenu} aria-label="Elite Weavers Home">
          <span className="wordmark-top">Elite</span>
          <strong className="wordmark-bottom">Weavers</strong>
        </Link>

        {/* Primary Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink
            to="/collections"
            className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
          >
            Collections
          </NavLink>
          <NavLink
            to="/collections?filter=New"
            className="nav-link"
          >
            New arrivals
          </NavLink>
          <NavLink
            to="/heritage"
            className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
          >
            Our heritage
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
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search collection"
          >
            <span className="action-text">Search</span>
            <svg className="action-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <Link
            to="/wishlist"
            className="action-btn wishlist-trigger"
            onClick={closeMobileMenu}
            aria-label={`Wishlist, ${wishlist.length} saved pieces`}
          >
            <span className="action-text">Wishlist</span>
            <svg className="action-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {wishlist.length > 0 && <sup className="badge">{wishlist.length}</sup>}
          </Link>

          <button
            className="action-btn bag-trigger"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping bag, ${bagItemCount} items`}
          >
            <span className="action-text">Bag</span>
            <svg className="action-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {bagItemCount > 0 && <sup className="badge">{bagItemCount}</sup>}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-overlay" onClick={closeMobileMenu}>
            <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-nav-head">
                <span className="mobile-nav-title">Menu</span>
                <button className="mobile-nav-close" onClick={closeMobileMenu} aria-label="Close menu">
                  ×
                </button>
              </div>
              <nav className="mobile-nav-links">
                <Link to="/collections" onClick={closeMobileMenu}>
                  Collections <span>↗</span>
                </Link>
                <Link to="/collections?filter=New" onClick={closeMobileMenu}>
                  New arrivals <span>↗</span>
                </Link>
                <Link to="/heritage" onClick={closeMobileMenu}>
                  Our heritage <span>↗</span>
                </Link>
                <Link to="/journal" onClick={closeMobileMenu}>
                  Journal <span>↗</span>
                </Link>
                <Link to="/wishlist" onClick={closeMobileMenu}>
                  Wishlist ({wishlist.length}) <span>↗</span>
                </Link>
                <Link to="/cart" onClick={closeMobileMenu}>
                  Shopping Bag ({bagItemCount}) <span>↗</span>
                </Link>
              </nav>
              <div className="mobile-nav-footer">
                <p>Modern heirlooms, woven slowly in India.</p>
                <small>Complimentary delivery pan-India over ₹10,000</small>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
