# John Apas Portfolio

A space-themed personal portfolio website built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4

## Getting Started

```bash
npm install
npm run dev
```

## Customizing Content

All portfolio content is managed through data files:

- `src/data/interface.ts` — TypeScript interfaces for all sections
- `src/data/hero.ts` — hero screen text, CTAs, and optional image
- `src/data/aboutMe.ts` — about section text, photo, and education
- `src/data/profile.ts` — personal details, education, and skills
- `src/data/experience.ts` — experience section title, labels, and entries

Edit these files to update your portfolio without touching component code.

## Project Structure

```
src/
├── components/
│   ├── common/       # Reusable UI components
│   ├── layout/       # Navbar, Footer, Layout
│   └── sections/     # Page sections (Hero, About, etc.)
├── data/             # Global content data + interfaces
├── hooks/            # Custom React hooks
└── utils/            # Utility functions
```

## Build

```bash
npm run build
npm run preview
```
