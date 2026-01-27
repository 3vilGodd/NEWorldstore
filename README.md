# NEWorld eStore — Production-ready mobile protection marketplace

Modern eCommerce built with **Next.js 14 App Router**, **TypeScript**, **Tailwind 4**, **Prisma + PostgreSQL**, **NextAuth (Email + Google)**, and **Razorpay + Stripe** checkout hooks.

## Quick start

```bash
npm install
npm run dev
# visit http://localhost:3000
```

## Environment

Create a `.env` with:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/neworld_estore"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-in-production"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
EMAIL_SERVER="smtp://user:pass@mailtrap.io:2525"
EMAIL_FROM="login@neworld.store"
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
STRIPE_SECRET_KEY=""
```

## Database & seed

```bash
npm run db:generate   # prisma client
npm run db:migrate    # create tables
npm run db:seed       # load starter catalog/categories
```

## Scripts

- `npm run dev` – local dev server
- `npm run build && npm start` – production build/serve
- `npm run lint` / `npm run lint:fix` – linting
- `npm run db:*` – Prisma helpers

## Features

### Customer Features
- ✅ Full-screen cinematic hero (video, parallax, Framer Motion, glassmorphism)
- ✅ Dynamic category routes with circular "shop by" grid
- ✅ Product detail pages with gallery, compatibility chips, offers, pricing badges
- ✅ **Shopping Cart** - Add/remove items, update quantities, view totals
- ✅ **Wishlist** - Save favorite products for later
- ✅ **Checkout Flow** - Address form, payment method selection (Razorpay/Stripe)
- ✅ **User Authentication** - Email & Google OAuth sign-in
- ✅ **User Profile** - Orders history, addresses management
- ✅ **Order Tracking** - Real-time order status and timeline
- ✅ Search with URL params, autocomplete suggestions
- ✅ Responsive, mobile-first design
- ✅ Dark/light theme toggle
- ✅ Micro-interactions and smooth animations

### Admin Features
- ✅ **Products Management** - View, edit, delete products
- ✅ **Categories Management** - Manage categories and subcategories
- ✅ **Orders Dashboard** - Track and manage customer orders
- ✅ **Inventory Management** - Stock monitoring, low stock alerts
- ✅ **Coupons Management** - Create and manage promotional codes

### Technical
- ✅ API routes: Cart, Wishlist, Checkout (Razorpay/Stripe), Orders, Products, NextAuth
- ✅ Prisma schema: Users, Products, Orders, Cart, Wishlist, Addresses, Coupons
- ✅ Database integration ready (replace mock data with Prisma queries)
- ✅ Session management with NextAuth
- ✅ Type-safe with TypeScript

## Deployment

- Ready for Vercel (Next/Image remote patterns set for Unsplash/avatars/coverr)
- Payments keys pulled from environment; configure allowed webhook URLs per provider
- Update `metadata` in `src/app/layout.tsx` if domain changes
