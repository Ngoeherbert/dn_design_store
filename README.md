# DN Design Store

A full-featured e-commerce platform built with Next.js 15, TypeScript, Tailwind CSS v4, and a modern stack designed for performance, scalability, and a great shopping experience.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Replit built-in) |
| ORM | Drizzle ORM |
| Auth | Better Auth (email/password + Google OAuth) |
| State | Zustand with persistence |
| Animations | Framer Motion |
| Charts | Recharts |
| AI | OpenAI (product description generation) |
| Toasts | Sonner |
| Icons | Lucide React |

---

## Features

### Storefront
- Animated hero section with announcement bar and promo codes
- Browse by category grid with smooth scroll anchor from navbar
- Featured products with badges (sale, trending), wishlist and quick-add
- Product detail page with image gallery, quantity picker, star ratings
- Full-text search with modal overlay
- Responsive sidebar filters on shop page (category, sort, search)
- Deals page showing discounted products

### Checkout via Social Messaging
No payment gateway required. Customers place orders through:
- WhatsApp
- Telegram
- Instagram
- Facebook Messenger

### Cart
- Persistent cart with Zustand
- Promo code support with configurable discount percentage
- Order summary sent to chosen messaging platform

### Authentication
- Email and password sign-in / registration with password strength indicator
- Google OAuth
- Role-based redirect on login — admins go to `/admin`, customers go to `/`
- Protected admin routes via Next.js middleware + client-side guard

### Account Dashboard
- Profile editor
- Order history
- Address book
- Security settings

### Admin Panel (`/admin`)
- **Dashboard** — revenue, orders, and visitor stats with area, bar, and pie charts
- **Products** — full CRUD with image drag-and-drop upload and AI-powered description generator
- **Orders** — status management (pending → processing → shipped → delivered)
- **Users** — table with role badges
- **Analytics** — 12-month trends and channel breakdown
- **Settings** — store name, primary color picker, logo upload, announcement bar, messaging contact numbers

### Navigation
- Breadcrumbs on every page with animated transitions
- Sticky navbar with scroll shadow
- Mobile-friendly hamburger menu

---

## Project Structure

```
artifacts/
  shopstore/          # Main Next.js application
    src/
      app/            # App Router pages and API routes
      components/     # UI, layout, home, product, cart, admin, auth components
      lib/            # Database, auth, utils
      store/          # Zustand stores (cart, site, wishlist)
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm
- PostgreSQL database (or use Replit's built-in DB)

### Installation

```bash
pnpm install
```

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Random secret for session signing |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID (optional) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret (optional) |
| `OPENAI_API_KEY` | OpenAI key for AI product descriptions (optional) |

### Database Setup

```bash
pnpm --filter @workspace/shopstore db:push
```

### Development

```bash
pnpm --filter @workspace/shopstore dev
```

The app runs on the port defined by the `PORT` environment variable (default `3000`).

---

## Admin Access

The admin panel is at `/admin`. Access is protected at two levels:

1. **Middleware** — server-side session check on every `/admin/*` request
2. **Client guard** — role verification before rendering any admin UI

To create an admin user, set the `role` field to `"admin"` directly in the `user` table, or use Better Auth's admin plugin API.

---

## AI Description Generator

In the admin Products panel, click **Generate with AI** to produce a product description automatically. Requires `OPENAI_API_KEY`. Falls back to a template description when the key is not set.

---

## Deployment

This project is configured for deployment on Replit. Click **Deploy** in the Replit workspace to publish to a `.replit.app` domain.

For custom domains, configure them in the Replit deployment settings.

---

## Branch Structure

| Branch | Purpose |
|---|---|
| `main` | Stable production-ready code |
| `feature/breadcrumbs-admin-security` | Breadcrumb navigation + admin security hardening |

---

## License

MIT
