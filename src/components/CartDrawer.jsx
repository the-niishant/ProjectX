import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { trackEvent } from "../utils/analytics";

export function CartDrawer() {
  const {
    bag,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromBag,
    bagSubtotal,
    bagTotal,
    discountAmount,
    discountPercent,
    promoCode,
    applyPromo,
    removePromo,
    shippingThreshold,
    isShippingFree,
    shippingRemaining,
    money
  } = useStore();

  const [inputCode, setInputCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    applyPromo(inputCode);
    setInputCode("");
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    trackEvent("begin_checkout", { source: "cart_drawer", itemCount: bag.length, total: bagTotal });
    navigate("/checkout");
  };

  const shippingPercent = Math.min(100, Math.round((bagTotal / shippingThreshold) * 100));

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)} role="dialog" aria-modal="true">
      <aside className="commerce-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-lockup">
            <h2 className="drawer-heading">Your bag</h2>
            <span className="drawer-count">({bag.length} {bag.length === 1 ? "piece" : "pieces"})</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close bag drawer"
          >
            ×
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="shipping-progress-banner">
          <div className="shipping-progress-text">
            {isShippingFree && bag.length > 0 ? (
              <span className="shipping-unlocked">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Complimentary express shipping unlocked across India
              </span>
            ) : (
              <span>Add <strong>{money(shippingRemaining)}</strong> more for complimentary delivery</span>
            )}
          </div>
          <div className="shipping-bar-track">
            <div className="shipping-bar-fill" style={{ width: `${shippingPercent}%` }}></div>
          </div>
        </div>

        {bag.length === 0 ? (
          <div className="drawer-empty-state">
            <span className="empty-icon">▢</span>
            <h3>Your bag is quiet.</h3>
            <p>There are no pieces here yet. Explore our slow-woven edit to find an heirloom.</p>
            <Link
              to="/collections"
              className="primary-button"
              onClick={() => setIsCartOpen(false)}
            >
              Explore the edit <span>↗</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="drawer-items-list">
              {bag.map((item) => {
                const product = item.product;
                const primaryImage = product.images?.[0] || product.image;

                return (
                  <div className="drawer-line-item" key={product.id}>
                    <Link
                      to={`/products/${product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="item-thumb-link"
                    >
                      <img src={primaryImage} alt={product.name} />
                    </Link>

                    <div className="item-info">
                      <div className="item-headline">
                        <Link
                          to={`/products/${product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="item-name"
                        >
                          {product.name}
                        </Link>
                        <span className="item-price">{money(product.price * item.quantity)}</span>
                      </div>
                      <span className="item-craft-tag">{product.category} · {product.colour}</span>

                      <div className="item-actions-row">
                        <div className="item-stepper">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, item.quantity - 1)}
                            aria-label={`Decrease quantity of ${product.name}`}
                          >
                            −
                          </button>
                          <span className="stepper-val">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${product.name}`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="item-remove-btn"
                          onClick={() => removeFromBag(product.id)}
                          aria-label={`Remove ${product.name} from bag`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="drawer-footer-panel">
              {/* Promo Code Input */}
              <div className="drawer-promo-box">
                {promoCode ? (
                  <div className="applied-promo-tag">
                    <span>Code <strong>{promoCode}</strong> applied ({discountPercent}% off)</span>
                    <button type="button" onClick={removePromo} aria-label="Remove promo code">×</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="promo-input-form">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WELCOME10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      aria-label="Promo code"
                    />
                    <button type="submit">Apply</button>
                  </form>
                )}
              </div>

              {/* Order Calculations */}
              <div className="drawer-financials">
                <div className="financial-row">
                  <span>Subtotal</span>
                  <span>{money(bagSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="financial-row discount-row">
                    <span>Savings ({promoCode})</span>
                    <span>−{money(discountAmount)}</span>
                  </div>
                )}
                <div className="financial-row">
                  <span>Shipping</span>
                  <span>{isShippingFree ? "Complimentary" : "₹450"}</span>
                </div>
                <div className="financial-row total-row">
                  <strong>Estimated Total</strong>
                  <strong>{money(bagTotal)}</strong>
                </div>
              </div>

              <p className="drawer-reassurance">
                Taxes, duties, and packaging verified at checkout.
              </p>

              <div className="drawer-btn-stack">
                <button
                  className="primary-button checkout-now-btn"
                  onClick={handleCheckoutClick}
                >
                  Continue to checkout · {money(bagTotal)} <span>↗</span>
                </button>
                <Link
                  to="/cart"
                  className="quiet-link view-bag-page-link"
                  onClick={() => setIsCartOpen(false)}
                >
                  View complete shopping bag
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
