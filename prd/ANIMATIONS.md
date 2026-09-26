# Elite Weavers Motion Specifications

## Principles
Motion communicates hierarchy, materiality, and state change. It must never obscure product information or prevent a shopper from acting.

## Entry
Preloader holds the mark briefly, then fades and scales away. Hero image settles from a slightly wider crop while headline lines rise into place.

## Hero
Image parallax is scrubbed from hero top to bottom. Textile pattern drifts slowly and thread lines float on a long loop. Orbit motif rotates only when reduced motion is not requested.

## Scroll
Section reveals use a single upward opacity/transform reveal. Craft story image uses subtle vertical parallax. No `window.scroll` listeners.

## Commerce
Add to cart shows a toast and updates the bag count immediately. Drawers slide from the edge with a scrim. Wishlist buttons provide immediate color and label state changes. Quick view uses a modal fade and scale.

## Hover
Product photography scales gently and swaps to the second image when available. CTA controls lift 2-4px on hover and compress on active.

## Reduced motion
Disable looping pattern, parallax, rotating motifs, and entrance transforms. Keep all content, focus, and state transitions instant and understandable.

## Performance
Animate only transform and opacity, use GSAP context cleanup, lazy-load below-fold images, and avoid animating layout properties.
