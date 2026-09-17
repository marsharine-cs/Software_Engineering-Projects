# Luma One

An interactive storefront for a fictional smart task light, with product customization, validated quantity controls, cart state, responsive navigation, and accessible feedback. Built with vanilla JavaScript, HTML, and CSS.

**[Live demo](https://luma-one-product-landing.vercel.app/)** · **[Case study](https://projectsportfolio-nine.vercel.app/case-studies/luma-one.html)**

![Luma One storefront interface](https://projectsportfolio-nine.vercel.app/assets/luma-one-project.webp)

## Tech stack

- HTML5, CSS3, JavaScript (no framework, no build step)
- Deployed on Vercel

## Features

- Three product finishes (Sand, Graphite, Sage) that update the product visual and labels
- Quantity controls limited to 1–10, with the decrease button disabled at the minimum
- Demo cart with a live item count and confirmation messages
- Mobile navigation menu that closes on link click, Escape, or resize to desktop
- FAQ accordion that keeps one answer open at a time
- Product illustration drawn entirely in HTML and CSS, with no image assets

The cart is a demonstration only: there is no checkout, payment, or data collection.

## Technical highlights

- **Central state.** A single `state` object holds the selected finish, quantity, and cart count. Event handlers update the state, then update functions (`updateQuantityDisplay`, `updateCartDisplay`) re-render the related controls, so separate parts of the interface can't drift out of sync.
- **Input boundaries.** Quantity changes are validated before they reach state. Reaching the maximum shows a message instead of silently failing, and adding to the cart resets the quantity to 1.
- **Accessible feedback.** Finish buttons expose `aria-pressed`, the menu and FAQ controls expose `aria-expanded`, and cart and selection updates are announced through `aria-live` regions.
- **CSS-only artwork.** The lamp is composed from gradients, border-radius shapes, transforms, and shadows, and its colors are driven by the selected finish.
- **Responsive and motion-aware.** CSS Grid and Flexbox layouts with `clamp()` typography, and `prefers-reduced-motion` support.

## Project structure

```text
├── index.html   # Page structure and interactive controls
├── styles.css   # Layout, CSS product illustration, states, media queries
├── script.js    # State, finish selection, quantity, cart, navigation, FAQ
└── LICENSE
```

## Run locally

This project lives on the `Product_Landing-_Page` branch of the `Software_Engineering-Projects` repository.

```bash
git clone --branch Product_Landing-_Page https://github.com/marsharine-cs/Software_Engineering-Projects.git luma-one
cd luma-one
npx http-server .
```

Then open the local URL it prints. Opening `index.html` directly in a browser also works.

## Author

Marsharine A. Simpson, Software Developer · [Portfolio](https://projectsportfolio-nine.vercel.app/) · [GitHub](https://github.com/marsharine-cs)

## License

MIT. See [LICENSE](LICENSE).
