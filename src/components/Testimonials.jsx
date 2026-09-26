import React from "react";

const reviews = [
  {
    id: 1,
    name: "Meera Somani",
    location: "Mumbai",
    occasion: "Sister’s Wedding · Aranya Kanjivaram",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    quote: "The weight of the silk has that rare, grounded confidence. In natural daylight the contrast temple border has a living warmth that camera flashes simply cannot fake. It felt truly sacred to wear."
  },
  {
    id: 2,
    name: "Ananya Raghavan",
    location: "Bengaluru",
    occasion: "Own Reception · Nila Banarasi Kadwa",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    quote: "The hand of the fabric is extraordinary. There is zero stiffness, only an effortless, liquid drape that stayed immaculate through seven hours of rituals. I found the heirloom I will pass down to my daughter.",
    isOffset: true // Middle card offset lower as per AURELLE reference
  },
  {
    id: 3,
    name: "Claire D’Souza",
    location: "London",
    occasion: "Diwali Banquet · Mogra Chanderi",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80",
    quote: "Delivered to Mayfair in three days, wrapped in unbleached muslin with a handwritten note about the Varanasi atelier. The gold butti catches candlelight with absolute grace."
  }
];

export function Testimonials() {
  return (
    <section className="testimonials-section" aria-label="Client Testimonials and Stories">
      <div className="testimonials-container">
        {/* Section Heading */}
        <div className="section-header-centered">
          <span className="editorial-kicker">WORN & REMEMBERED</span>
          <h2 className="editorial-display-title">Pieces that become part of the story.</h2>
          <p className="section-sub-copy">
            Read reflections from women who chose Elite Weavers to accompany their most treasured personal milestones.
          </p>
        </div>

        {/* 3-Card Grid with Offset Middle Card */}
        <div className="testimonials-grid">
          {reviews.map((rev) => (
            <blockquote
              key={rev.id}
              className={`testimonial-card ${rev.isOffset ? "card-offset-down" : ""}`}
            >
              <div className="card-quote-mark" aria-hidden="true">“</div>

              <div className="card-rating-stars" aria-label="5 out of 5 stars">
                {"★★★★★"}
              </div>

              <p className="testimonial-text">{rev.quote}</p>

              <footer className="testimonial-author-footer">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="author-avatar"
                  loading="lazy"
                />
                <div className="author-meta">
                  <cite className="author-name">{rev.name}</cite>
                  <span className="author-location">{rev.location}</span>
                  <small className="author-occasion">{rev.occasion}</small>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
