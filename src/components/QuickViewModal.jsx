import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToBag, money } = useStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
  }, [quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setQuickViewProduct(null);
      }
    };
    if (quickViewProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const images = product.images || [product.image];

  const handleAddAndClose = () => {
    addToBag(product, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)} role="dialog" aria-modal="true">
      <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close product quick view"
        >
          ×
        </button>

        <div className="quick-view-gallery">
          <div className="quick-view-main-image-wrap">
            <img
              src={images[selectedImageIndex] || images[0]}
              alt={`${product.name} detail view`}
              className="quick-view-main-img"
            />
          </div>
          {images.length > 1 && (
            <div className="quick-view-thumb-strip">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`quick-thumb-btn ${idx === selectedImageIndex ? "is-selected" : ""}`}
                  onClick={() => setSelectedImageIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="quick-view-content">
          <div className="quick-view-header">
            <span className="quick-view-origin">{product.category} · {product.origin}</span>
            <h2 className="quick-view-title">{product.name}</h2>
            <div className="quick-view-pricing">
              <span className="price-current">{money(product.price)}</span>
              {product.compareAt && (
                <span className="price-compare">{money(product.compareAt)}</span>
              )}
            </div>
          </div>

          <p className="quick-view-desc">{product.description}</p>

          <div className="quick-view-details-grid">
            <div className="detail-item">
              <span className="detail-label">Fabric</span>
              <span className="detail-val">{product.fabric}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Weave</span>
              <span className="detail-val">{product.weave}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Blouse</span>
              <span className="detail-val">Included</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Length</span>
              <span className="detail-val">{product.length}</span>
            </div>
          </div>

          <div className="quick-view-actions">
            <div className="quantity-stepper">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              className="primary-button quick-add-btn"
              onClick={handleAddAndClose}
            >
              Add to bag · {money(product.price * quantity)}
            </button>
          </div>

          <Link
            to={`/products/${product.slug}`}
            className="full-detail-link"
            onClick={() => setQuickViewProduct(null)}
          >
            View complete product specifications & craft story <span>↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
