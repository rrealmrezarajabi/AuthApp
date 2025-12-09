# Test Auth App

React + Vite demo with a simple auth flow, protected dashboard, React Query for mutations, React Hook Form for validation, and Tailwind for styling.

## Quick start

```bash
pnpm install   # or npm/yarn
pnpm dev
```

Open http://localhost:5173.

## Scripts

- `pnpm dev` – run dev server
- `pnpm build` – production build
- `pnpm preview` – preview build output
- `pnpm lint` – eslint check

## Tech stack

- React 19 + Vite
- React Router for routing & protected routes
- React Query for mutations/fetching
- React Hook Form for form handling
- Axios client with base URL (`http://localhost:3000/api`)
- Tailwind CSS (v4) for UI styling

## Auth flow (client)

1. Login/Signup pages post credentials via `authApi` (Axios).
2. On login success, access token is stored in `localStorage` and attached to Axios `Authorization` header.
3. `AuthContext` persists token on reload and exposes `login/logout` plus `isAuthenticated`.
4. `ProtectedRoute` gates the dashboard; unauthenticated users are redirected to `/login`.

## Project structure (key parts)

- `src/api/` – Axios client and auth API calls
- `src/context/AuthContext.jsx` – token state, persistence, and auth helpers
- `src/hooks/` – React Query hooks (`useLogin`, `useRegister`, `useProfile`)
- `src/pages/` – `Login`, `SignUp`, `DashBoard`
- `src/components/ProtectedRoute.jsx` – route guard
- `src/index.css` – Tailwind entrypoint

## Backend expectations

- Endpoints:
  - `POST /auth/login` → returns `{ token }`
  - `POST /auth/register` → returns `{ token }` or success
  - `GET /auth/me` → returns user profile (requires `Authorization: Bearer <token>`)
- Base URL is `http://localhost:3000/api`; adjust in `src/api/axiosClient.js` or via env (e.g., `VITE_API_URL`).


