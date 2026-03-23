# Xeno Style Boilerplate

Reusable starter built with Vite + React + TypeScript + Tailwind.

This project keeps the visual style language from your existing UI (colors, glow, glass panels, dark base), but removes all tablet/domain logic so you can use it in any new project.

## Stack

- Vite
- React 19
- TypeScript
- Tailwind CSS 3
- Framer Motion
- Lucide React
- ESLint

## Quick Start

1. Install dependencies:

   npm install

2. Start development server:

   npm run dev

3. Validate code quality:

   npm run lint

4. Build for production:

   npm run build

## Project Structure

src/
- components/ui/
  - Button.tsx
  - Card.tsx
  - SectionHeader.tsx
- styles/
  - tokens.ts
- App.tsx
- main.tsx
- index.css

## Customization Guide

- Color token list: src/styles/tokens.ts
- Tailwind theme tokens: tailwind.config.js
- Base page styling and gradients: src/index.css
- Showcase page you can replace with your own app: src/App.tsx

## Notes

- Boilerplate is intentionally clean and domain-agnostic.
- No tablet apps, no mock tablet data, no specific business logic.
- Ready to be copied and used as a foundation for new products.
