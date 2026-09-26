import React, { useState } from "react";
import { Link } from "react-router-dom";
import { journalArticles } from "../data/journal";

export function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Craft", "Care", "Styling", "Drape", "Region", "Materials"];

  const filteredArticles = selectedCategory === "All"
    ? journalArticles
    : journalArticles.filter((a) => a.category === selectedCategory);

  const featured = journalArticles[0];

  return (
    <div className="journal-page">
      <section className="journal-hero-header">
        <p className="section-kicker">From Our Studio</p>
        <h1 className="journal-headline">
          The Living<br />
          <em>Textile Journal.</em>
        </h1>
        <p className="journal-intro">
          Observations on borders, drape, care, and contemporary ways to wear heritage heirlooms.
        </p>
      </section>

      {/* Featured Lead Article */}
      <section className="featured-article-hero">
        <Link to={`/journal/${featured.slug}`} className="featured-hero-media">
          <img src={featured.image} alt={featured.title} />
        </Link>
        <div className="featured-hero-content">
          <span className="featured-kicker">{featured.category} · {featured.readTime}</span>
          <h2 className="featured-title">
            <Link to={`/journal/${featured.slug}`}>{featured.title}</Link>
          </h2>
          <p className="featured-dek">{featured.dek}</p>
          <div className="featured-byline">
            <span>By {featured.author}</span>
            <span>{featured.date}</span>
          </div>
          <Link to={`/journal/${featured.slug}`} className="editorial-arrow-link">
            Read essay <span>↗</span>
          </Link>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="journal-categories-bar">
        <div className="categories-tabs-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill-btn ${selectedCategory === cat ? "is-active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <section className="journal-articles-grid">
        {filteredArticles.map((article) => (
          <article className="journal-card" key={article.id}>
            <Link to={`/journal/${article.slug}`} className="journal-card-media">
              <img src={article.image} alt={article.title} loading="lazy" />
            </Link>
            <div className="journal-card-body">
              <div className="card-category-row">
                <span className="card-cat">{article.category}</span>
                <span className="card-read-time">{article.readTime}</span>
              </div>
              <h3 className="card-title">
                <Link to={`/journal/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className="card-dek">{article.dek}</p>
              <div className="card-footer-meta">
                <span className="card-author">By {article.author}</span>
                <Link to={`/journal/${article.slug}`} className="read-more-link">
                  Read ↗
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
