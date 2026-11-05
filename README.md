# Paradise Nursery Shopping Application

**Repository name:** `e-plantShopping`  
**Project:** IBM Developing Front-End Apps with React final project  
**Author:** Kyrin Ernest

A responsive React shopping experience for the fictional online plant shop Paradise Nursery. Browse 18 unique plants across three categories, add plants to a Redux shopping cart, and manage quantities and totals.

## Features

- Landing page with a background image, company name, company introduction, and **Get Started** button.
- Shared navigation with **Home**, **Plants**, and **Cart** links and a live total-quantity badge.
- Three categories, each containing six unique plants: Everyday Greens, Aromatic Plants, and Succulents & Cacti.
- Product cards with locally bundled botanical illustrations, names, descriptions, USD unit prices, and **Add to Cart** buttons.
- Add buttons disable when a product is in the cart and become available again after removal.
- Cart rows show thumbnails, names, unit prices, quantities, and line totals.
- Increase, decrease, and delete controls update the cart total and navbar immediately. Decreasing a quantity from one removes the item.
- **Continue Shopping** links return to the product list.
- **Checkout** displays a **Coming Soon** message; no payment information is collected.
- Responsive layouts, keyboard focus styles, accessible button names, and screen-reader status messages.
- Hash navigation works on static hosting and keeps cart state when switching pages.

## Run locally

Requires Node.js 22.12+ (or Node.js 24) and npm.

```bash
npm ci
npm run dev
```

Visit the Local URL printed by Vite. The cart is in memory and resets on a full page reload.

## Validate and build

```bash
npm test
npm run build
npm run preview
```

The automated suite covers the catalogue requirements, duplicate items, quantity changes, mixed-product totals, deletion, invalid quantities, filtering, navigation, button disabling, checkout, and the empty cart. The production output is in `dist/`.

## Required submission files

| Task | File | Responsibility |
| --- | --- | --- |
| 1 | [README.md](README.md) | Project name and documentation |
| 2 | [AboutUs.jsx](src/AboutUs.jsx) | Company information |
| 3 | [App.css](src/App.css) | Landing background image and responsive styling |
| 4 | [App.jsx](src/App.jsx) | Landing page, company name, Get Started, navigation and page switching |
| 5 | [CartSlice.jsx](src/CartSlice.jsx) | `addItem`, `removeItem`, `updateQuantity`, and cart selectors |
| 6 | [ProductList.jsx](src/ProductList.jsx) | Grouped plant cards, add buttons and category filtering |
| 7 | [CartItem.jsx](src/CartItem.jsx) | Cart page, quantities, prices, deletion, checkout and continue shopping |

`App.jsx` composes `Navbar.jsx` around both `ProductList.jsx` and `CartItem.jsx`, so the same navigation and Redux item count appear on both pages.

## Publish to GitHub and GitHub Pages

1. Create a **public** GitHub repository named **`e-plantShopping`** with default branch `main`.
2. Upload this project's contents to the repository root. Include `src`, `public`, `tests`, `scripts`, `.github`, `package.json`, `package-lock.json`, `vite.config.js`, `index.html`, and this README. Do not upload `node_modules`.
3. In **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
4. Open **Actions → Test and deploy Paradise Nursery → Run workflow**. The workflow also runs on pushes to `main`.
5. Wait for both jobs to succeed. Copy the actual deployment URL from the workflow's deployment result or Settings → Pages, and verify it opens publicly.
6. For AI grading, open each required file on GitHub and copy its public URL. Submit file URLs, rather than the repository root URL or an archive download link.

If using Git from an existing local copy after creating the empty repository:

```bash
git init -b main
git add .
git commit -m "Build Paradise Nursery shopping application"
git remote add origin https://github.com/YOUR_USERNAME/e-plantShopping.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username. The relative Vite base and hash routes support GitHub project Pages without a custom 404 fallback.

## Technologies and assets

React, React DOM, React Redux, Redux Toolkit, Vite, Vitest, Testing Library and CSS. `package-lock.json` records the installed versions. The project uses original, locally bundled SVG botanical illustrations; there are no third-party image requests or font dependencies. Artwork can be regenerated with `python3 scripts/create-artwork.py`.

Prices and shop content are fictional. This is a coursework demonstration with no checkout, payment processing, account system, or inventory service.
