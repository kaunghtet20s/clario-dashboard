# Clario — Modern SaaS Analytics Dashboard

A clean, modern, minimalist SaaS analytics dashboard built with **React + Vite**, **Tailwind CSS**, **Framer Motion**, and **Recharts**. It ships with a light/dark theme, animated KPI cards, interactive charts, a sortable projects table, a drag‑and‑drop Kanban board, customer management, messaging, a calendar, a billing/pricing page, and full authentication UI.

![Clario](public/favicon.svg)

## ✨ Features

- **Collapsible sidebar** with active highlight + smooth spring animation, plus a slide‑in mobile drawer.
- **Top navbar** — global search, notification panel, dark/light toggle, profile dropdown, mobile menu.
- **Dashboard overview** — KPI cards with animated counters, sparklines, and hover‑lift.
- **Interactive charts** (Recharts) — revenue line, user‑growth bars, sales pie, performance area, all with custom tooltips and reveal animations.
- **Recent activity feed** with staggered reveal and status badges.
- **Projects table** — live search, status filter, sort by due date / budget / progress, animated progress bars, row action menus.
- **Customer management** — filter tabs (All / Active / Trial / Churned), animated card grid, live search.
- **Kanban board** — native drag‑and‑drop across To Do → In Progress → Review → Completed with layout animations.
- **Messages** — conversation list + chat thread.
- **Calendar** — month grid with events and navigation.
- **Billing & plans** — monthly/yearly pricing cards, usage summary, invoice history.
- **Settings modal** — theme, notification & account preferences, save → success toast.
- **Auth pages** — Login, Register (with password‑strength meter), Forgot Password.
- **Toast system**, **fully responsive** (desktop / tablet / mobile), **dark mode** persisted to `localStorage`.

## 🧱 Tech Stack

| Purpose      | Library                |
| ------------ | ---------------------- |
| Framework    | React 18 + Vite 5      |
| Styling      | Tailwind CSS 3         |
| Animation    | Framer Motion 11       |
| Charts       | Recharts 2             |
| Icons        | lucide-react           |
| Routing      | react-router-dom 6     |

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** and npm

### Install

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Then open the printed URL (default **http://localhost:5173**).

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## 🗺️ Routes

| Path               | Page                         |
| ------------------ | ---------------------------- |
| `/`                | Dashboard app (all sections) |
| `/login`           | Sign in                      |
| `/register`        | Create account               |
| `/forgot-password` | Reset password               |

> **Auth is gated.** `/` is a protected route — visiting it while signed out redirects to `/login` (remembering where you were headed). The login form is pre‑filled, so just click **Sign in** to enter. Signed‑in users are redirected away from the auth pages.

## 🔐 Authentication (API-backed)

Auth talks to a real HTTP API over `fetch` — there are **no fake `setTimeout` shortcuts**. A token-issuing **mock backend** ships with the app so it works out of the box.

**Endpoints** (served by [`mock/auth-plugin.js`](mock/auth-plugin.js) during `dev` & `preview`):

| Method & path              | Purpose                                         |
| -------------------------- | ----------------------------------------------- |
| `POST /api/auth/login`     | Validate credentials → `{ token, user }`        |
| `POST /api/auth/register`  | Create account → `{ token, user }`              |
| `POST /api/auth/forgot-password` | Request a reset link                      |
| `GET  /api/auth/me`        | Restore session from the `Bearer` token         |
| `POST /api/auth/logout`    | Invalidate the session                          |

**Flow**
1. `login()` / `register()` POST to the API; the returned **JWT‑shaped token** is stored in `localStorage` (`clario-token`).
2. Every request adds an `Authorization: Bearer <token>` header (see [`src/api/client.js`](src/api/client.js)).
3. On page load, `AuthProvider` calls `GET /api/auth/me` to **restore the session** (showing a loading splash); an invalid/expired token is dropped.
4. Failed calls surface a real error message (e.g. _“Invalid email or password.”_) in the form.

**Demo credentials:** `alex@clario.io` / `password` (or register a new account).

**Swapping in a real backend:** remove `mockAuthApi()` from [`vite.config.js`](vite.config.js) and set `VITE_API_URL` (see [`.env.example`](.env.example)) to your server's origin. The frontend hits the same endpoint paths — no other changes needed.

## 📁 Project Structure

```
src/
  api/               # fetch client + auth API (login, register, me, logout)
  components/        # Reusable UI (Sidebar, Topbar, StatCard, charts, tables, etc.)
  views/             # Page sections (Dashboard, Analytics, Projects, Customers, …)
  pages/             # Route pages (DashboardApp shell + auth pages)
  data/              # Sample SaaS data (stats, projects, customers, tasks, plans …)
  context/           # ThemeProvider (dark/light) + AuthProvider (session)
  lib/               # utils + hooks (cn, formatters, useClickOutside)
  App.jsx            # Routes + Auth/Toast providers + route guards
  main.jsx           # Entry (Router + ThemeProvider)
  index.css          # Tailwind layers + component classes
mock/
  auth-plugin.js     # Mock /api/auth backend (Vite plugin) — delete for a real API
```

## 🎨 Customization

- **Colors / shadows / radii** live in `tailwind.config.js` (`brand` + `ink` palettes).
- **Sample data** is isolated in `src/data/*` — swap it for your API.
- **Theme** defaults to the OS preference and is remembered in `localStorage`.

---

© Clario, Inc. · v1.0.0
