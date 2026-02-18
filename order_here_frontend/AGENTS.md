# Repository Guidelines

## Project Structure & Module Organization
- `app/`: App Router pages and layouts (e.g., `app/page.tsx`, `app/layout.tsx`). Co‑locate feature UI under `app/(feature)/` as needed.
- `public/`: Static assets served at `/` (e.g., logos, icons).
- `app/globals.css`: Global styles; prefer Tailwind utility classes in components.
- Config: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`.
- Build output: `.next/` (ignored), do not edit.

## Build, Test, and Development Commands
- `npm run dev` — Start local dev server at `http://localhost:3000` with HMR.
- `npm run build` — Create production build (`.next/`).
- `npm start` — Serve the production build.
- `npm run lint` — Run ESLint (Next.js core‑web‑vitals rules).

## Coding Style & Naming Conventions
- Language: TypeScript + React (functional components) on Next.js App Router.
- Components: PascalCase files (e.g., `StaffCard.tsx`); route segments lower‑case (`app/staff/page.tsx`).
- Indentation: 2 spaces; keep lines < 100 chars.
- Prefer Server Components by default; add `"use client"` only when required.
- Styling: Tailwind CSS 4 via `@tailwindcss/postcss`; compose utilities, avoid deep custom CSS.
- Linting: Fix warnings before commit (`npm run lint -- --fix`).

## Testing Guidelines
- No test harness is set up yet. When adding logic or components, include tests.
- Recommend: React Testing Library + Vitest/Jest for unit tests; Playwright for e2e.
- Naming: colocate as `*.test.ts(x)` next to the file (e.g., `StaffCard.test.tsx`).
- Aim for meaningful coverage on new/changed code paths.

## Commit & Pull Request Guidelines
- Commits: Imperative, concise subject; include rationale in body when helpful.
  - Example: `feat(staff): add staff listing route`.
- PRs: Clear description, linked issues, screenshots/GIFs for UI, and steps to verify.
- Before opening: run `npm run lint` and `npm run build` locally; ensure no type errors.

## Security & Configuration Tips
- Secrets: Use `.env.local` (git‑ignored). Example:
  - `NEXT_PUBLIC_API_BASE=https://api.example.com`
- Never commit credentials or production URLs hard‑coded in source.

## Agent‑Specific Notes
- Scope: These guidelines apply to the entire repo.
- Keep changes minimal and idiomatic to Next.js App Router; do not reformat unrelated files.
- If you change scripts, update this file and `README.md` accordingly.
