import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";

export function WishlistPage() {
  const { wishlist, toggleWish, addToBag, money, showToast } = useStore();
  const [email, setEmail] = useState("");
  const [savedEmailSent, setSavedEmailSent] = useState(false);

  const wishedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToBag = () => {
    wishedProducts.forEach((p) => addToBag(p, 1));
    showToast(`Added ${wishedProducts.length} pieces to your bag`);
  };

  const handleSaveByEmail = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Enter a valid email address.");
      return;
    }
    setSavedEmailSent(true);
    showToast(`We sent your saved pieces to ${email}.`);
  };

  return (
    <div className="wishlist-page">
      <section className="wishlist-hero-header">
        <p className="section-kicker">Saved Pieces</p>
        <h1 className="wishlist-page-title">
          Pieces you want<br />
          <em>to remember.</em>
        </h1>
        <p className="wishlist-page-intro">
          Save a piece while you decide. Compare weaves, revisit palettes, or share your curation with family.
        </p>
      </section>

      {wishedProducts.length > 0 ? (
        <div className="wishlist-content-container">
          <div className="wishlist-actions-bar">
            <span className="wishlist-count-badge">
              <strong>{wishedProducts.length}</strong> {wishedProducts.length === 1 ? "piece" : "pieces"} saved
            </span>
            <button className="primary-button" onClick={handleAddAllToBag}>
              Add all to bag ({wishedProducts.length}) <span>↗</span>
            </button>
          </div>

          <div className="wishlist-products-grid">
            {wishedProducts.map((product) => (
              <article className="wishlist-item-card" key={product.id}>
                <div className="wishlist-img-frame">
                  <Link to={`/products/${product.slug}`}>
                    <img src={product.images[0]} alt={product.name} />
                  </Link>
                  <button
                    className="remove-from-wishlist-btn"
                    onClick={() => toggleWish(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    ×
                  </button>
                </div>

                <div className="wishlist-card-details">
                  <span className="wishlist-craft-tag">{product.category} · {product.colour}</span>
                  <Link to={`/products/${product.slug}`}>
                    <h3 className="wishlist-product-name">{product.name}</h3>
                  </Link>
                  <span className="wishlist-product-price">{money(product.price)}</span>

                  <div className="wishlist-card-buttons">
                    <button
                      className="primary-button wishlist-add-bag-btn"
                      onClick={() => addToBag(product, 1)}
                    >
                      Add to bag
                    </button>
                    <Link
                      to={`/products/${product.slug}`}
                      className="quiet-link view-piece-link"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Email Save Prompt */}
          <div className="wishlist-email-save-card">
            <h3>Keep this curation safe</h3>
            <p>Email your saved heirlooms to yourself or someone helping you choose.</p>
            {savedEmailSent ? (
              <div className="email-save-success">
                <span className="check-mark">✓</span>
                <p>We sent your saved pieces to <strong>{email}</strong>.</p>
              </div>
            ) : (
              <form onSubmit={handleSaveByEmail} className="wishlist-save-form">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address to save wishlist"
                />
                <button type="submit" className="secondary-button">
                  Email my wishlist <span>↗</span>
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="wishlist-empty-state">
          <span className="empty-symbol">♡</span>
          <h2>Nothing saved yet</h2>
          <p>Keep the pieces that stay with you as you explore our heritage looms.</p>
          <Link to="/collections" className="primary-button">
            Explore the edit <span>↗</span>
          </Link>
        </div>
      )}
    </div>
  );
}
