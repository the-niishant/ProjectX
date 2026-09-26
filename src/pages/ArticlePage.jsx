import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { journalArticles } from "../data/journal";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export function ArticlePage() {
  const { slug } = useParams();
  const article = journalArticles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/journal" replace />;
  }

  // Related products to discover from this article
  const suggestedProducts = products.slice(0, 3);
  const otherArticles = journalArticles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="article-page">
      <article className="editorial-article-container">
        {/* Article Header */}
        <header className="article-header">
          <Link to="/journal" className="article-back-nav">
            ← Back to all essays
          </Link>
          <span className="article-category-badge">
            {article.category} · {article.readTime}
          </span>
          <h1 className="article-main-title">{article.title}</h1>
          <p className="article-lead-dek">{article.dek}</p>
          <div className="article-byline-bar">
            <span>Written by <strong>{article.author}</strong></span>
            <span>·</span>
            <span>Published {article.date}</span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="article-hero-media">
          <img src={article.image} alt={article.title} />
          <span className="media-caption">
            Photographed inside our partner weaving ateliers across India
          </span>
        </div>

        {/* Article Body Content */}
        <div className="article-prose-body">
          {article.content.map((paragraph, idx) => (
            <React.Fragment key={idx}>
              <p>{paragraph}</p>
              {idx === 1 && (
                <blockquote className="article-pull-quote">
                  “To understand a saree is to read its borders first: where they widen, where they quiet down, and how they frame the body as it moves through space.”
                </blockquote>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Author bio block */}
        <div className="article-author-bio">
          <div className="bio-avatar">EW</div>
          <div className="bio-text">
            <strong>{article.author}</strong>
            <p>Member of the Elite Weavers Curatorial Council, dedicated to indigenous Indian textile conservation, ethical sourcing, and master weaver advocacy.</p>
          </div>
        </div>
      </article>

      {/* Recommended Saree Pairings */}
      <section className="article-recommended-products">
        <div className="section-header-flex">
          <div>
            <p className="section-kicker">Woven References</p>
            <h2 className="section-title">Heirlooms mentioned in this piece</h2>
          </div>
          <Link to="/collections" className="editorial-arrow-link">
            Explore catalog <span>↗</span>
          </Link>
        </div>

        <div className="catalog-products-grid">
          {suggestedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Next Reads */}
      <section className="article-next-reads">
        <div className="section-header-flex">
          <div>
            <p className="section-kicker">Continue Reading</p>
            <h2 className="section-title">Further observations</h2>
          </div>
        </div>

        <div className="next-reads-grid">
          {otherArticles.map((nextArt) => (
            <div className="next-read-card" key={nextArt.id}>
              <Link to={`/journal/${nextArt.slug}`}>
                <img src={nextArt.image} alt={nextArt.title} />
              </Link>
              <div className="next-read-info">
                <span>{nextArt.category} · {nextArt.readTime}</span>
                <h3>
                  <Link to={`/journal/${nextArt.slug}`}>{nextArt.title}</Link>
                </h3>
                <p>{nextArt.dek}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
