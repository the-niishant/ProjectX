import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { collections } from "../data/collections";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

function getCollectionImage(collection) {
  return products.find((product) => product.id === collection.productIds[0])?.images?.[0]
    || collection.heroImage;
}

export function CollectionDetail() {
  const { slug } = useParams();
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    return <Navigate to="/collections" replace />;
  }

  const collectionProducts = products.filter((p) =>
    collection.productIds.includes(p.id)
  );

  const otherCollections = collections.filter((c) => c.slug !== slug);

  return (
    <div className="collection-detail-page">
      {/* Editorial Collection Hero */}
      <section
        className="collection-detail-hero"
        style={{ backgroundColor: collection.themeBg }}
      >
        <div className="collection-hero-grid">
          <div className="collection-hero-copy">
            <Link to="/collections" className="collection-back-link">
              ← The Loom Index
            </Link>
            <p className="section-kicker" style={{ color: "var(--saffron-light)" }}>
              {collection.kicker}
            </p>
            <h1 className="collection-hero-title">{collection.title}</h1>
            <p className="collection-hero-intro">{collection.intro}</p>
            <div className="collection-palette-marker">
              <span className="swatch" style={{ backgroundColor: collection.color }}></span>
              <span className="swatch-text">{collection.name} Mood Palette</span>
            </div>
          </div>

          <div className="collection-hero-media">
            <img src={getCollectionImage(collection)} alt={collection.name} />
            <span className="collection-image-caption">
              {collection.imageCaption}
            </span>
          </div>
        </div>
      </section>

      {/* Curated Products */}
      <section className="collection-products-section">
        <div className="section-header-flex">
          <div>
            <p className="section-kicker">Curated Pieces</p>
            <h2 className="section-title">
              {collection.name} <em>Edit</em>
            </h2>
          </div>
          <span className="curation-count-tag">
            {collectionProducts.length} pieces in this curation
          </span>
        </div>

        <div className="catalog-products-grid">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Provenance & Craft Story */}
      <section className="collection-story-section">
        <div className="collection-story-card">
          <p className="section-kicker">Provenance & Methodology</p>
          <h2>The story behind {collection.name}</h2>
          <p className="story-lead-p">{collection.story}</p>

          {collection.relatedStory && (
            <div className="related-journal-callout">
              <span className="callout-tag">From our journal</span>
              <h4>{collection.relatedStory.title}</h4>
              <Link
                to={`/journal/${collection.relatedStory.slug}`}
                className="editorial-arrow-link"
              >
                Read the essay <span>↗</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Explore Other Collections */}
      <section className="other-collections-section">
        <div className="section-header-flex">
          <div>
            <p className="section-kicker">Discover More</p>
            <h2 className="section-title">Other curations</h2>
          </div>
        </div>

        <div className="other-collections-grid">
          {otherCollections.map((col) => (
            <Link
              to={`/collections/${col.slug}`}
              className="other-collection-card"
              key={col.id}
            >
              <img src={getCollectionImage(col)} alt={col.name} loading="lazy" />
              <div className="other-col-overlay">
                <span className="other-kicker">{col.kicker}</span>
                <h3>{col.name}</h3>
                <small>{col.title}</small>
                <span className="view-curation-text">Explore ↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
