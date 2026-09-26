import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export function ProductCard({ product }) {
  const { isWished, toggleWish, addToBag, setQuickViewProduct, money } = useStore();
  const wished = isWished(product.id);

  const primaryImage = product.images?.[0] || product.image;
  const hoverImage = product.images?.[1] || product.imageAlt || primaryImage;

  return (
    <article className="product-card">
      <div className="product-media-wrap">
        <Link to={`/products/${product.slug}`} className="product-image-link" aria-label={`View ${product.name}`}>
          <img
            src={primaryImage}
            alt={`${product.name} saree draped, showing ${product.colour} body`}
            className="product-img-primary"
            loading="lazy"
          />
          {hoverImage && hoverImage !== primaryImage && (
            <img
              src={hoverImage}
              alt={`${product.name} craft and border detail`}
              className="product-img-hover"
              loading="lazy"
            />
          )}
        </Link>

        {product.tag && <span className="product-tag-badge">{product.tag}</span>}

        <button
          className="quick-view-overlay-btn"
          onClick={() => setQuickViewProduct(product)}
          aria-label={`Quick view ${product.name}`}
        >
          View piece
        </button>

        <button
          className={`wishlist-heart-btn ${wished ? "is-active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWish(product.id);
          }}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div className="product-meta">
        <div className="product-meta-header">
          <p className="product-meta-craft">
            {product.category} · {product.colour}
          </p>
          <Link to={`/products/${product.slug}`} className="product-title-link">
            <h3 className="product-title">{product.name}</h3>
          </Link>
        </div>

        <div className="product-pricing-bar">
          <div className="price-lockup">
            <span className="product-price">{money(product.price)}</span>
            {product.compareAt && (
              <span className="product-compare-price">{money(product.compareAt)}</span>
            )}
          </div>
          <button
            className="card-add-to-bag-btn"
            onClick={() => addToBag(product, 1)}
            aria-label={`Add ${product.name} to bag`}
          >
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}
