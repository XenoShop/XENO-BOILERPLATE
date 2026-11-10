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
- components/
  - Shell.tsx (app shell: sidebar, header, view switching)
  - ui/ Badge, Button, Card, Field (Input, Select, Textarea, Check), Meter, Panel (ViewHeader, Panel, Stat), SectionHeader, Tabs, AccentPicker
- views/ Overview, Components, Forms, Settings (example pages, replace with your own)
- styles/
  - themes.ts (accent presets, persisted in localStorage)
  - preferences.ts (interface scale, reduced motion)
  - tokens.ts
- hooks/useAccent.ts
- App.tsx, main.tsx, index.css

## Accent colors

The accent is a set of CSS variables (`--ui-accent`, `--ui-accent-bright`, `--ui-accent-deep`, `--ui-accent-ink`) mapped to the Tailwind colors `ui-accent`, `ui-accentBright`, `ui-accentDeep` and `ui-accentInk`.
Use them anywhere (`bg-ui-accent/10`, `text-ui-accent`, `from-ui-accentBright`) and the whole UI follows the selected color.

- Switch at runtime with the swatches in the header, `<AccentPicker />`, or `setAccent('blue')`.
- Add or change presets in `src/styles/themes.ts` (`ACCENTS`). The default is the first entry.

## Customization Guide

- Neutral palette and fonts: `tailwind.config.js` and `src/index.css`
- Typeface: `fontFamily.sans` in `tailwind.config.js`

## Notes

- Domain-agnostic: no tablet apps, no mock data, no business logic.
- Scrollbars are hidden globally and `prefers-reduced-motion` is respected.
