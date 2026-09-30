# JEILEE’S Premium Fashion Storefront

A premium fashion e-commerce and editorial storefront built with Next.js, React, TypeScript, and Tailwind CSS. The project is designed to showcase a modern clothing brand with a luxury editorial look, category-based shopping, product detail pages, and a shopping bag/cart experience.

This repository is centered around the brand identity of JEILEE’S and includes a structured fashion catalog, static product content, and support for future Supabase-powered authentication and data workflows.

---

## Table of Contents

- [Overview](#overview)
- [Project Highlights](#project-highlights)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [Application Routes](#application-routes)
- [Data and Content Model](#data-and-content-model)
- [Supabase Notes](#supabase-notes)
- [Deployment](#deployment)
- [Customization Guide](#customization-guide)
- [Known Notes](#known-notes)

---

## Overview

This project is a fashion retail website for a premium clothing label. It emphasizes:

- a luxury editorial homepage
- product discovery by category and collection
- product detail views with variant and pricing information
- a cart drawer with quantity management and local persistence
- responsive mobile and desktop navigation
- polished typography and layout styling
- support for brand storytelling and landing-page sections

The app uses the Next.js App Router and is organized around route-driven pages and reusable UI building blocks.

---

## Project Highlights

- Modern storefront experience with a curated, premium aesthetic
- Dynamic product/category data centralized in one configuration file
- Product navigation built from catalog metadata
- Local cart state persisted in browser storage
- Responsive navigation with desktop dropdowns and mobile menu
- SEO metadata support per route
- Supabase client setup for future auth and data-backed features
- Vercel Analytics enabled in production

---

## Tech Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- PostCSS
- Supabase JS + Supabase SSR
- lucide-react for UI icons
- shadcn-inspired UI patterns and utilities
- Vercel Analytics

---

## Project Structure

```text
premium_fashion/
├── app/
│   ├── about/
│   ├── account/
│   ├── collections/
│   ├── contact/
│   ├── new-drop/
│   ├── sale/
│   ├── shop/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── fashion/
│   └── ui/
├── lib/
│   ├── cart-context.tsx
│   ├── fashion-data.ts
│   ├── seo.ts
│   ├── supabase/
│   └── utils.ts
├── public/
│   └── images/
├── supabase/
│   ├── README.md
│   └── schema.sql
├── AGENTS.md
├── CLAUDE.md
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── proxy.ts
├── SECURITY.md
├── tsconfig.json
└── README.md
```

---

## Features

### 1. Editorial homepage
The landing page contains a hero slideshow, editorial intros, category highlights, sale banners, and signature brand sections. It is designed as a premium retail landing page rather than a simple product list.

### 2. Product catalog
Product data is centralized in `lib/fashion-data.ts`, including:

- category definitions
- collection metadata
- hero slide content
- shop categories
- product inventory information
- helper functions to retrieve products by category or collection

### 3. Category and collection browsing
The app includes routes for:

- main shop overview
- category-specific storefront pages
- product detail pages
- collections and collection landing views

### 4. Shopping cart
A client-side cart is implemented with a reducer-based context in `lib/cart-context.tsx`. It includes:

- add to bag actions
- quantity updates
- item removal
- cart drawer display
- localStorage persistence
- toast notifications

### 5. Responsive navigation
The header includes:

- desktop navigation with dropdowns
- mobile accordion menu
- shopping bag button with item count badge
- smooth scroll and back-to-top behavior

### 6. SEO metadata
Each route uses metadata helpers and route-specific page metadata via `lib/seo.ts` and route-level exports.

### 7. Supabase integration scaffold
The project includes Supabase SSR browser client setup and server proxy configuration, which indicates readiness for auth/account flows and future DB-backed features.

---

## Prerequisites

Before running the app, make sure you have:

- Node.js 20+ recommended
- pnpm installed
- a Supabase project (optional for auth and future data features, but strongly recommended)

To check your environment:

```bash
node -v
pnpm -v
```

---

## Installation

From the project root:

```bash
pnpm install
```

If you are using npm instead of pnpm, the project should still work with equivalent commands, but the repository is configured for pnpm.

---

## Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

These values are used by the Supabase client utilities and the middleware proxy.

> Do not expose a service-role key in browser-facing variables. Keep sensitive keys in a secure environment outside the app's public runtime scope.

---

## Running the App

Start the development server:

```bash
pnpm dev
```

Then open your browser at:

```text
http://localhost:3000
```

---

## Available Scripts

From `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --webpack",
    "typecheck": "tsc --noEmit",
    "build": "next build",
    "start": "next start"
  }
}
```

### Common commands

```bash
pnpm dev
pnpm typecheck
pnpm build
pnpm start
```

---

## Application Routes

The app currently includes these route groups:

- `/` — home page with hero, editorial sections, new drops, and collection highlights
- `/shop` — shop-all landing page
- `/shop/[category]` — category pages for basics, tops, bottoms, dresses, and skirts
- `/shop/product/[slug]` — product detail pages
- `/collections` — collection overview
- `/collections/[slug]` — specific collection narrative pages
- `/new-drop` — newest releases route
- `/sale` — sale and discounted products page
- `/contact` — contact page
- `/about` — brand story page
- `/account` — account/auth page

The project already includes the route structure and reusable content components for these pages.

---

## Data and Content Model

The brand and catalog content is mainly managed in:

### `lib/fashion-data.ts`
This file is the center of the storefront content and contains:

- `shopCategories`
- `collections`
- `shopProducts`
- `navItems`
- `heroSlides`
- helper functions like:
  - `getProductsByCategory()`
  - `getCollectionProducts()`
  - `getNewDropProducts()`
  - `getSaleProducts()`
  - `getCollection()`
  - `getProduct()`

This is the main place to update product names, price strings, category groupings, collection names, and homepage slides.

### `public/images`
The site uses local image assets and remote Unsplash images for styling and product visuals. You can replace the default files in the `public/images` directories with your own content.

### `components/fashion/`
Reusable storefront blocks are organized here and include site shell, editorial sections, product cards, cart drawer, and page layout pieces.

---

## Supabase Notes

The repository includes Supabase support, especially through:

- `lib/supabase/client.ts`
- `proxy.ts`
- `supabase/schema.sql`
- `supabase/README.md`

The documentation in `supabase/README.md` explains the recommended setup steps, including:

- creating a Supabase project
- adding local environment variables
- running the SQL schema
- enabling email auth
- configuring Google OAuth
- adding redirect URLs for local development and production

This means the app is prepared for authentication, profile data, and data-backed storefront features, even though the current storefront content is primarily static and client-side.

---

## Deployment

This project is designed to work well with Vercel, especially because it uses Next.js and Vercel Analytics.

### Recommended deployment steps

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add your environment variables in the Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy the app.

For production, make sure your domain and Supabase redirect URLs are correctly configured.

---

## Customization Guide

### Change the brand identity
Edit:

- `app/layout.tsx` for metadata and seo defaults
- `lib/seo.ts` for site metadata and canonical URL values
- `components/fashion/site-shell.tsx` for navbar/footer branding and navigation labels

### Update product catalog
Edit:

- `lib/fashion-data.ts`

This is the easiest place to add or remove products, adjust pricing, and update categories.

### Replace imagery
Update files under:

- `public/images/banner/`
- `public/images/logo/`
- `public/images/products/`

### Styling
The app styling is defined in:

- `app/globals.css`
- design utility classes throughout the components

---

## Known Notes

- The current storefront is primarily a front-end experience with mock/static catalog content.
- The cart is local to the browser and stores items using `localStorage`.
- Product pricing is stored as formatted strings like `LKR 2,600.00`, which is convenient for storefront display but may require normalization if you later build checkout or inventory logic.
- Supabase is wired in for expansion, but the actual app behavior is currently oriented around UI, content marketing, and shopping experience rather than a live backend commerce pipeline.

---

## Quick Start Summary

```bash
pnpm install
cp .env.example .env.local  # if you add one for your setup
pnpm dev
```

Then visit:

```text
http://localhost:3000
```

---

## License and Ownership

This project is a branded storefront implementation and should be treated as a proprietary or client-owned codebase unless otherwise specified. Review the repository’s configuration and legal files before commercial reuse or redistribution.

---

## Final Note

This project is a strong starting point for a fashion brand storefront with a premium visual identity, product catalog structure, and expansion-ready backend hooks. It is especially suitable for brands that want a polished marketing-driven storefront with a cart and shop architecture that can evolve into a full e-commerce product over time.
