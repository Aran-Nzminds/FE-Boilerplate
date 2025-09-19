# TDSG-Frontend

Frontend boilerplate built with **React + TypeScript + Vite**.
Includes **ESLint, Prettier, Husky, lint-staged, Vitest, React Query, TailwindCSS**, and other tooling to provide a consistent developer experience.

---

## Table of Contents

- [Requirements](#requirements)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Code Quality](#code-quality)
- [Commit Conventions](#commit-conventions)
- [CI / Recommendations](#ci--recommendations)
- [Contributing](#contributing)

---

## Requirements

- Node.js (LTS recommended ^21)
- npm

---

## Tech Stack

This project is built with a modern frontend stack:

- **Framework & Language**
  - [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/) — fast build tool & dev server

- **Styling**
  - [TailwindCSS](https://tailwindcss.com/) — utility-first CSS
  - PostCSS & Autoprefixer (via Tailwind)

- **State & Data**
  - [React Query](https://tanstack.com/query/latest) — data fetching & caching
  - React Hooks & Context API

- **Testing**
  - [Vitest](https://vitest.dev/) — unit & integration tests
  - [Testing Library](https://testing-library.com/) — React component testing

- **Code Quality**
  - [ESLint](https://eslint.org/) — linting
  - [Prettier](https://prettier.io/) — code formatting
  - [lint-staged](https://github.com/okonet/lint-staged) — run linters on staged files
  - [commitlint](https://commitlint.js.org/) — enforce Conventional Commits

- **Git Hooks / Workflow**
  - [Husky](https://typicode.github.io/husky/) — Git hooks
  - Pre-commit checks (lint, format, tests)

- **Build / CI**
  - TypeScript compiler (`tsc`)
  - Vite production builds
  - Configurable scripts for local and CI builds

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Aran-Nzminds/TDSG-Frontend.git
cd TDSG-Frontend
npm install
```

---

## Available Scripts

### Development

- `npm run dev` — Start Vite dev server

### Build

- `npm run build` — Run TypeScript build (`tsc -b`) and Vite production build
- `npm run build:local` — Run TypeScript build and create a local Vite build output in the `build/` directory
- `npm run build:ci` — CI-friendly build command, runs the default `npm run build`

### Preview

- `npm run preview` — Preview production build locally

### Type Checking

- `npm run typecheck` — Run TypeScript type checks only

### Tests

- `npm run test` — Run tests (Vitest)
- `npm run test:watch` — Run tests in watch mode
- `npm run test:coverage` — Generate test coverage

### Linting

- `npm run lint` — Run ESLint
- `npm run lint:fix` — Fix lint issues

### Formatting

- `npm run format` — Run Prettier format
- `npm run format:check` — Check formatting

### Git Hooks

- `npm run prepare` — Install Husky (git hooks)

---

## Project Structure

This section reflects the repository layout as seen on GitHub (snapshot):

```
.
├── .husky/
├── public/
├── src/
│   ├── assets/
│   ├── components/
|   ├── config/
|   ├── constants/
│   ├── hooks/
|   ├── interface/
|   ├── layout/
│   ├── pages/
|   ├── routes/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── main.tsx
│   └── App.tsx
├── .env
├── .gitignore
├── .prettierrc
├── README.md
├── commitlint.config.js
├── components.json
├── eslint.config.mjs
├── index.html
├── package-lock.json
├── package.json
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Environment Variables

Copy `.env` and set your environment variables:

```bash
cp .env .env.local
```

Common variables:

```env
VITE_API_URL=https://api.example.com
VITE_AUTH_TOKEN=your-token
```

---

## Code Quality

- ESLint + Prettier configured (see `eslint.config.mjs` and `.prettierrc`)
- Husky + lint-staged for pre-commit checks
- commitlint for Conventional Commits (`commitlint.config.js`)

---

## Commit Conventions

Use Conventional Commits:

```
<type>(scope?): short description
```

Examples: `feat(auth): add SSO`, `fix(ui): button alignment`.

---

## CI / Recommendations

- Use `npm ci` in CI pipelines
- Run `npm run lint`, `npm run test`, and `npm run build`
- Cache `node_modules` and `.vite`

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Follow lint/format rules
4. Use Conventional Commits
5. Open a PR

---
