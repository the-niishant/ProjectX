import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { trackEvent } from "../utils/analytics";

export function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useStore();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      showToast("Please enter a valid email address.");
      return;
    }
    showToast("Welcome to the inner circle. Your invitation is on its way.");
    trackEvent("newsletter_signup", { source: "footer" });
    setEmail("");
  };

  return (
    <footer className="luxury-site-footer" role="contentinfo">
      {/* Huge Faded Background Watermark Typography (PRD Section 22) */}
      <div className="footer-faded-watermark" aria-hidden="true">
        ELITE WEAVERS
      </div>

      <div className="footer-main-stage">
        {/* Floating Ivory Card Panel */}
        <div className="footer-floating-card">
          {/* Top Row: Newsletter / Inner Circle */}
          <div className="footer-newsletter-row">
            <div className="newsletter-text-block">
              <span className="newsletter-kicker">THE INNER CIRCLE</span>
              <h3 className="newsletter-headline">Join the inner circle.</h3>
              <p className="newsletter-desc">
                Receive private invitations to seasonal loom cuts, bespoke bridal viewings, and textile monographs. We write sparingly.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
              <label htmlFor="footer-email-input" className="sr-only">Email address</label>
              <div className="newsletter-input-box">
                <input
                  id="footer-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
                <button type="submit" className="newsletter-submit-btn" aria-label="Join inner circle">
                  <span>Subscribe</span>
                  <span className="btn-arrow">↗</span>
                </button>
              </div>
              <span className="newsletter-privacy-note">
                Respecting your privacy. Unsubscribe anytime with one tap.
              </span>
            </form>
          </div>

          <div className="footer-card-divider" />

          {/* Navigation Columns */}
          <div className="footer-nav-grid">
            {/* Column 1: Brand & Atelier */}
            <div className="footer-nav-col brand-col">
              <Link to="/" className="footer-wordmark-link">
                <span className="wordmark-top">Elite</span>
                <strong className="wordmark-bottom">Weavers</strong>
              </Link>
              <p className="footer-mission">
                Handcrafted sarees created for celebrations, rituals, and unforgettable moments. Woven slowly in India with pure mulberry silk and authentic zari.
              </p>
              <div className="footer-cert-tags">
                <span>✦ SILK MARK INDIA</span>
                <span>✦ HANDLOOM CERTIFIED</span>
              </div>
            </div>

            {/* Column 2: Sarees */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Sarees</h4>
              <ul className="footer-links-list">
                <li><Link to="/collections">All Sarees</Link></li>
                <li><Link to="/collections?search=Banarasi">Banarasi Brocades</Link></li>
                <li><Link to="/collections?search=Kanjivaram">Kanjivaram Silks</Link></li>
                <li><Link to="/collections?search=Chanderi">Chanderi Sheers</Link></li>
                <li><Link to="/collections?search=Organza">Crisp Organza</Link></li>
                <li><Link to="/collections?search=Tussar">Wild Tussar</Link></li>
              </ul>
            </div>

            {/* Column 3: Collections & Occasions */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Curation</h4>
              <ul className="footer-links-list">
                <li><Link to="/collections?filter=New">New Arrivals</Link></li>
                <li><a href="#occasions">Wedding & Bridal</a></li>
                <li><a href="#occasions">Festive Edit</a></li>
                <li><a href="#occasions">Evening Silk</a></li>
                <li><a href="#occasions">Everyday Luxury</a></li>
                <li><a href="#fabrics">Shop by Texture</a></li>
              </ul>
            </div>

            {/* Column 4: Heritage & Journal */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Craft</h4>
              <ul className="footer-links-list">
                <li><Link to="/heritage">Our Master Weavers</Link></li>
                <li><Link to="/heritage">Varanasi & Kanchipuram</Link></li>
                <li><Link to="/journal">Editorial Journal</Link></li>
                <li><Link to="/journal/how-to-fold-store-and-air-a-silk-saree">Saree Care Protocol</Link></li>
                <li><Link to="/journal/the-quiet-geometry-of-a-border">Reading The Border</Link></li>
              </ul>
            </div>

            {/* Column 5: Assistance & Concierge */}
            <div className="footer-nav-col concierge-col">
              <h4 className="footer-col-title">Concierge</h4>
              <ul className="footer-links-list">
                <li>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-concierge-link"
                  >
                    <span className="wa-icon">💬</span>
                    <span>WhatsApp Concierge</span>
                  </a>
                </li>
                <li><span className="footer-info-item">Complimentary Pan-India Delivery</span></li>
                <li><span className="footer-info-item">7-Day Heritage Exchange</span></li>
                <li><span className="footer-info-item">Custom Blouse Tailoring</span></li>
                <li><span className="footer-info-item">concierge@eliteweavers.in</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="footer-bottom-bar">
          <div className="bottom-bar-left">
            <span>© {new Date().getFullYear()} Elite Weavers India. All rights reserved.</span>
            <span className="bottom-sep">·</span>
            <span>Woven with patience & reverence.</span>
          </div>

          <div className="bottom-bar-right">
            <span>Varanasi · Kanchipuram · Mumbai · London</span>
            <span className="bottom-sep">·</span>
            <span>Secured with 256-bit encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
