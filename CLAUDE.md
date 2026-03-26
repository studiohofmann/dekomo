# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (runs Sanity typegen first)
npm run build        # Production build (runs Sanity typegen first)
npm run lint         # Run ESLint
npm run typegen      # Regenerate Sanity types from schema (run after schema changes)
```

The `typegen` script extracts the Sanity schema to `sanity/extract.json` and generates TypeScript types into `sanity/types.ts`. Always run this after modifying any Sanity schema type.

## Architecture

**Next.js 15 App Router + Sanity CMS content site** for a German competence development project (DEKOMO).

### Routing

All public pages live under `app/(site)/` with a shared layout. The Sanity Studio is mounted at `/studio` via `app/studio/[[...tool]]/`.

| Route | Page |
|-------|------|
| `/` | Homepage (10+ CMS-driven sections) |
| `/kontakt` | Contact page with form |
| `/downloads` | Downloads/resources |
| `/impressum` | Legal pages |
| `/studio` | Sanity CMS admin |
| `POST /api/send-email` | Contact form → Nodemailer |
| `POST /api/search` | Search endpoint |

### Data Layer (Sanity)

- GROQ queries are defined in `sanity/lib/queries.ts` and imported into page components
- Pages fetch data with `sanityFetch()` — a wrapper around the Sanity client with tag-based revalidation
- Types are auto-generated in `sanity/types.ts` (do not edit by hand)
- Schema types are organized by page section under `sanity/schemaTypes/`

**Home page sections** each have a corresponding Sanity schema type and a React component under `app/(site)/components/home/`.

### Component Organization

- `app/(site)/components/` — page-specific components (home/, kontakt/, footer/)
- `components/ui/` — shadcn/ui primitives (Button, Checkbox, Tabs)
- SVG files are imported directly as React components via `@svgr/webpack`

### Styling

Tailwind CSS v4 with shadcn/ui (New York style). Styled-components v6 is also used in some components. Path alias `@/*` maps to the project root.

### Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION   # optional, defaults to 2025-05-30
NEXT_PUBLIC_UMAMI_WEBSITE_ID     # analytics
```

Nodemailer SMTP credentials are required for the `/api/send-email` route (server-side only).
