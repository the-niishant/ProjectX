import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { trackEvent } from "../utils/analytics";

export function CheckoutPage() {
  const {
    bag,
    clearBag,
    bagSubtotal,
    bagTotal,
    discountAmount,
    discountPercent,
    promoCode,
    applyPromo,
    removePromo,
    isShippingFree,
    money,
    showToast
  } = useStore();

  const [currentStep, setCurrentStep] = useState(1); // 1: Contact/Shipping, 2: Delivery, 3: Payment
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Maharashtra",
    postalCode: "",
    country: "India",
    deliveryOption: "standard",
    paymentMethod: "upi",
    upiId: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: ""
  });

  const [promoInput, setPromoInput] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const shippingFee = isShippingFree ? 0 : 450;
  const orderTotal = bagTotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateStep1 = () => {
    const errors = {};
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errors.email = "Enter a valid email address.";
    }
    if (!formData.firstName.trim()) errors.firstName = "This field is required.";
    if (!formData.lastName.trim()) errors.lastName = "This field is required.";
    if (!formData.address.trim()) errors.address = "This field is required.";
    if (!formData.city.trim()) errors.city = "This field is required.";
    if (!formData.postalCode.trim() || formData.postalCode.length < 5) {
      errors.postalCode = "Enter a valid postal PIN code.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const generatedOrderNum = `EW-${Math.floor(100000 + Math.random() * 900000)}`;
    const completedOrderTotal = orderTotal;
    setOrderNumber(generatedOrderNum);
    setIsOrderPlaced(true);
    clearBag();
    trackEvent("submit_order", { orderNumber: generatedOrderNum, total: completedOrderTotal });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isOrderPlaced) {
    return (
      <div className="order-confirmation-page">
        <div className="confirmation-card">
          <span className="confirmation-eyebrow">Order received</span>
          <span className="confirmation-seal">EW</span>
          <h1 className="confirmation-title">A beautiful piece is on its way.</h1>
          <p className="confirmation-lead">
            Thank you, <strong>{formData.firstName || "esteemed collector"}</strong>. We have sent confirmation and tracking details to <strong>{formData.email}</strong>.
          </p>

          <div className="order-details-box">
            <div className="order-info-line">
              <span>Order number</span>
              <strong>{orderNumber}</strong>
            </div>
            <div className="order-info-line">
              <span>Shipping to</span>
              <span>{formData.address}, {formData.city}, {formData.postalCode}</span>
            </div>
            <div className="order-info-line">
              <span>Estimated delivery</span>
              <strong>2–4 business days via insured express</strong>
            </div>
            <div className="order-info-line">
              <span>Total payment</span>
              <strong>{money(orderTotal)} (Demo completed)</strong>
            </div>
          </div>

          <p className="craft-packing-note">
            Your saree is now being carefully inspected, wrapped in unbleached cotton muslin, and prepared in our signature archival box.
          </p>

          <Link to="/collections" className="primary-button return-to-edit-btn">
            Return to the edit <span>↗</span>
          </Link>
        </div>
      </div>
    );
  }

  if (bag.length === 0 && !isOrderPlaced) {
    return (
      <div className="checkout-empty-view">
        <h2>Your bag is currently empty</h2>
        <p>Please select an heirloom saree before proceeding to checkout.</p>
        <Link to="/collections" className="primary-button">
          Browse collections <span>↗</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-page-header">
        <Link to="/cart" className="checkout-back-link">
          ← Return to bag
        </Link>
        <span className="checkout-secure-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          256-Bit Encrypted Heritage Checkout
        </span>
      </div>

      {/* Checkout Progress Stepper */}
      <div className="checkout-stepper-bar">
        <div className={`step-node ${currentStep >= 1 ? "is-active" : ""}`}>
          <span className="step-num">1</span>
          <span className="step-name">Shipping</span>
        </div>
        <div className="step-connector"></div>
        <div className={`step-node ${currentStep >= 2 ? "is-active" : ""}`}>
          <span className="step-num">2</span>
          <span className="step-name">Delivery</span>
        </div>
        <div className="step-connector"></div>
        <div className={`step-node ${currentStep >= 3 ? "is-active" : ""}`}>
          <span className="step-num">3</span>
          <span className="step-name">Payment</span>
        </div>
      </div>

      <div className="checkout-main-grid">
        {/* Left Form Area */}
        <div className="checkout-forms-col">
          {/* STEP 1: Contact & Address */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep} className="checkout-step-form" noValidate>
              <div className="form-section-block">
                <h2 className="step-heading">Where should we send your order?</h2>
                <div className="form-field">
                  <label htmlFor="email">Email address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className={formErrors.email ? "has-error" : ""}
                  />
                  {formErrors.email && <span className="field-error-msg">{formErrors.email}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Phone number (for delivery courier)</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="form-section-block">
                <h2 className="step-heading">Shipping address</h2>
                <div className="form-row-two">
                  <div className="form-field">
                    <label htmlFor="firstName">First name *</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className={formErrors.firstName ? "has-error" : ""}
                    />
                    {formErrors.firstName && <span className="field-error-msg">{formErrors.firstName}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="lastName">Last name *</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className={formErrors.lastName ? "has-error" : ""}
                    />
                    {formErrors.lastName && <span className="field-error-msg">{formErrors.lastName}</span>}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="address">Address *</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address, house or apartment number"
                    className={formErrors.address ? "has-error" : ""}
                  />
                  {formErrors.address && <span className="field-error-msg">{formErrors.address}</span>}
                </div>

                <div className="form-row-two">
                  <div className="form-field">
                    <label htmlFor="city">City *</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className={formErrors.city ? "has-error" : ""}
                    />
                    {formErrors.city && <span className="field-error-msg">{formErrors.city}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="postalCode">PIN code *</label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="e.g. 400001"
                      className={formErrors.postalCode ? "has-error" : ""}
                    />
                    {formErrors.postalCode && <span className="field-error-msg">{formErrors.postalCode}</span>}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="India">India</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Singapore">Singapore</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="primary-button step-next-btn">
                Continue to delivery choice <span>↗</span>
              </button>
            </form>
          )}

          {/* STEP 2: Delivery Method */}
          {currentStep === 2 && (
            <form onSubmit={handleNextStep} className="checkout-step-form">
              <h2 className="step-heading">Choose delivery method</h2>
              <div className="delivery-options-stack">
                <label className={`delivery-radio-card ${formData.deliveryOption === "standard" ? "is-selected" : ""}`}>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="standard"
                    checked={formData.deliveryOption === "standard"}
                    onChange={handleInputChange}
                  />
                  <div className="delivery-radio-info">
                    <strong>Standard Insured Delivery (3–5 business days)</strong>
                    <p>Signature delivery in archival presentation box.</p>
                  </div>
                  <span className="delivery-price">Complimentary</span>
                </label>

                <label className={`delivery-radio-card ${formData.deliveryOption === "express" ? "is-selected" : ""}`}>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="express"
                    checked={formData.deliveryOption === "express"}
                    onChange={handleInputChange}
                  />
                  <div className="delivery-radio-info">
                    <strong>Express Priority Air (1–2 business days)</strong>
                    <p>Direct expedited transit from our Varanasi & Kanchipuram ateliers.</p>
                  </div>
                  <span className="delivery-price">{isShippingFree ? "Complimentary" : "₹450"}</span>
                </label>
              </div>

              <div className="form-step-nav-row">
                <button
                  type="button"
                  className="quiet-link"
                  onClick={() => setCurrentStep(1)}
                >
                  ← Back to address
                </button>
                <button type="submit" className="primary-button">
                  Continue to payment <span>↗</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Payment */}
          {currentStep === 3 && (
            <form onSubmit={handleFinalSubmit} className="checkout-step-form">
              <h2 className="step-heading">Payment method</h2>
              <p className="demo-disclaimer-alert">
                ✦ <strong>Prototype Environment:</strong> This demo interface simulates order completion without processing live financial transactions.
              </p>

              <div className="payment-method-selector">
                <label className={`payment-tab-label ${formData.paymentMethod === "upi" ? "is-active" : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === "upi"}
                    onChange={handleInputChange}
                  />
                  <span>UPI (Google Pay, PhonePe, Paytm)</span>
                </label>

                <label className={`payment-tab-label ${formData.paymentMethod === "card" ? "is-active" : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                  />
                  <span>Credit / Debit Card</span>
                </label>

                <label className={`payment-tab-label ${formData.paymentMethod === "netbanking" ? "is-active" : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={formData.paymentMethod === "netbanking"}
                    onChange={handleInputChange}
                  />
                  <span>Net Banking</span>
                </label>
              </div>

              {formData.paymentMethod === "upi" && (
                <div className="payment-details-box">
                  <label htmlFor="upiId">Enter UPI VPA / ID</label>
                  <input
                    id="upiId"
                    name="upiId"
                    type="text"
                    placeholder="mobileNumber@upi"
                    value={formData.upiId}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {formData.paymentMethod === "card" && (
                <div className="payment-details-box">
                  <div className="form-field">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-row-two">
                    <div className="form-field">
                      <label htmlFor="cardExpiry">Expiry (MM/YY)</label>
                      <input
                        id="cardExpiry"
                        name="cardExpiry"
                        type="text"
                        placeholder="12/28"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cardCvv">CVV</label>
                      <input
                        id="cardCvv"
                        name="cardCvv"
                        type="password"
                        maxLength="4"
                        placeholder="•••"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === "netbanking" && (
                <div className="payment-details-box">
                  <label htmlFor="bankSelect">Select Bank</label>
                  <select id="bankSelect">
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              <div className="form-step-nav-row">
                <button
                  type="button"
                  className="quiet-link"
                  onClick={() => setCurrentStep(2)}
                >
                  ← Back to delivery
                </button>
                <button type="submit" className="primary-button place-order-btn">
                  Place demo order · {money(orderTotal)} <span>↗</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Order Summary Column */}
        <aside className="checkout-summary-col">
          <div className="checkout-summary-card">
            <h3 className="summary-card-heading">Your order ({bag.length})</h3>

            <div className="checkout-items-mini-list">
              {bag.map((item) => (
                <div className="checkout-item-mini-row" key={item.product.id}>
                  <img src={item.product.images[0]} alt={item.product.name} />
                  <div className="item-mini-text">
                    <strong>{item.product.name}</strong>
                    <span>Qty: {item.quantity} · {item.product.category}</span>
                  </div>
                  <span className="item-mini-price">
                    {money(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Box */}
            <div className="checkout-promo-box">
              {promoCode ? (
                <div className="applied-promo-pill">
                  <span>{promoCode} applied ({discountPercent}%)</span>
                  <button onClick={removePromo}>×</button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    applyPromo(promoInput);
                    setPromoInput("");
                  }}
                  className="promo-mini-form"
                >
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <button type="submit">Apply</button>
                </form>
              )}
            </div>

            <div className="checkout-totals-breakdown">
              <div className="total-line-row">
                <span>Subtotal</span>
                <span>{money(bagSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="total-line-row discount-text">
                  <span>Savings</span>
                  <span>−{money(discountAmount)}</span>
                </div>
              )}
              <div className="total-line-row">
                <span>Insured Courier</span>
                <span>{isShippingFree ? "Complimentary" : money(shippingFee)}</span>
              </div>
              <div className="total-line-row final-due-row">
                <strong>Total Due</strong>
                <strong>{money(orderTotal)}</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
