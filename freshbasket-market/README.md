# FreshBasket Market

An original grocery storefront built from scratch with React, Vite, Redux Toolkit, Tailwind CSS, and Lucide icons.

## Included

- Responsive desktop/tablet/mobile layout
- Original hero section and visual language
- Product catalogue with categories
- Search and filtering
- Redux Toolkit cart
- Quantity controls and item removal
- Persistent cart using localStorage
- Free-delivery threshold
- Weekly deals section
- Mobile navigation
- Demo checkout modal
- Empty states and polished micro-interactions

## Run locally

Requirements: Node.js 18+.

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
freshbasket-market/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── store.js
    ├── data/
    │   └── products.js
    └── components/
        ├── CartDrawer.jsx
        ├── CheckoutModal.jsx
        ├── Header.jsx
        └── ProductCard.jsx
```

## Notes

This is a frontend demo. The checkout form does not send payment information to a server and should not be connected to real payment processing without adding a secure backend/payment provider.
