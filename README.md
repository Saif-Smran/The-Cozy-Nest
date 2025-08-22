<div align="center">
	<img src="./public/logo.png" alt="The Cozy Nest" width="120" />
	<h1>The Cozy Nest</h1>
	<p><strong>Modern pet product marketplace</strong> built with Next.js 15 App Router, TypeScript, Tailwind CSS (DaisyUI), NextAuth, and MongoDB.</p>
	<p>Features credential + OAuth auth, glassmorphic UI, dynamic product catalog with category & subcategory taxonomy, protected dashboard, and toast notifications.</p>
</div>

---

## 📝 Short Summary

The Cozy Nest is a full‑stack pet product marketplace prototype where users can register or sign in (credentials or OAuth), browse and filter a richly categorized catalog, and (when authorized) add new products through a protected dashboard. It showcases a modern Next.js 15 stack with clean UI, secure auth, and extensible data model ready for future e‑commerce features.

## ✨ Features

- Next.js 15 (App Router, React 19, Turbopack) – fast DX & hybrid rendering
- Authentication: Credentials (bcrypt) + Google + GitHub (NextAuth JWT sessions)
- Secure password hashing with bcrypt
- Registration & Login pages (glassmorphic styling + background hero image)
- Protected dashboard with sidebar & add‑product form
- Rich product taxonomy (category & subcategory + animal targeting)
- Product listing with search, filtering (category, subcategory, animal, tag), pagination
- MongoDB persistence via official driver (lean helper wrapper)
- Custom toast notification system (no external popup dependency)
- TypeScript throughout

## 📂 Tech Stack

| Layer        | Choice |
|--------------|--------|
| Framework    | Next.js 15 (App Router) |
| Language     | TypeScript |
| Styling      | Tailwind CSS v4 + DaisyUI |
| Auth         | NextAuth (Credentials, Google, GitHub) |
| DB           | MongoDB (official driver) |
| Deployment   | Vercel (recommended) |

## 🚀 Quick Start

1. Clone & install dependencies:
	 ```bash
	 git clone <repo-url>
	 cd The-Cozy-Nest
	 pnpm install # or npm install / yarn install
	 ```
2. Create a `.env.local` file (see Environment Variables below).
3. Run development server:
	 ```bash
	 pnpm dev
	 ```
4. Open http://localhost:3000

## 🔐 Environment Variables

Create a `.env.local` file in the project root with the following (remove providers you don't use):

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster-url/dbname
NEXTAUTH_SECRET=your-long-random-secret
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_ID=...
GITHUB_SECRET=...
```

Generate a secure NEXTAUTH_SECRET with e.g. `openssl rand -base64 32`.

## 🛠 Development Scripts

| Command        | Description |
|----------------|-------------|
| `pnpm dev`     | Start dev server (Turbopack) |
| `pnpm build`   | Production build |
| `pnpm start`   | Run built app locally |
| `pnpm lint`    | Lint source (ESLint) |

## 🧱 Project Structure (simplified)

```
src/
	app/
		api/
			auth/
				[...nextauth]/route.ts      # NextAuth handler
				register/route.ts           # Credential signup
			products/
				route.ts                    # List & create products
				[id]/route.ts               # Single product CRUD
				users/[email]/route.ts       # User lookup (by email)
		dashboard/                      # Protected dashboard pages
		login/                          # Login page
		register/                       # Registration page
		products/                       # Products listing + filters
	components/                       # Shared UI (Navbar, Footer, ToastProvider,...)
	lib/                              # DB + auth config
```

## 📡 Route Summary

### Pages
- `GET /` – Landing / hero
- `GET /about` – About page
- `GET /login` – Login (credentials + OAuth providers)
- `GET /register` – User registration
- `GET /products` – Product explorer (filterable, paginated)
- `GET /products/:id` – Product detail page (dynamic)
- `GET /dashboard` – Auth-protected overview
- `GET /dashboard/add-product` – Auth-protected product creation form

### API (App Router handlers)
| Method | Path | Description | Query Params |
|--------|------|-------------|--------------|
| POST | `/api/auth/register` | Create credential user (email + password) | — |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth (sign-in, callback, session) | Provider-specific |
| GET | `/api/products` | List products (paginated + filtered) | `page`, `limit`, `category`, `subcategory`, `animal`, `tag`, `q` |
| POST | `/api/products` | Create product | Body JSON (name, category, price, etc.) |
| GET | `/api/products/:id` | Fetch single product | — |
| PATCH | `/api/products/:id` | Partial update product | Any mutable fields |
| DELETE | `/api/products/:id` | Delete product | — |
| GET | `/api/products/users/:email` | Lookup user by email (case-insensitive) | — |

### Notes
- All product mutation endpoints assume authenticated / authorized usage (add explicit auth/role checks before production hardening).
- Passwords are stored hashed (bcrypt). Never log raw passwords.
- Some lint rules were relaxed for DX; you can re‑enable stricter rules as the codebase matures.

## 🛡 Technical Hardening (Short Term)

- Role-based authorization (admin / editor / user)
- Rate limiting & basic abuse protection
- MongoDB indexes for frequent filters & text search (compound indexes)
- Schema validation via Zod (shared client/server types)
- Centralized error response shape & logging (pino / structured logs)
- Image upload pipeline (S3 or Cloudinary + signed URLs)
- Automated tests (Jest or Vitest + Playwright) & CI workflow

## 🔮 Future Roadmap (Longer Term)

- Shopping cart & persistent sessions (guest → user merge)
- Checkout & payment integration (Stripe)
- Inventory reservation & stock decrement on order
- Order management (status workflow, cancellation, refunds)
- User profiles (addresses, preferences, avatar management)
- Product reviews & ratings with moderation queue
- Favorites / wishlist & recently viewed items
- Recommendation engine (collaborative filtering or ML model)
- Advanced search (Elastic / Typesense) with facets
- Bulk product import/export (CSV / JSON)
- Admin dashboard (analytics: sales, conversion, retention, top categories)
- Email notifications & transactional mail (Resend / Postmark)
- Internationalization (i18n) & multi-currency pricing
- Accessibility audits & improvements (WCAG AA)
- Performance: ISR / route segment caching / CDN image optimization
- Observability: tracing (OpenTelemetry) + metrics + uptime alerts
- Progressive Web App enhancements (offline catalog snapshot)
- Mobile app surface via shared API (React Native / Expo)

## 📄 License

Proprietary – all rights reserved (update if you choose an OSS license).

## 🙌 Acknowledgements

- Next.js team & Vercel ecosystem
- DaisyUI & Tailwind CSS
- MongoDB driver maintainers
- NextAuth contributors

---

Feel free to open issues or suggest improvements. Enjoy building with The Cozy Nest! 🐾
