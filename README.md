# Xeno Style Boilerplate

Reusable starter built with Vite + React + TypeScript + Tailwind.

It carries the visual language of the Xeno Evidence & Forensics UI (deep dark base, soft raised panels, one orange accent, Manrope typeface) with all domain logic removed, so it can be the foundation for any new project.

## Stack

- Vite
- React 19
- TypeScript
- Tailwind CSS 3
- Framer Motion
- Lucide React
- Manrope Variable (`@fontsource-variable/manrope`, bundled, no CDN)
- ESLint

## Quick Start

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Validate code quality: `npm run lint`
4. Build for production: `npm run build`

## Project Structure

src/
- components/ui/
  - Badge.tsx
  - Button.tsx (primary / ghost / danger, sm / md, loading)
  - Card.tsx
  - Field.tsx (Field, Input, Select, Textarea, Check)
  - Meter.tsx
  - SectionHeader.tsx
  - Tabs.tsx
- styles/
  - tokens.ts
- App.tsx (showcase page, replace with your own app)
- main.tsx
- index.css

## Customization Guide

- Color tokens: `src/styles/tokens.ts` and `tailwind.config.js`
- Base page styling, typography and focus rings: `src/index.css`
- Typeface: `fontFamily.sans` in `tailwind.config.js`

## Notes

- Domain-agnostic: no tablet apps, no mock data, no business logic.
- Scrollbars are hidden globally and `prefers-reduced-motion` is respected.
