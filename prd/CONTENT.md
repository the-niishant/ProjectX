# Elite Weavers Content Specification

This document is the source of truth for the words, labels, data, and media used by the Elite Weavers prototype. Content should make the textile tangible, explain its provenance without romanticising it, and give a shopper enough practical information to buy with confidence.

## 1. Content principles

- **Material before mechanism.** Describe what the cloth does in the hand and in light before describing the interface.
- **Specific over decorative.** Name the weave, material, region, motif, finish, and use case when known. Do not use empty phrases such as “premium quality” or “luxurious fabric.”
- **Warm, not breathless.** The voice is observant, intimate, and assured. It can be poetic in headlines but must become plain and useful around price, care, delivery, and checkout.
- **Provenance with humility.** Say where a technique or textile comes from; do not imply that one region, community, or unnamed “artisan” represents all Indian weaving.
- **No invented certainty.** If a detail is not confirmed, omit it or use an approved general statement. Never invent thread counts, hours, certification, artisan names, or sustainability claims.
- **A saree is a garment and a textile.** Copy should support both first-time saree buyers and experienced collectors.
- **India-first, globally legible.** Use “saree” throughout. Explain regional terms in context rather than replacing them with generic English.

## 2. Voice and writing rules

### Brand voice

| Quality | Do | Avoid |
|---|---|---|
| Sensory | “A dry, lightly textured hand with a soft fall.” | “Unbelievably luxurious.” |
| Grounded | “Woven in Varanasi with a restrained zari border.” | “A timeless masterpiece from the heart of India.” |
| Personal | “For a long evening and the people you want to remember.” | “For the modern woman who wants to make a statement.” |
| Clear | “Ships in 2–4 business days.” | “Delivered soon.” |
| Respectful | “Made with a family-run weaving studio.” | “Poor artisans given a better life.” |

### Formatting

- Use sentence case for labels, buttons, filters, and headings except proper names.
- Use `₹` and Indian digit grouping for INR (`₹18,900`). Keep the currency code available to the implementation for future locale support.
- Use an en dash for ranges (`2–4 business days`) and a slash for compact metadata (`Banarasi / Indigo`).
- Keep product names to two or three words plus the textile or collection name.
- Use “handwoven” as one word; use “hand-finished” with a hyphen.
- Use “zari” unless a product record specifically confirms a different metallic thread.
- Write “Kanchipuram” in long-form editorial copy and “Kanjivaram” for the product/category name.
- Use alt text as an objective description, not a sales line.

## 3. Taxonomy

Every product may have one primary craft category and multiple discovery attributes.

### Craft and regional categories

| Category | Short description | Useful discovery terms |
|---|---|---|
| Banarasi | Silk or other textiles associated with the brocade traditions of Varanasi, often with zari and patterned pallu. | brocade, zari, Varanasi, jangla, kadwa |
| Kanjivaram | Structured silk sarees associated with Kanchipuram, often recognised by contrast borders and temple-inspired motifs. | Kanchipuram, korvai, temple border, zari |
| Chanderi | Light, luminous fabric from Madhya Pradesh, available in silk, cotton, and silk-cotton compositions. | sheer, butti, Madhya Pradesh, light drape |
| Paithani | Maharashtrian silk tradition known for vivid colour, geometric borders, and peacock or floral pallus. | peacock, yeola, oblique weave, jewel tone |
| Patola | Intricate double-ikat tradition associated with Gujarat; use only when the construction is confirmed. | double ikat, Patan, geometric |
| Bandhani | Tie-dye tradition with dotted or wave-like patterns; specify the region only when verified. | tie-dye, leheriya, dots, Gujarat, Rajasthan |
| Tussar | Textured silk with a warm, natural irregularity and a less glossy surface than mulberry silk. | wild silk, texture, matte, earthy |
| Organza | Fine, crisp, translucent fabric with a structured fall; composition must be stated. | sheer, crisp, light, translucent |
| Linen | Breathable, dry-hand fabric suited to relaxed, repeat wear; composition must be stated. | breathable, everyday, natural texture |
| Cotton | Comfortable, versatile fabric available in different weights and finishes. | breathable, soft, everyday, printed |
| Handloom | A construction/discovery label, not a substitute for the actual weave or region. | handwoven, loom, texture |

### Fabric values

`Mulberry silk`, `Tussar silk`, `Silk-cotton`, `Cotton`, `Linen`, `Linen-cotton`, `Organza silk`, `Chanderi silk`, `Chanderi cotton`, `Georgette`, `Crepe`, `Modal silk`, `Bamboo silk` (only when verified).

### Occasion values

`Wedding`, `Bridal`, `Reception`, `Festive`, `Diwali`, `Haldi`, `Mehendi`, `Sangeet`, `Party`, `Evening`, `Work`, `Everyday`, `Travel`, `Gift`, `First saree`.

### Colour values

Use a shopper-friendly name plus an optional internal swatch value:

`Indigo`, `Midnight`, `Ink`, `Forest`, `Emerald`, `Pista`, `Moss`, `Marigold`, `Saffron`, `Rust`, `Vermilion`, `Gulabi`, `Rose`, `Plum`, `Berry`, `Wine`, `Ivory`, `Mogra`, `Sand`, `Mitti`, `Taupe`, `Charcoal`, `Black`, `White`, `Gold`, `Silver`, `Multicolour`.

Avoid treating colour names as exact guarantees. Add “Colours may vary slightly by screen and natural light” wherever swatches or product photography are shown.

## 4. Product content model

### Required product fields

```text
id
name
slug
category
fabric
composition
weave
origin
makerNote
colour
colourFamily
occasion[]
price
compareAt
currency
tag
description
details[]
border
pallu
blousePiece
length
width
weight
transparency
care[]
delivery
returns
images[]
imageAlt[]
rating
reviewCount
isNew
isBestSeller
isLimited
stockState
relatedProductIds[]
```

### Field guidance

- **`description`**: 1–2 sentences, 35–65 words. Start with colour/material, then explain the visual rhythm or drape, and finish with the moment it suits.
- **`details[]`**: scannable factual values such as “Contrast zari border,” “Unstitched blouse piece included,” or “Slightly sheer in direct light.”
- **`makerNote`**: 1–3 sentences about the studio, region, or method. Use a named maker only with permission and confirmed attribution.
- **`border` / `pallu`**: describe what the eye sees, not what the shopper is expected to feel.
- **`length` / `width` / `weight`**: show only confirmed measurements. Use “approx.” when handwoven variation is expected.
- **`stockState`**: `in_stock`, `low_stock`, `made_to_order`, `sold_out`, or `coming_soon`. Never create urgency with an unsupported stock count.
- **`compareAt`**: show only for a genuine reference price; otherwise omit the field rather than showing an artificial discount.
- **`tag`**: one compact badge only: `New`, `Bestseller`, `Limited`, `Handloom`, `Lightweight`, `Made to order`, or `Last few`.

### Product description patterns

1. **Silk / occasion:** “A deep [colour] silk with [motif or border] that catches the light without taking over the drape. Made for [occasion or styling moment].”
2. **Light textile:** “A [fabric] saree with a [dry / crisp / airy] hand and [detail]. Easy to wear with [occasion or everyday use].”
3. **Textured textile:** “The natural variation of [fabric] gives this [colour] saree its character. Finished with [border/pallu detail] for a quiet point of contrast.”
4. **Graphic / patterned:** “A [colour] ground carries [motif or pattern] in a measured rhythm from border to pallu. [Fabric] keeps the silhouette [quality].”

### Fully varied sample catalogue

| Name | Category / fabric | Colour | Occasion | Product description |
|---|---|---|---|---|
| Nila Banarasi Silk | Banarasi / silk | Indigo | Wedding, evening | A midnight Banarasi with a quiet gold geometry through the pallu. The silk has a smooth fall and enough weight for a long, assured drape. |
| Aranya Kanjivaram | Kanjivaram / silk | Forest | Festive, wedding | Forest green silk framed by a warm zari border and a small temple rhythm. The contrast is rich in photographs and even better in low evening light. |
| Mogra Chanderi | Chanderi / silk-cotton | Ivory | Party, reception | An ivory Chanderi that holds a little light in its sheer surface. Fine butti work and a clean border keep it graceful rather than precious. |
| Gul Paithani | Paithani / silk | Rose | Wedding, festive | Rose silk with a jewel-toned pallu where the peacocks appear slowly as the saree moves. A celebratory piece with a generous, easy fall. |
| Neel Tussar | Tussar / silk | Indigo | Everyday, work | A textured indigo Tussar with a softened sheen and a narrow contrast edge. It brings the presence of silk to an ordinary day without asking for ceremony. |
| Mitti Linen | Linen / linen-cotton | Earth | Everyday, travel | Warm earth linen with a dry hand, an unfussy border, and a drape that improves with wear. Designed for repeat dressing, packing, and living in. |
| Kesari Organza | Organza / silk | Saffron | Festive, reception | Crisp saffron organza with a fine metallic edge. Light on the body and bright at the pallu, it works beautifully with a simple blouse and minimal jewellery. |
| Megh Cotton | Cotton / cotton | Cloud blue | Everyday, work | Soft cloud-blue cotton with a small woven check and a comfortable, breathable fall. A first saree, a travel saree, and an easy one to return to. |
| Raat Patola | Patola / silk | Black, berry | Evening, party | A dark ground carries berry and rust geometry in a disciplined double-ikat rhythm. The surface is graphic; the hand remains supple enough for an uncomplicated drape. |
| Leher Bandhani | Bandhani / silk-cotton | Vermilion | Festive, mehendi | Vermilion silk-cotton marked with a fine dotted movement and a contrasting pallu. Bright without being loud, with a soft body that settles quickly when draped. |

## 5. Global navigation and interface copy

### Header

- Announcement: `Complimentary shipping across India on orders over ₹10,000`
- Primary navigation: `Collections`, `New arrivals`, `Our heritage`, `Journal`
- Utility actions: `Search`, `Wishlist`, `Bag`
- Search placeholder: `Search sarees, silk, handloom...`
- Search submit: `View results`
- Search no results: `No pieces match that search`
- Search guidance: `Try a fabric, colour, region, or occasion.`

### Buttons and actions

`Discover the edit`, `Explore collections`, `View piece`, `Add to bag`, `Buy now`, `Save to wishlist`, `Remove from wishlist`, `Remove`, `View all pieces`, `Meet our weavers`, `Read the story`, `Join the list`, `Continue to checkout`, `Place order`, `Return to the edit`, `Close`, `Apply`.

### Feedback and validation

- Add to bag: `[Product name] added to your bag`
- Wishlist add: `Saved to your wishlist`
- Wishlist remove: `Removed from your wishlist`
- Promo success: `Promo code applied`
- Promo empty: `Enter a code to apply`
- Promo invalid: `That code could not be applied. Check the code and try again.`
- Newsletter success: `Thank you. You are on the list.`
- Newsletter invalid: `Enter a valid email address.`
- Generic loading: `Loading the edit`
- Generic error: `We could not load this right now. Please try again.`

## 6. Page content

### Home `/`

**Announcement:** `Complimentary shipping across India on orders over ₹10,000`

**Hero**
- Kicker: `The autumn edit / 2024`
- Headline: `Woven for the occasion.`
- Supporting copy: `Sarees with a sense of place. Made by hand, chosen for the way they make you feel.`
- Primary CTA: `Discover the edit`
- Secondary CTA: `Meet the hands`
- Detail caption: `Hand finished / in Varanasi`
- Stamp: `EST. 2017 / INDIA`
- Orbit text: `Silk / Story / Ceremony`
- Scroll cue: `Scroll to enter`

**Intro**
- Kicker: `A considered wardrobe`
- Headline: `The beauty of a saree is in its living story.`
- Body: `We work with master weavers across India to bring old techniques into the present. Each piece is selected for its hand, its history, and the woman it becomes.`

**Collection cards**
- `Banarasi` / `Gold that catches the light`
- `Kanjivaram` / `Silk with a southern soul`
- `Chanderi` / `A veil of quiet light`
- `Paithani` / `Peacocks in jewel tones`

**Product section**
- Kicker: `The edit`
- Headline: `Pieces to keep close.`
- Filter label: `Filter by craft`
- Filter values: `All pieces`, `Banarasi`, `Kanjivaram`, `Chanderi`, `Paithani`, `Patola`, `Bandhani`, `Tussar`, `Organza`, `Linen`, `Cotton`
- Sort label: `Sort`
- Sort values: `Curated`, `Newest`, `Price: low to high`, `Price: high to low`, `Most loved`

**Category explorer**
- Kicker: `Find your texture`
- Headline: `Shop by fabric, wear it your way.`
- Links: `Silk`, `Handloom`, `Organza`, `Linen`, `Cotton`, `Wedding`, `Festive`, `Party`, `Everyday`, `First saree`

**Heritage**
- Kicker: `Our heritage`
- Headline: `Before it is yours, it belongs to a story.`
- Body: `In Kanchipuram, Varanasi, Maheshwar and beyond, the loom is still a place of patience. We partner with family-run ateliers who carry their methods forward one generation at a time.`
- CTA: `Meet our weavers`

**Journal feature**
- Kicker: `From our journal`
- Title: `The quiet geometry of a border.`
- CTA: `Read the story`
- Secondary title: `On draping, memory, and the art of wearing something with a past.`
- CTA: `A note from the studio`

**Social proof**
- Kicker: `Worn and remembered`
- Headline: `Pieces that become part of the story.`

**Newsletter**
- Kicker: `A note, now and then`
- Headline: `Stories from the loom, sent with care.`
- Label: `Your email address`
- Placeholder: `you@example.com`
- Submit: `Join the list`
- Reassurance: `We write sparingly. Unsubscribe anytime.`

### Collections `/collections`

- Kicker: `The loom index`
- Title: `Find the piece by how it feels.`
- Intro: `Browse regional craft, familiar fabrics, and the colours that stay with you.`
- Filter groups: `Craft`, `Fabric`, `Colour`, `Occasion`, `Price`
- Price options: `Under ₹10,000`, `₹10,000–₹20,000`, `₹20,000–₹30,000`, `Above ₹30,000`
- Active filter label: `Showing [count] pieces`
- Clear filters: `Clear all`
- Empty title: `Nothing here, yet.`
- Empty body: `Try widening the filters or return to the full edit.`
- Error title: `The edit is taking a moment.`
- Error body: `Please try again, or browse our heritage story while you wait.`

### Collection detail `/collections/:slug`

Each collection receives a distinct title, 40–70 word introduction, hero image caption, and a related journal link.

| Collection | Title | Introduction | Related story |
|---|---|---|---|
| The Night Loom | `Silk after sunset.` | `Deep colour, measured shine, and borders that reveal themselves as the light changes. These are pieces for dinner, dancing, and the photographs that happen after dark.` | `How to wear metallic borders without overthinking them` |
| Southern Light | `A silk with a southern rhythm.` | `Kanjivaram-inspired pieces with confident colour, considered contrast, and motifs that hold their ground from the first pleat to the last turn.` | `Reading the temple border` |
| Barely There | `Light, but never slight.` | `Chanderi, organza, and linen chosen for their air, texture, and ease. For warm rooms, long afternoons, and the days you want the saree to do less.` | `The art of a lighter drape` |
| The Celebration Edit | `For the days that gather everyone.` | `A considered edit for weddings, festivals, receptions, and all the invitations that deserve a little colour.` | `A saree wardrobe for the wedding season` |
| Everyday Heirlooms | `The pieces you reach for.` | `Breathable cotton, textured Tussar, and handloom staples with enough character for daily wear and enough durability to become familiar.` | `Five ways to bring handloom into an everyday wardrobe` |

### Product detail `/products/:slug`

**Information order**

1. Product name, category/colour, price, and availability.
2. One-sentence description.
3. `Add to bag`, `Buy now`, and wishlist action.
4. Material and construction facts.
5. Delivery and returns.
6. Care.
7. Reviews.
8. Related pieces and frequently bought together.

**Accordions**

- `The details`
- `The story`
- `Care`
- `Delivery & returns`
- `Reviews ([count])`

**Standard detail labels**

`Fabric`, `Composition`, `Weave`, `Origin`, `Border`, `Pallu`, `Blouse piece`, `Length`, `Width`, `Transparency`, `Weight`, `SKU`.

**Availability copy**

- In stock: `Ready to ship`
- Low stock: `Last few available`
- Made to order: `Made to order / Ships in [range]`
- Sold out: `Currently unavailable`
- Coming soon: `Coming soon`

**Delivery copy**

`Complimentary shipping across India on orders over ₹10,000. This piece ships in [range]. International delivery, duties, and taxes are calculated at checkout.`

**Care copy**

`Air after wearing. Fold with the body inside and store in a breathable cotton or muslin cover. Keep away from direct sunlight, moisture, and perfume. Dry clean when needed; follow the product-specific care note first.`

### Wishlist `/wishlist`

- Title: `Pieces you want to remember.`
- Intro: `Save a piece while you decide.`
- Empty title: `Nothing saved yet`
- Empty body: `Keep the pieces that stay with you.`
- CTA: `Explore the edit`
- Save prompt: `Sign in or save your wishlist by email`
- Placeholder: `Your email address`
- Confirmation: `We sent your saved pieces to [email].`

### Bag `/cart`

- Title: `Your bag`
- Empty title: `Your bag is quiet.`
- Empty body: `There are no pieces here yet.`
- CTA: `Explore the edit`
- Quantity label: `Quantity`
- Subtotal: `Subtotal`
- Shipping note: `Complimentary shipping unlocked`
- Threshold note: `Add [amount] more for complimentary shipping`
- Promo label: `Promo code`
- Promo placeholder: `Enter code`
- Summary reassurance: `Taxes and delivery options are confirmed at checkout.`
- CTA: `Continue to checkout`

### Checkout `/checkout`

- Step labels: `Contact`, `Shipping`, `Delivery`, `Payment`, `Review`
- Contact heading: `Where should we send your order?`
- Email label: `Email address`
- Shipping heading: `Shipping address`
- Delivery heading: `Choose delivery`
- Delivery options: `Standard delivery`, `Express delivery`, `International delivery`
- Payment heading: `Payment method`
- Demo note: `This prototype does not process a real payment.`
- Order summary heading: `Your order`
- Promo link: `Have a promo code?`
- Place-order CTA: `Place order`
- Required error: `This field is required.`
- Email error: `Enter a valid email address.`
- Generic submit error: `We could not place the demo order. Check the details and try again.`

**Confirmation**

- Eyebrow: `Order received`
- Title: `A beautiful piece is on its way.`
- Body: `Thank you, [first name]. We have sent confirmation details to [email].`
- Order number label: `Order number`
- Delivery label: `Estimated delivery`
- CTA: `Return to the edit`

### Heritage `/heritage`

**Hero:** `Meet the hands behind the cloth.`

**Intro:** `A textile carries more than colour. It carries a place, a method, and the decisions made between one thread and the next.`

**Story modules**

- `Varanasi / Pattern in motion` — brocade, zari, and the patient build of a Banarasi pallu.
- `Kanchipuram / Contrast with purpose` — silk, border, and the visual grammar of temple forms.
- `Maheshwar / Light on the edge` — a lighter hand and borders that make the drape feel architectural.
- `The studio / Selection is a responsibility` — how Elite Weavers chooses, documents, and presents each piece.

**Trust statement:** `We share the details we can verify. When a piece varies because it is handwoven, we say so. When a material or origin is not confirmed, we do not embellish the story.`

### Journal `/journal`

Use article cards with a category, title, dek, read time, date, and image alt text.

| Category | Title | Dek | Read time |
|---|---|---|---|
| Craft | `The quiet geometry of a border` | `How a border gives a saree its pace, proportion, and point of view.` | `5 min read` |
| Care | `How to fold, store, and air a silk saree` | `A practical ritual for keeping a favourite piece ready for its next life.` | `4 min read` |
| Styling | `Five ways to bring handloom into an evening wardrobe` | `Texture, proportion, and a little less ceremony.` | `6 min read` |
| Drape | `A note on the first pleat` | `What changes when you stop trying to make a saree behave.` | `3 min read` |
| Region | `Reading Kanchipuram in colour and contrast` | `A beginner’s guide to the visual language of a southern silk.` | `7 min read` |
| Materials | `Silk, Tussar, linen: finding your hand` | `The simplest way to choose a saree is to pay attention to its surface.` | `5 min read` |

## 7. Testimonials and reviews

Use concise, specific, believable reviews. Attribute with first name and initial plus city only when consent exists. Do not fabricate verified-purchase badges.

Approved examples:

- “The colour is even more beautiful in natural light. It feels special without feeling precious.” — Meera S., Mumbai
- “The hand of the fabric is extraordinary. I found the saree I will keep for my daughter.” — Ananya R., Bengaluru
- “Everything arrived beautifully wrapped, with a note about the weaver.” — Clara D., London
- “I wore it for a work dinner with a plain blouse. The border did all the talking.” — Kavya P., Delhi
- “The Chanderi is light but not flimsy, and the measurements on the page were useful.” — Rhea M., Pune
- “I was nervous about buying my first saree online. The care note and close-up images helped.” — Sara N., Hyderabad

Review UI labels: `Customer reviews`, `Based on [count] reviews`, `Write a review`, `Most recent`, `Highest rated`, `With photos`, `No reviews yet`.

## 8. Image and media direction

### Required image set per product

1. Full drape on a person, showing silhouette and scale.
2. Front or folded view showing the overall colour.
3. Border and pallu detail at a readable distance.
4. Fabric macro showing texture, translucency, or zari.
5. Blouse piece, selvedge, or included components where relevant.
6. Optional flat-lay or styled editorial image.

### Editorial image types

Use a rotating mix of `full drape`, `portrait`, `loom hand`, `thread/bobbin`, `border detail`, `folded textile`, `studio still life`, and `place/architecture`. Avoid using the same image as hero, card hover, detail, and journal thumbnail.

### Alt-text templates

- Product full view: `"[Product name] saree draped on a model, showing its [colour] body and [border detail]."`
- Product detail: `"[Product name] [fabric] close-up showing [motif, weave, or texture]."`
- Craft image: `"Hands working [material] on a traditional loom."`
- Portrait: `"Portrait of a person wearing a [colour] [category] saree."`
- Decorative image: `alt=""` when it adds atmosphere but no information.

Never use `image`, `photo`, a keyword list, or an unverified person’s name as alt text.

## 9. SEO and share content

### Site defaults

- Title: `Elite Weavers — Modern heirlooms, woven slowly in India`
- Description: `Discover considered Banarasi, Kanjivaram, Chanderi, Paithani, handloom, silk, linen, and cotton sarees selected for their craft, colour, and living story.`
- Open Graph title: `Woven for the occasion.`
- Open Graph description: `Sarees with a sense of place, chosen for the way they make you feel.`

### Page title patterns

- Collection: `[Collection name] Sarees | Elite Weavers`
- Product: `[Product name] — [Category] Saree | Elite Weavers`
- Journal: `[Article title] | Elite Weavers Journal`
- Heritage: `Our Heritage and Weavers | Elite Weavers`

Keep titles under roughly 60 characters where possible and descriptions under roughly 160 characters. Product SEO copy must remain consistent with the visible product facts.

## 10. Accessibility, localization, and content QA

- Every image has meaningful alt text or an intentional empty alt.
- Every form input has a visible label; placeholders never replace labels.
- Error text identifies the field and explains how to fix it.
- Do not communicate colour through colour alone; use names and text labels.
- Keep button labels action-oriented and unique within a region.
- Preserve visible focus and provide screen-reader text for icon-only controls.
- Keep content legible at 200% zoom and on 320px-wide screens.
- Dates, prices, delivery windows, and measurement units must be localizable.
- Keep translation-friendly sentences short; avoid embedding meaning in decorative line breaks.
- Before release, check every product for: confirmed price, fabric, origin, care, delivery, image set, alt text, tag, and stock state.
- Before release, check every page for: one clear H1, unique title/description, empty/loading/error copy, keyboard labels, and a mobile-safe CTA.
