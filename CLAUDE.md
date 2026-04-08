# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lumon OS is a web-based operating system simulation inspired by the TV show "Severance" on AppleTV+. Built with Next.js 15.2, React 19, and TypeScript, it provides an immersive terminal-based interface with a boot sequence.

## Development Commands

```bash
# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture

### Application Flow

The application implements a specific navigation flow:

1. **Root (`/`)** → Auto-redirects to `/boot`
   - Handled by both server-side redirect in `src/app/layout.tsx:26-28` and client-side redirect in `src/app/page.tsx:8-10`

2. **Boot Screen (`/boot`)** → Auto-redirects to `/terminal` after 3 seconds
   - Simulates OS boot time with `setTimeout` in `src/app/boot/page.tsx:9-12`

3. **Terminal (`/terminal`)** → Command entry point
   - Maps text commands to application routes (e.g., "open editor" → `/apps/editor`)
   - Route mapping defined in `src/app/terminal/page.tsx:14-18`

### Project Structure

```
src/app/
├── layout.tsx       # Root layout with fonts, metadata, and redirect logic
├── page.tsx         # Root page (redirects to boot)
├── boot/
│   └── page.tsx     # Boot screen with timed transition
├── terminal/
│   └── page.tsx     # Terminal interface with command routing
└── globals.css      # Global styles with dark/light mode support
```

### Key Technical Details

- **Next.js App Router**: Using the App Router architecture with file-based routing
- **Client Components**: All pages use `"use client"` directive as they require client-side interactivity (routing, state, effects)
- **TypeScript**: Strict mode enabled with target ES2017
- **Path Aliases**: `@/*` maps to `./src/*` for imports
- **Fonts**: Uses Geist Sans and Geist Mono via `next/font/google`
- **Styling**: Global CSS with CSS custom properties for theming
- **ESLint**: Configured with `next/core-web-vitals` and `next/typescript` presets

### Navigation Pattern

The codebase uses Next.js's `useRouter` hook for programmatic navigation. When adding new routes:
- Create the route in `src/app/[route-name]/page.tsx`
- Add the command mapping to the `routes` object in `src/app/terminal/page.tsx:14-18`
- Follow the pattern: `"command text": "/route/path"`

### Redirect Approach

Note the dual redirect implementation for the root route:
- Server-side check in layout (`typeof window !== "undefined"`) - may cause hydration issues
- Client-side `useEffect` in page component - more React-idiomatic
- Consider using Next.js `redirect()` from `next/navigation` exclusively for consistency
