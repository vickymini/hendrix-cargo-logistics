# Hendrix Cargo & Logistics — Enterprise Freight & Shipment Management System

> **"Moving Your World, One Shipment at a Time."**  
> Reliable cargo, freight, and logistics solutions connecting businesses and individuals across the globe.

A full-stack, production-ready international logistics platform and shipment management system featuring real-time database-backed cargo tracking, multi-status progression, secure administrator operations with audit logging, and Render cloud deployment readiness.

---

## 🌟 Key Features

### 1. Brand & Public Portal
- **Brand Palette**: Deep Navy (`#0B192C`), Regal Gold (`#D4AF37`), Pure White, and Slate.
- **Header & Navigation**: Sticky header with 24/7 dispatch status indicator, navigation, quick tracking, and mobile drawer.
- **Hero Section**: Official headline and supporting text with live tracking input and quick test shipment pills.
- **8 Core Services**:
  1. Air Freight
  2. Sea Freight
  3. Road Transportation
  4. International Shipping
  5. Import and Export Logistics
  6. Warehousing
  7. Door-to-Door Delivery
  8. Business Logistics Solutions
- **How It Works**: 4-step transparent freight progression (Book & Quote → Secure Collection → Global Transit → Verified Handover).
- **Interactive FAQs & About**: Company mission, operational standards, and customer data privacy guarantees.
- **Configurable Contact Support**: Validated form with real database storage (`/api/contact`) and feedback alerts.

### 2. Real Database-Backed Shipment Tracking
- **Format**: Cryptographically unique `HCL-2026-XXXXXXXX` format (collision checked against database).
- **13 Official Tracking Statuses**:
  1. Shipment Created
  2. Processing
  3. Picked Up
  4. In Transit
  5. Arrived at Facility
  6. Customs Clearance
  7. Out for Delivery
  8. Delivered
  9. Delivery Attempted
  10. On Hold
  11. Delayed
  12. Returned to Sender
  13. Cancelled
- **Data Protection & Sanitization**: Public tracking (`GET /api/track/:number`) shields private street addresses, sender telephone/emails, and internal staff notes while exposing origin/destination cities, shipping method, estimated delivery dates, and chronological checkpoint timelines.
- **Printable Receipts**: Instant client-side print layout for cargo manifests.

### 3. Administrator Portal (`/admin`)
- **Secure Authentication**: Password hashing with `bcryptjs` (salt 12), rate-limited login endpoints, session tokens, and protected API routes (`requireAdminAuth`).
- **Dashboard Metrics**: Live count of total consignments, active in transit, delivered, exceptions/holds, and unread customer inquiries.
- **Shipment Management**: Search by tracking code or city, filter by status, pagination, edit details, update status, and manage estimated delivery dates.
- **Milestone Checkpoints**: Log transit events with location, timestamp, and public description.
- **Administrative Audit Trail**: Every action (create, update, checkpoint, login) is recorded with timestamp, staff name, and client IP.
- **Customer Inquiries Desk**: View and update incoming inquiries from the contact form.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React, React Router 6 |
| **Backend** | Node.js, Express, TypeScript, Zod, Helmet, CORS, Express Rate Limit, Cookie Parser, JsonWebToken, Bcrypt |
| **Database** | PostgreSQL, Prisma ORM 5 |
| **Testing** | Vitest, Supertest |
| **Deployment** | Render (Blueprint `render.yaml` with Managed PostgreSQL + Web Service) |

---

## 📂 Project Structure

```
Hendrix_Cargo_Logistics_Website/
├── client/                     # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Footer, StatusBadge, CheckpointTimeline, AdminLayout, etc.
│   │   ├── context/            # AuthContext (JWT/session management)
│   │   ├── pages/              # Home, Tracking, Services, About, Contact, Admin pages, NotFound
│   │   ├── services/           # API client (tracking, contact, admin endpoints)
│   │   ├── types/              # TypeScript interfaces
│   │   ├── App.tsx             # Routing & layout wrapper
│   │   ├── main.tsx            # DOM mount
│   │   └── index.css           # Tailwind styles & brand utilities
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── server/                     # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── config/             # Environment & Prisma client setup
│   │   ├── controllers/        # Tracking, Admin, Shipments, Contact, Stats, Audit
│   │   ├── middleware/         # Auth guard, rate limiters, validation, error handler
│   │   ├── routes/             # /api/track, /api/admin/*, /api/contact, /health
│   │   ├── services/           # Tracking generator, audit logger, auth service
│   │   ├── validations/        # Strict Zod schemas
│   │   ├── scripts/            # seedAdmin.ts, seedDemoShipments.ts
│   │   ├── app.ts              # Express application & SPA serving
│   │   └── server.ts           # Server bootstrap
│   ├── prisma/
│   │   ├── schema.prisma       # PostgreSQL Prisma schema
│   │   ├── schema.sqlite.prisma# SQLite Prisma schema for zero-setup local dev/tests
│   │   └── migrations/         # PostgreSQL migration files
│   ├── tests/                  # Automated Vitest / Supertest suite
│   ├── package.json
│   └── tsconfig.json
├── package.json                # Monorepo root scripts
├── render.yaml                 # Render Blueprint configuration
├── .env.example                # Environment variables template
├── .gitignore
└── README.md
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### 2. Install Dependencies
```bash
# From workspace root
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Key configuration parameters:
- `PORT`: HTTP port (defaults to `5000`)
- `DATABASE_URL`: PostgreSQL connection string (or SQLite connection string for offline testing)
- `JWT_SECRET`: Secret key for administrator session signing

### 4. Database Setup & Migrations
For PostgreSQL:
```bash
npm run prisma:generate
npm run prisma:push
```
Or for zero-setup local preview with SQLite:
```bash
npm run prisma:push --prefix server -- --schema=prisma/schema.sqlite.prisma
```

### 5. Seed Administrator & Demo Consignments
Create your first administrator securely (no hardcoded passwords):
```bash
npm run seed:admin
# Output:
# Username: admin
# Email:    admin@hendrixcargo.com
# Password: HendrixAdmin2026! (or pass custom args: tsx seedAdmin.ts [user] [email] [pass])
```

Populate realistic demo consignments across Air, Sea, and Road:
```bash
npm run seed:demo
# Seeds:
# 1) HCL-2026-LON88942 - Customs Clearance (London -> New York, Air Freight)
# 2) HCL-2026-SIN44120 - Delivered (Singapore -> Rotterdam, Sea Freight)
# 3) HCL-2026-BER77315 - On Hold (Berlin -> Milan, Road Transportation)
```

### 6. Run the Application
To run both backend API and frontend Vite server concurrently in development:
```bash
npm run dev
```
Or build and run the full-stack production server on `http://localhost:5000`:
```bash
npm run build
npm run start
```

### 7. Run Automated Tests
Execute the automated test suite verifying tracking code format, Zod validation, auth cryptography, and protected routes:
```bash
npm test
```

---

## 🌐 Navigating the Application

| URL | Description |
|---|---|
| `http://localhost:5000/` | Public Homepage (Headline, Tracking Box, Services, About, FAQs) |
| `http://localhost:5000/track` | Public Shipment Tracking Search |
| `http://localhost:5000/track/HCL-2026-LON88942` | Live tracking results for demo Air Freight shipment |
| `http://localhost:5000/services` | Complete details on all 8 core freight services |
| `http://localhost:5000/contact` | Customer inquiries form with live database submission |
| `http://localhost:5000/admin` | Protected Administrator Dashboard & Dispatch Operations |
| `http://localhost:5000/admin/login` | Administrator sign-in portal |
| `http://localhost:5000/health` | System health check (`{"status": "ok"}`) |

---

## ☁️ Deployment on Render

This project is fully configured for Render using either the **Render Blueprint (`render.yaml`)** or manual Web Service setup.

### Option A: 1-Click Render Blueprint (Recommended)
1. Push this repository to your GitHub account.
2. In the [Render Dashboard](https://dashboard.render.com), click **New** → **Blueprint**.
3. Select your repository.
4. Render will parse `render.yaml` and automatically provision:
   - A **Render Managed PostgreSQL Database** (`hendrix-cargo-db`).
   - A **Node.js Web Service** (`hendrix-cargo-web`).
   - Automatically inject the database connection string into `DATABASE_URL`.
   - Run `npm install && npm run build`.
   - Run database migrations and start the server using `npm run start`.

### Option B: Manual Web Service Setup
1. Create a **PostgreSQL** database on Render:
   - Name: `hendrix-cargo-db`
   - Copy the **Internal Database URL**.
2. Create a **Web Service** on Render:
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run prisma:migrate && npm run start`
   - Add Environment Variables:
     - `NODE_ENV`: `production`
     - `DATABASE_URL`: *(paste the Internal Database URL from step 1)*
     - `JWT_SECRET`: *(generate a random 64-char hex string)*
     - `SESSION_SECRET`: *(generate a random 64-char hex string)*
     - `INITIAL_ADMIN_EMAIL`: `admin@hendrixcargo.com`
     - `INITIAL_ADMIN_PASSWORD`: *(your secure custom password)*
3. Seed the initial administrator using Render's Shell tab:
   ```bash
   npm run seed:admin
   ```
4. Verify your live site at your assigned Render URL (e.g. `https://hendrix-cargo-web.onrender.com/health`).

---

## 🔒 Security Practices
- **Never Hardcode Secrets**: Production passwords and keys are strictly read from environment variables.
- **Privacy Masking**: Full sender/recipient telephone, email, and internal staff notes are never exposed on public tracking lookups.
- **Brute-Force Protection**: Rate limiting enabled on login, tracking lookups, and contact form submissions.
- **Security Headers**: `helmet` and custom `cors` configuration protecting API endpoints.
