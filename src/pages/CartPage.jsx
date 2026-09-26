import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export function CartPage() {
  const {
    bag,
    updateQuantity,
    removeFromBag,
    clearBag,
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

  const handleApply = (e) => {
    e.preventDefault();
    applyPromo(inputCode);
    setInputCode("");
  };

  const shippingPercent = Math.min(100, Math.round((bagTotal / shippingThreshold) * 100));

  return (
    <div className="cart-page">
      <section className="cart-hero-header">
        <p className="section-kicker">Review & Drape</p>
        <h1 className="cart-page-title">Your bag</h1>
      </section>

      {bag.length > 0 ? (
        <div className="cart-page-grid">
          {/* Items List */}
          <div className="cart-items-column">
            {/* Free shipping progress track */}
            <div className="cart-shipping-banner">
              <div className="shipping-text">
                {isShippingFree ? (
                  <span className="unlocked-text">
                    ✓ Complimentary insured express shipping unlocked
                  </span>
                ) : (
                  <span>
                    Add <strong>{money(shippingRemaining)}</strong> more for complimentary delivery across India
                  </span>
                )}
              </div>
              <div className="shipping-bar-track">
                <div className="shipping-bar-fill" style={{ width: `${shippingPercent}%` }}></div>
              </div>
            </div>

            <div className="cart-table-head">
              <span>Piece</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            <div className="cart-items-table">
              {bag.map((item) => {
                const product = item.product;
                const primaryImage = product.images?.[0] || product.image;

                return (
                  <div className="cart-row-item" key={product.id}>
                    <div className="item-cell-product">
                      <Link to={`/products/${product.slug}`} className="cart-item-img-link">
                        <img src={primaryImage} alt={product.name} />
                      </Link>
                      <div className="cart-item-info">
                        <span className="cart-item-craft">{product.category} · {product.colour}</span>
                        <Link to={`/products/${product.slug}`}>
                          <h3 className="cart-item-title">{product.name}</h3>
                        </Link>
                        <span className="cart-item-unit-price">{money(product.price)} each</span>
                        <button
                          type="button"
                          className="cart-remove-link"
                          onClick={() => removeFromBag(product.id)}
                        >
                          Remove piece
                        </button>
                      </div>
                    </div>

                    <div className="item-cell-quantity">
                      <div className="quantity-stepper">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="item-cell-total">
                      <strong className="item-total-price">
                        {money(product.price * item.quantity)}
                      </strong>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-footer-controls">
              <Link to="/collections" className="quiet-link">
                ← Continue browsing collections
              </Link>
              <button className="clear-cart-text-btn" onClick={clearBag}>
                Clear entire bag
              </button>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="cart-summary-column">
            <div className="cart-summary-card">
              <h2 className="summary-title">Order summary</h2>

              {/* Promo Form */}
              <div className="summary-promo-section">
                {promoCode ? (
                  <div className="summary-active-promo">
                    <span>Code <strong>{promoCode}</strong> applied ({discountPercent}% savings)</span>
                    <button type="button" onClick={removePromo}>×</button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="summary-promo-form">
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                    />
                    <button type="submit">Apply</button>
                  </form>
                )}
              </div>

              <div className="summary-totals-list">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>{money(bagSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="summary-line discount-line">
                    <span>Savings ({promoCode})</span>
                    <span>−{money(discountAmount)}</span>
                  </div>
                )}
                <div className="summary-line">
                  <span>Insured Shipping</span>
                  <span>{isShippingFree ? "Complimentary" : "₹450"}</span>
                </div>
                <div className="summary-line total-line">
                  <strong>Estimated Total</strong>
                  <strong>{money(bagTotal)}</strong>
                </div>
              </div>

              <p className="summary-reassurance">
                Taxes and delivery options are confirmed at checkout.
              </p>

              <button
                className="primary-button checkout-btn-full"
                onClick={() => navigate("/checkout")}
              >
                Continue to checkout <span>↗</span>
              </button>

              <div className="summary-perks">
                <span>✦ Signature unbleached cotton presentation box</span>
                <span>✦ Silk Mark handloom authenticity certificate</span>
                <span>✦ 7-Day heritage exchange promise</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-empty-state">
          <span className="empty-symbol">▢</span>
          <h2>Your bag is quiet.</h2>
          <p>There are no pieces here yet. Discover our master weavers' slow creations.</p>
          <Link to="/collections" className="primary-button">
            Explore the edit <span>↗</span>
          </Link>
        </div>
      )}
    </div>
  );
}
