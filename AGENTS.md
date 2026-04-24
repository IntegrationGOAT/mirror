<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Project Snapshot

- Framework: Next.js 16 (App Router) + React 19 + TypeScript (strict mode).
- Styling: Tailwind CSS v4 via `@import "tailwindcss"` in `app/globals.css`.
- UI deps: `@base-ui/react` is installed; prefer its primitives for interactive UI.

## Working Commands

- Install deps: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Production build (also validates types): `npm run build`
- Start prod server: `npm run start`

## Codebase Map

- `app/layout.tsx`: Root layout, metadata, and global font variables.
- `app/page.tsx`: Home route (`/`).
- `app/globals.css`: Global styles, Tailwind import, and theme variables.
- `eslint.config.mjs`: Next Core Web Vitals + TypeScript lint config.
- `tsconfig.json`: Strict TS and `@/*` path alias to project root.

## Agent Conventions

- Keep route components and layouts as default exports in App Router style.
- Prefer TypeScript-first React components (`.tsx`) and keep strict typing intact.
- Prefer imports through `@/` alias over deep relative paths where practical.
- When editing UI, update `app/globals.css` tokens/classes consistently with existing variables.
- Validate significant changes with `npm run lint` and `npm run build` before handoff.

## Docs To Reference

- Project quickstart and deploy notes: `README.md`
