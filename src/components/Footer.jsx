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
      showToast("Enter a valid email address.");
      return;
    }
    showToast("Thank you. You are on the list.");
    trackEvent("newsletter_signup", { source: "footer" });
    setEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-column">
          <Link to="/" className="wordmark footer-wordmark">
            <span className="wordmark-top">Elite</span>
            <strong className="wordmark-bottom">Weavers</strong>
          </Link>
          <p className="footer-tagline">
            Modern heirlooms, woven slowly in India.
          </p>
          <div className="footer-stamp-box">
            <span>EST. 2017</span>
            <i>✦</i>
            <span>BHARAT HANDLOOM</span>
          </div>
        </div>

        <div className="footer-nav-columns">
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/collections">All Collections</Link></li>
              <li><Link to="/collections?filter=Banarasi">Banarasi Brocades</Link></li>
              <li><Link to="/collections?filter=Kanjivaram">Kanjivaram Silks</Link></li>
              <li><Link to="/collections?filter=Chanderi">Chanderi Sheers</Link></li>
              <li><Link to="/collections?filter=New">New Arrivals</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Craft & Care</h4>
            <ul>
              <li><Link to="/heritage">Our Weavers & Ateliers</Link></li>
              <li><Link to="/journal/how-to-fold-store-and-air-a-silk-saree">Saree Care Guide</Link></li>
              <li><Link to="/journal/the-quiet-geometry-of-a-border">Reading The Border</Link></li>
              <li><Link to="/journal">Editorial Journal</Link></li>
              <li><Link to="/heritage">Transparency Manifesto</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Assistance</h4>
            <ul>
              <li><span className="footer-static-link">Complimentary Shipping (₹10k+)</span></li>
              <li><span className="footer-static-link">7-Day Heritage Exchange</span></li>
              <li><span className="footer-static-link">Silk Mark Certified</span></li>
              <li><span className="footer-static-link">concierge@eliteweavers.in</span></li>
            </ul>
          </div>

          <div className="footer-col footer-col-newsletter">
            <h4>The Dispatch</h4>
            <p className="newsletter-teaser">
              Stories from the loom, sent with care. We write sparingly.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
              <label htmlFor="footer-email" className="sr-only">Your email address</label>
              <div className="footer-input-group">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
                <button type="submit" aria-label="Join newsletter">
                  <span>↗</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024 Elite Weavers. Woven with intention.</span>
        <span>India · London · New York</span>
        <span>Made with respect for the craft</span>
      </div>
    </footer>
  );
}
