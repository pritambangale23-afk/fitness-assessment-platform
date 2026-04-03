# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Fitness Assessment (`artifacts/fitness-assessment`)
- React + Vite + Tailwind CSS v4 + Framer Motion
- Dark green / neon lime premium fitness coaching brand
- Three screens: Landing → Assessment (12 Qs) → Results
- Results page shows section-specific action plans (expandable rule cards) for low-scoring sections
- CTA redirects to https://linktr.ee/eat_wise
- No backend — fully static, no auth

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/fitness-assessment run dev` — run fitness assessment app

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
