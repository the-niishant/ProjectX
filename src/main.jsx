import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const images = {
  hero: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1900&q=90",
  heroDetail: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85",
  loom: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=85",
  craft: "https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=1100&q=85",
  portrait: "https://images.unsplash.com/photo-1583391733981-849c1f0e6f18?auto=format&fit=crop&w=1000&q=85",
};

const collections = [
  { name: "Banarasi", note: "Gold that catches the light", color: "#162c45", image: "https://images.unsplash.com/photo-1610189012906-4353b7e7c6b4?auto=format&fit=crop&w=900&q=80" },
  { name: "Kanjivaram", note: "Silk with a southern soul", color: "#682533", image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80" },
  { name: "Chanderi", note: "A veil of quiet light", color: "#546c71", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80" },
  { name: "Paithani", note: "Peacocks in jewel tones", color: "#254d42", image: "https://images.unsplash.com/photo-1585488435873-7f9d8ccf8a64?auto=format&fit=crop&w=900&q=80" },
];

const products = [
  { id: 1, name: "Nila Banarasi Silk", type: "Banarasi", price: 18900, color: "Indigo", image: "https://images.unsplash.com/photo-1610030469668-8e9f641aaf2f?auto=format&fit=crop&w=900&q=80", tag: "New" },
  { id: 2, name: "Aranya Kanjivaram", type: "Kanjivaram", price: 24500, color: "Forest", image: "https://images.unsplash.com/photo-1583391733972-1d8a7a8b4c64?auto=format&fit=crop&w=900&q=80", tag: "Bestseller" },
  { id: 3, name: "Mogra Chanderi", type: "Chanderi", price: 12400, color: "Ivory", image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=80", tag: "Lightweight" },
  { id: 4, name: "Gul Paithani", type: "Paithani", price: 26800, color: "Rose", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80", tag: "Limited" },
  { id: 5, name: "Neel Tussar", type: "Tussar", price: 9800, color: "Indigo", image: "https://images.unsplash.com/photo-1594736797933-d0e501ba2fe6?auto=format&fit=crop&w=900&q=80", tag: "Handloom" },
  { id: 6, name: "Mitti Linen", type: "Linen", price: 7200, color: "Earth", image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=900&q=80", tag: "Everyday" },
];

const money = (value) => `₹${value.toLocaleString("en-IN")}`;

function ProductCard({ product, wished, onWish, onAdd, onOpen }) {
  return (
    <article className="product-card reveal-item">
      <button className="product-image" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
        <img src={product.image} alt={`${product.name} saree`} loading="lazy" />
        <span className="product-tag">{product.tag}</span>
        <span className="quick-view">View piece</span>
      </button>
      <div className="product-info">
        <div><p className="product-type">{product.type} / {product.color}</p><h3>{product.name}</h3></div>
        <button className={`wish-button ${wished ? "is-wished" : ""}`} onClick={() => onWish(product.id)} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}>{wished ? "♥" : "♡"}</button>
      </div>
      <div className="product-bottom"><span>{money(product.price)}</span><button className="add-button" onClick={() => onAdd(product)}>Add to bag</button></div>
    </article>
  );
}

function App() {
  const root = useRef(null);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bag, setBag] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("All pieces");
  const [sort, setSort] = useState("curated");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 850);
    return () => window.clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (!ready || !root.current) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-media", { scale: 1.12, duration: 1.8, ease: "power2.out" }, 0)
          .from(".hero-kicker, .hero-title-line, .hero-copy, .hero-actions", { y: 42, opacity: 0, stagger: 0.1, duration: 1.05 }, 0.35)
          .from(".hero-detail", { x: 80, opacity: 0, rotate: 4, duration: 1.2 }, 0.65)
          .from(".hero-orbit, .hero-stamp", { scale: 0, opacity: 0, stagger: 0.12, duration: 1 }, 0.8);
        gsap.to(".hero-media", { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        gsap.to(".hero-copy-lockup", { yPercent: -16, opacity: 0.3, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        gsap.to(".loom-image", { yPercent: -10, ease: "none", scrollTrigger: { trigger: ".loom-story", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(".reveal-item", { y: 35, opacity: 0, stagger: 0.08, duration: 0.8, scrollTrigger: { trigger: ".product-grid", start: "top 78%" } });
        gsap.from(".collection-card", { y: 45, opacity: 0, stagger: 0.1, duration: 0.9, scrollTrigger: { trigger: ".collection-grid", start: "top 82%" } });
      }
    }, root);
    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const filteredProducts = useMemo(() => {
    const matching = products.filter((product) => {
      const category = filter === "All pieces" || product.type === filter;
      const text = `${product.name} ${product.type} ${product.color}`.toLowerCase();
      return category && (!query.trim() || text.includes(query.trim().toLowerCase()));
    });
    return [...matching].sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : a.id - b.id);
  }, [filter, query, sort]);

  const addToBag = (product) => { setBag((items) => [...items, product]); setToast(`${product.name} added to your bag`); };
  const toggleWish = (id) => setWishlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);

  return (
    <div className="site-shell" ref={root}>
      {!ready && <div className="preloader"><span className="preloader-mark">EW</span><span className="preloader-line"></span><span className="preloader-word">Elite Weavers</span></div>}
      <div className="announcement">Complimentary shipping across India on orders over ₹10,000</div>
      <header className="site-header">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><span></span><span></span></button>
        <a href="#top" className="wordmark"><span>Elite</span><strong>Weavers</strong></a>
        <nav className={menuOpen ? "nav-open" : ""}>
          <a href="#collections" onClick={() => setMenuOpen(false)}>Collections</a>
          <a href="#new" onClick={() => setMenuOpen(false)}>New arrivals</a>
          <a href="#heritage" onClick={() => setMenuOpen(false)}>Our heritage</a>
          <a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a>
        </nav>
        <div className="header-actions"><button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">Search</button><button aria-label="Wishlist">Wishlist <sup>{wishlist.length || ""}</sup></button><button onClick={() => setToast(bag.length ? `${bag.length} piece${bag.length > 1 ? "s" : ""} in your bag` : "Your bag is waiting for something beautiful")} aria-label="Shopping bag">Bag <sup>{bag.length || ""}</sup></button></div>
      </header>
      {searchOpen && <div className="search-panel"><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sarees, silk, handloom..." aria-label="Search the collection" /><button onClick={() => { setSearchOpen(false); document.getElementById("new")?.scrollIntoView({ behavior: "smooth" }); }}>View results</button></div>}

      <main id="top">
        <section className="hero">
          <div className="hero-pattern"></div><div className="hero-thread thread-one"></div><div className="hero-thread thread-two"></div><div className="hero-thread thread-three"></div>
          <img className="hero-media" src={images.hero} alt="Woman draped in a deep red silk saree" />
          <div className="hero-shade"></div><div className="hero-detail"><img src={images.heroDetail} alt="Detail of a woven silk border" /><span>Hand finished<br />in Varanasi</span></div>
          <div className="hero-copy-lockup"><p className="hero-kicker">The autumn edit / 2024</p><h1><span className="hero-title-line">Woven for</span><span className="hero-title-line hero-italic">the occasion.</span></h1><p className="hero-copy">Sarees with a sense of place. Made by hand, chosen for the way they make you feel.</p><div className="hero-actions"><a className="primary-button" href="#new">Discover the edit <span>↗</span></a><a className="quiet-link" href="#heritage">Meet the hands</a></div></div>
          <div className="hero-stamp">EST.<br /><b>2017</b><br />INDIA</div><div className="hero-orbit"><span>Silk / Story / Ceremony</span></div><div className="hero-footer"><span>01 / 04</span><span>Scroll to enter</span><span>India, slowly woven</span></div>
        </section>

        <section className="intro reveal-section"><div className="intro-rule"></div><p className="section-kicker">A considered wardrobe</p><h2>The beauty of a saree<br /><em>is in its living story.</em></h2><p>We work with master weavers across India to bring old techniques into the present. Each piece is selected for its hand, its history, and the woman it becomes.</p></section>
        <section className="collection-section" id="collections"><div className="section-heading reveal-section"><div><p className="section-kicker">The loom index</p><h2>Four ways to wear<br /><em>the light.</em></h2></div><a href="#new" className="text-link">Explore collections <span>↗</span></a></div><div className="collection-grid">{collections.map((collection, index) => <a className={`collection-card card-${index}`} style={{ "--card-color": collection.color }} href="#new" key={collection.name}><img src={collection.image} alt={`${collection.name} collection`} loading="lazy" /><div className="collection-overlay"><span>{collection.name}</span><small>{collection.note}</small></div></a>)}</div></section>
        <section className="craft-band" aria-label="Our craft values"><div className="craft-band-inner"><span>Handloom</span><i>✦</i><span>Modern heirlooms</span><i>✦</i><span>Woven in India</span><i>✦</i><span>Handloom</span></div></section>

        <section className="products-section" id="new"><div className="section-heading reveal-section"><div><p className="section-kicker">The edit</p><h2>Pieces to keep<br /><em>close.</em></h2></div><div className="filter-wrap"><div className="filter-row">{["All pieces", "Banarasi", "Kanjivaram", "Chanderi", "Paithani"].map((item) => <button className={filter === item ? "active" : ""} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="sort-control">Sort <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="curated">Curated</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div></div>{filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} wished={wishlist.includes(product.id)} onWish={toggleWish} onAdd={addToBag} onOpen={setSelected} />)}</div> : <div className="empty-state"><h3>No pieces found</h3><p>Try another search or return to the full edit.</p><button onClick={() => { setQuery(""); setFilter("All pieces"); }}>View all pieces</button></div>}</section>

        <section className="loom-story" id="heritage"><div className="loom-image-wrap"><img className="loom-image" src={images.loom} alt="Hands working on a traditional textile loom" loading="lazy" /><div className="loom-caption">The hands<br />behind it</div></div><div className="loom-copy"><p className="section-kicker">Our heritage</p><h2>Before it is yours,<br /><em>it belongs to a story.</em></h2><p>In Kanchipuram, Varanasi, Maheshwar and beyond, the loom is still a place of patience. We partner with family-run ateliers who carry their methods forward one generation at a time.</p><a className="text-link" href="#journal">Meet our weavers <span>↗</span></a><div className="loom-signature">E / W</div></div></section>
        <section className="journal-section" id="journal"><div className="journal-feature reveal-section"><img src={images.craft} alt="A detail of a handwoven textile" loading="lazy" /><div><p className="section-kicker">From our journal</p><h2>The quiet geometry<br />of a border.</h2><a className="text-link" href="#journal">Read the story <span>↗</span></a></div></div><div className="journal-aside reveal-section"><img src={images.portrait} alt="Portrait of a woman wearing a saree" loading="lazy" /><p>On draping, memory, and the art of wearing something with a past.</p><a className="text-link" href="#journal">A note from the studio <span>↗</span></a></div></section>
        <section className="newsletter reveal-section"><div><p className="section-kicker">A note, now and then</p><h2>Stories from the loom,<br /><em>sent with care.</em></h2></div><form onSubmit={(event) => { event.preventDefault(); setToast("Thank you. You are on the list."); event.currentTarget.reset(); }}><label htmlFor="email">Your email address</label><div className="email-field"><input id="email" type="email" required placeholder="you@example.com" /><button type="submit">Join the list <span>↗</span></button></div><small>We write sparingly. Unsubscribe anytime.</small></form></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><a href="#top" className="wordmark"><span>Elite</span><strong>Weavers</strong></a><p>Modern heirlooms, woven slowly in India.</p></div><div className="footer-links"><div><h4>Explore</h4><a href="#collections">Collections</a><a href="#new">New arrivals</a><a href="#heritage">Our heritage</a></div><div><h4>Care</h4><a href="#journal">Saree care</a><a href="#journal">Shipping & returns</a><a href="#journal">Contact us</a></div><div><h4>Follow along</h4><a href="#journal">Instagram</a><a href="#journal">Pinterest</a></div></div><div className="footer-bottom"><span>© 2024 Elite Weavers</span><span>Made with respect for the craft</span></div></footer>
      {toast && <div className="toast" role="status">{toast}<button onClick={() => setToast("")} aria-label="Dismiss">×</button></div>}
      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="product-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close product detail">×</button><img src={selected.image} alt={`${selected.name} saree`} /><div><p className="product-type">{selected.type} / {selected.color}</p><h2>{selected.name}</h2><p className="modal-description">A hand-finished piece with an easy drape and a border that reveals its detail in motion.</p><strong>{money(selected.price)}</strong><button className="primary-button" onClick={() => { addToBag(selected); setSelected(null); }}>Add to bag</button></div></div></div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
