import React from "react";
import { Link } from "react-router-dom";
import { heritageStories, trustStatement } from "../data/heritage";

export function HeritagePage() {
  return (
    <div className="heritage-page">
      {/* Editorial Hero */}
      <section className="heritage-hero-header">
        <p className="section-kicker">Our Heritage & Weavers</p>
        <h1 className="heritage-headline">
          Meet the hands<br />
          <em>behind the cloth.</em>
        </h1>
        <p className="heritage-lead">
          A textile carries more than colour. It carries a place, a method, and the decisions made between one thread and the next.
        </p>
      </section>

      {/* Trust & Transparency Manifesto */}
      <section className="manifesto-card-section">
        <div className="manifesto-inner-box">
          <span className="manifesto-icon">✦</span>
          <h2>{trustStatement.headline}</h2>
          <p>{trustStatement.body}</p>
        </div>
      </section>

      {/* Story Modules */}
      <section className="heritage-stories-container">
        {heritageStories.map((story, idx) => (
          <article
            className={`heritage-story-row ${idx % 2 === 1 ? "is-reversed" : ""}`}
            key={story.id}
          >
            <div className="story-image-wrap">
              <img src={story.image} alt={story.title} loading="lazy" />
              <div className="story-region-badge">{story.region}</div>
            </div>

            <div className="story-text-wrap">
              <span className="story-eyebrow">{story.region}</span>
              <h2 className="story-title">{story.title}</h2>
              <h3 className="story-subtitle">{story.subtitle}</h3>
              <p className="story-body-text">{story.text}</p>
              <Link
                to={`/collections?search=${encodeURIComponent(story.region.split(",")[0])}`}
                className="editorial-arrow-link"
              >
                Explore {story.region.split(",")[0]} weaves <span>↗</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Handloom Credentials Banner */}
      <section className="credentials-section">
        <div className="credential-column">
          <h4>01 / Authentic Provenance</h4>
          <p>We trace every single warp and weft to its registered master weaver cluster.</p>
        </div>
        <div className="credential-column">
          <h4>02 / Handloom Authentic</h4>
          <p>We ensure every piece is woven on traditional handlooms by master craftspeople.</p>
        </div>
        <div className="credential-column">
          <h4>03 / Direct Artisan Parity</h4>
          <p>We pay fair living wages established by artisan guilds, eliminating secondary middlemen.</p>
        </div>
      </section>

      {/* CTA back to collection */}
      <section className="heritage-bottom-cta">
        <h2>Experience the handloom difference</h2>
        <p>Explore sarees selected for their hand, their history, and the woman they become.</p>
        <Link to="/collections" className="primary-button">
          Discover the edit <span>↗</span>
        </Link>
      </section>
    </div>
  );
}
