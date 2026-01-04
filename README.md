# E-commerce Frontend (React + TypeScript + Vite)

This repository is a small example e-commerce frontend built with Vite, React and TypeScript. It demonstrates a simple product listing, category filtering and a minimal shopping cart to illustrate component structure and basic state interactions.

Project goals: provide a compact, runnable frontend sample for learning component composition, state management, and simple API integration.

## Key features
- Product listing using local sample data ([src/data/products.ts](src/data/products.ts))
- Category filtering (`CategoryFilter`)
- Product card component (`ProductCard`)
- Simple shopping cart (`Cart`)
- Example login form (`Login`)

## Tech stack
- Framework: React
- Language: TypeScript
- Dev/build: Vite
- Styling: plain CSS (global styles in `src`)

## Quick start

Prerequisites: Node.js (recommended 16+) and npm or yarn.

Install dependencies:

```bash
npm install
# or
yarn
```

Start development server:

```bash
npm run dev
# or
yarn dev
```

Build for production:

```bash
npm run build
# or
yarn build
```

Preview production build locally:

```bash
npm run preview
# or
yarn preview
```

Available scripts
- `dev`: start Vite dev server
- `build`: create production build
- `preview`: preview the built output

Check `package.json` for any additional scripts such as linting or formatting.

## Project structure (short)

- `index.html` — app entry HTML
- `src/main.tsx` — React bootstrap
- `src/App.tsx` — root application component
- `src/components/` — reusable UI components
  - [src/components/Header.tsx](src/components/Header.tsx) — header and cart trigger
  - [src/components/ProductCard.tsx](src/components/ProductCard.tsx) — product display card
  - [src/components/Cart.tsx](src/components/Cart.tsx) — shopping cart UI and interactions
  - [src/components/CategoryFilter.tsx](src/components/CategoryFilter.tsx) — category filter
  - [src/components/Login.tsx](src/components/Login.tsx) — example login form
- `src/data/` — local sample data (`products.ts`, `categories.ts`)
- `src/contexts/` — React Contexts (if present)
- `src/utils/api.ts` — small API helper used in examples

Main files reference
- [src/components/Header.tsx](src/components/Header.tsx)
- [src/components/ProductCard.tsx](src/components/ProductCard.tsx)
- [src/data/products.ts](src/data/products.ts)

Development notes
- To connect a real backend, replace the sample data import and update `src/utils/api.ts` as needed.
- Possible enhancements: localStorage persistence for cart, checkout flow, product detail pages, pagination and tests.

Contributing & license
- Contributions are welcome — consider opening an issue to discuss larger changes first.
- This project does not include an explicit license file; treat it as a learning/example project.
