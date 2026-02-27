# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Employee Directory — a React 19 + TypeScript web app built with Vite. Currently in early scaffold stage with libraries installed but most features not yet implemented.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run mock` — Start json-server mock API on port 3001 (serves `db.json`)
- `npm run build` — TypeScript compile + Vite production build (`tsc -b && vite build`)
- `npm run lint` — ESLint across all `.ts`/`.tsx` files
- `npm run preview` — Preview production build

No test runner is configured yet.

## Architecture

**Stack:** React 19, TypeScript (strict), Vite 7, Tailwind CSS v4, Redux Toolkit, React Hook Form + Zod validation, TanStack React Table, json-server for mock API.

**Entry point:** `src/main.tsx` wraps `<App />` in Redux `<Provider>`.

**Key directories:**

- `src/store/` — Redux store (`store.ts` exports `RootState` and `AppDispatch` types; reducers currently empty)
- `src/features/` — Feature modules (empty, planned)
- `src/shared/components/` — Shared components (empty, planned)

**Mock data:** `db.json` at project root has `employees` (10 records) and `departments` (6 records) tables served by json-server on port 3001.

## Code Style

- Use comments sparingly — only comment complex or non-obvious code
- Always add proper TypeScript types for RTK Query endpoint responses

## TypeScript & Lint Config

- Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`
- ESLint v9 flat config with typescript-eslint, react-hooks, and react-refresh plugins
- No Prettier configured — no autoformatting beyond ESLint

## apsys Architecture Rules

- All features go inside `src/features/<feature-name>/`
- Each feature must have the following structure:
  - `data/` — RTK Query API slice
  - `domain/` — TypeScript interfaces and types
  - `presentation/` — React components and pages
- Never mix feature concerns — keep each feature self-contained
- Use RTK Query for ALL server state (no useEffect + fetch)
- Use React Hook Form + Zod for ALL forms
- Shared components go in `src/shared/components/`

## Mock API

- JSON Server running on `http://localhost:3001`
- Endpoints: `/employees`, `/departments`
- Use this base URL in all RTK Query API slices during development
