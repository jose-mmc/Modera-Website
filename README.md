Shopify theme scaffold generated from your static `index.html`.

Quick steps to test locally:

1. Install Shopify CLI (macOS):

```bash
brew tap shopify/shopify
brew install shopify-cli
```

2. Login to your store and serve the theme locally from this folder:

```bash
cd shopify-theme
shopify login --store your-shop.myshopify.com
shopify theme serve
```

3. Copy the image files from your `images/` folder into `shopify-theme/assets/` so they are available as assets (e.g. `IMG_1150.PNG`, `IMG_3095.PNG`, etc.).

Notes:
- This scaffold keeps your markup and JS mostly unchanged and loads CSS/JS from `assets/theme.css` and `assets/theme.js`.
- For a production-ready theme you'll want to:
  - Move repeated sections into smaller `sections/` files and use Liquid product loops for the gallery.
  - Replace static product cards with real product listing using Shopify `collections` and `product` objects.
  - Add theme settings and localization where needed.

  Setup tip:
  - Create a manual collection in Shopify called "First Edition" and set its handle to `first-edition` so the homepage gallery automatically pulls products from that collection. If the collection is missing, the theme falls back to the static demo cards in `sections/home.liquid`.

If you want, I can:
- Copy the images into `shopify-theme/assets/` for you now.
- Replace the static product cards with a `collection` loop that pulls from a Shopify collection.
- Prepare `shopify theme push` instructions when you're ready to publish.
