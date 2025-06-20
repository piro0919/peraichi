# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build production**: `npm run build` (followed by `npm run postbuild` for sitemap generation)
- **Type checking**: `npm run type-check` or `npx tsc --noEmit`
- **Linting**: `npm run lint` (ESLint with auto-fix: `npm run lint:fix`)
- **Style linting**: `npm run lint:style` (StyleLint with auto-fix)
- **Secret scanning**: `npm run secretlint` (or `npm run lint:secret` with masking)
- **Code formatting**: `npm run prettier`
- **Pre-commit checks**: `npm run lefthook` (runs all checks in parallel)

## Project Architecture

This is a Next.js 15 application using the App Router with TypeScript and React 19. The project emphasizes strict code quality with comprehensive linting, formatting, and security checks.

### Key Structure
- **App Router**: Located in `src/app/` with layout.tsx and page.tsx
- **Components**: Organized in `src/app/_components/` with Pascal case directory names
- **Styling**: Uses CSS modules with strict linting via StyleLint
- **Fonts**: Uses Noto Sans JP from Google Fonts for Japanese text support

### Import Path Configuration
- `@/*` maps to `./src/*` for clean imports

## Code Quality Standards

### ESLint Configuration
- Strict TypeScript rules with explicit return types required
- CSS modules integration with unused class detection
- Import sorting via perfectionist plugin (natural alphabetical order)
- Filename validation (camel, kebab, or pascal case)
- Security and promise handling rules enabled
- React-specific rules including exhaustive deps for hooks

### StyleLint Configuration
- CSS modules support with global scope restrictions
- Alphabetical property ordering
- Performance animation checks
- Unused selector detection
- Modern CSS function notation required

### Git Hooks (Lefthook)
Pre-commit automatically runs:
- ESLint with auto-fix on TypeScript files
- Prettier formatting on all files
- StyleLint with auto-fix on CSS files
- TypeScript compilation check
- Secret scanning

### Commit Standards
- Uses conventional commits with lowercase subjects
- Enforced via commitlint with custom rules

## TypeScript Configuration
- Target: ES2017 with strict mode enabled
- CSS modules support built-in
- Uses Next.js plugin for enhanced development experience