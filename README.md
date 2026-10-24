# North Thread – sample online shop (portfolio concept)

**Not a real shop.** North Thread is a fictional brand built as a Tier 3 portfolio sample. No goods, no payments, no orders.

## How a real build would be done
A real Tier 3 shop would run on **Shopify** (or **WooCommerce** if the client already uses WordPress): theme the store to this design, set up products and size/colour variants, and configure payments, shipping, tax and stock there. This static concept shows the design and shopping flow only.

## What's built
Plain HTML, CSS and vanilla JS. No build step, no dependencies.

| Page | File |
|---|---|
| Home (editorial landing: photo hero, ticker, lookbook, best sellers, shop-by-kind tiles, materials, story, Highlands band, newsletter demo) | `index.html` |
| Shop (category, size, price filters + sort) | `shop.html` (`?cat=Knitwear` etc. pre-filters) |
| Product (colour + size selector with photo thumbnails, photo credit, sold-out sizes, qty, fabric/fit/delivery accordions) | `product.html?id=<product-id>` |
| Basket (demo; qty, remove, free-delivery bar, demo checkout dialog) | `basket.html` |
| About | `about.html` |
| Contact (`mailto:` form, nothing sent by the site) | `contact.html` |
| Delivery, returns & size guide | `delivery.html` |
| Brand starter pack | `brand.html` |
| Privacy, 404 | `privacy.html`, `404.html` |

- Product data: `js/products.js` (10 sample products). Edit names, prices, colours, sizes and sold-out sizes there.
- Basket: `localStorage` key `nt-basket`, this browser only, with an in-memory fallback if storage is blocked.
- Every page carries the striped "Sample – no real purchases" banner.

## Sample assumptions (intake)
All invented: brand, product names, prices, fabrics, delivery (£3.95, free over £75, next day £6.95), 30-day returns, size chart, contact email `hello@example.com`. No reviews or testimonials were invented. Pages carry `noindex` so the sample isn't indexed.

## Brand starter pack (AI-generated)
- Logo: `images/logo.svg`, mark `images/logo-mark.svg` (also `favicon.svg`). Compass ring with the N at the top and two crossed sewing needles joined by a thread (round 4, Johnny picked concept 2 of 3; others in ../north-thread-logo-concepts/).
- Colours: Fjord ink `#1E2A32`, Oat `#F3EEE6`, Stone `#E3DACB`, Rust `#A84B2A`, Moss `#4F5D45`.
- Type: Fraunces 600 (display), Work Sans 400/500/600 (body), Google Fonts, SIL OFL.

## Images (stock photos, round 3)
Every image of clothing is a **free-licence stock photo from Pexels** (https://www.pexels.com/license/: free for commercial use, no attribution required, but we credit anyway). Each one is labelled "Stock photo" on the page, and product pages show the photographer with a link. They show **similar garments, not North Thread products**; product names, colours and copy were adjusted to match what the photos show (the Bothy Gilet was swapped for the Shore Stripe Jumper because no good gilet photo was found).

Not used: Unsplash. Its image host is reachable from the build environment but its search and download pages are behind a bot check, so photos were found by web search on Pexels and fetched from images.pexels.com. Photographer names come from the Pexels page titles shown in search results; the "Pexels user" one could not be confirmed.

Files are WebP, cropped/resized from the Pexels originals: `images/products/<id>-<colour>.webp` (1000×1250, plus `-sm` 500×625) and `images/photos/` (1600 wide, plus `-sm`). The earlier rendered mock-ups were removed; the renderer is still in `../north-thread-tools/` if they're wanted again.

| Where | File | Photographer | Pexels page |
|---|---|---|---|
| Home hero | `images/photos/hero` | Elina Sazonova | https://www.pexels.com/photo/2705753/ |
| Lookbook 01, About | `images/photos/lookbook-rollneck` | Gursher Gill | https://www.pexels.com/photo/20775158/ |
| Lookbook 02 | `images/photos/lookbook-chore` | Ron Lach | https://www.pexels.com/photo/9466721/ |
| Lookbook 03 | `images/photos/rail` | Kaboompics | https://www.pexels.com/photo/5706277/ |
| Knitwear tile | `images/photos/folded-knits` | Nati | https://www.pexels.com/photo/14641424/ |
| Outerwear tile | `images/photos/outerwear-flatlay` | Hana Brannigan | https://www.pexels.com/photo/3998647/ |
| Lambswool | `images/photos/wool` | Nati | https://www.pexels.com/photo/14641422/ |
| Heavy cotton (crop) | `images/photos/cotton` | Ron Lach | https://www.pexels.com/photo/9466721/ |
| Waxed cotton (crop) | `images/photos/wax` | Sadiq Ali | https://www.pexels.com/photo/18026007/ |
| Story | `images/photos/knit-stack` | Nati | https://www.pexels.com/photo/14641430/ |
| Highlands band | `images/photos/highlands` | Daniel J. Schwarz | https://www.pexels.com/photo/34482318/ |
| Fell Crew, Moss | `images/products/fell-crew-0` | Elina Sazonova | https://www.pexels.com/photo/2705752/ |
| Fell Crew, Cobalt | `images/products/fell-crew-1` | Teddy Tavan | https://www.pexels.com/photo/4890733/ |
| Tarn Cardigan, Bottle | `images/products/tarn-cardigan-0` | cottonbro studio | https://www.pexels.com/photo/4936372/ |
| Tarn Cardigan, Rust | `images/products/tarn-cardigan-1` | Kaboompics | https://www.pexels.com/photo/4210854/ |
| Ridge Roll-neck, Ecru | `images/products/ridge-rollneck-0` | Daria Nekipelova | https://www.pexels.com/photo/9811069/ |
| Ridge Roll-neck, Storm | `images/products/ridge-rollneck-1` | Gursher Gill | https://www.pexels.com/photo/20775162/ |
| Harbour Chore, Rust | `images/products/harbour-chore-0` | Ron Lach | https://www.pexels.com/photo/9466721/ |
| Harbour Chore, Check | `images/products/harbour-chore-1` | Pexels user (name not shown) | https://www.pexels.com/photo/29259028/ |
| Moorland Field Coat | `images/products/moorland-coat-0` | Sadiq Ali | https://www.pexels.com/photo/18026007/ |
| Shore Stripe Jumper | `images/products/shore-stripe-0` | Dom J | https://www.pexels.com/photo/45982/ |
| Daily Tee, Chalk | `images/products/daily-tee-0` | Marina Podrez | https://www.pexels.com/photo/11671964/ |
| Daily Tee, Black | `images/products/daily-tee-1` | Hanna Pad | https://www.pexels.com/photo/8532611/ |
| Field Oxford | `images/products/field-oxford-0` | Peter Kambey | https://www.pexels.com/photo/17824561/ |
| Watch Beanie, Oat / Scarf, Navy Marl | `images/products/watch-beanie-0, lambswool-scarf-1` | Roman Verton | https://www.pexels.com/photo/10644259/ |
| Watch Beanie, Snow | `images/products/watch-beanie-1` | Andrea Piacquadio | https://www.pexels.com/photo/3760627/ |
| Watch Beanie, Damson / Scarf, Grey Marl | `images/products/watch-beanie-2, lambswool-scarf-0` | freestocks.org | https://www.pexels.com/photo/324658/ |

A real client build would replace all of these with their own product shoot.

## Checks run
- Playwright at 375px and 1280px: no horizontal scroll, one `<h1>` per page, no console errors.
- Flow tested: add without size shows an error; add with size/colour/qty updates the header count; category links pre-filter the shop; filters combine; basket totals and free-delivery threshold correct; demo checkout dialog opens; empty basket works.
- Skip link, landmarks, labelled form fields, visible focus, reduced-motion respected.

## Not done / for a real client
- Real products, photos, prices, legal entity details, terms and privacy notice (checked by the client or adviser).
- LocalBusiness/Organization structured data (skipped: no real business details).
- `og:url`, `og:image`, sitemap and robots at deploy; remove `noindex` for a real launch.
- Self-host fonts to avoid the Google Fonts request.

## Deploy
Not deployed. Any static host works (drag the folder to Netlify/Cloudflare Pages, or upload). Serve over HTTPS; point `404.html` as the not-found page.

## Button styles (round 4)
Three control styles live in `css/style.css`, picked by the class on `<html>`: `ui-a` Workwear (square, small caps; the default on every page), `ui-b` Editorial (underlined text with an arrow), `ui-c` Stitched label (hard shadow, dashed edges). Add `?ui=a`, `?ui=b` or `?ui=c` to any page URL to preview one; it's remembered in that browser. Comparison board: `../north-thread-previews/v4-button-styles.jpg`.

The logo wordmark in `images/logo.svg` is now outlined paths (Fraunces 600), so it renders the same without the font installed.
