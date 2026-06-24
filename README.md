# The Daily Whisk

The Daily Whisk is a React + TypeScript recipe browser built for architecture and patterns review.

## Tech Stack
- Vite + React + TypeScript
- React Router
- Context API + custom hooks
- Vitest + React Testing Library

## Routes
- `/` Home/List page
- `/items/:id` Detail page with URL parameter
- `/add` Controlled add-recipe form
- `*` Not found page

## Key Features
- Feature-oriented architecture (`components`, `pages`, `contexts`, `hooks`, `services`, `types`, `utils`)
- Shared app state with Context (`recipes`, `filter`, `addRecipe`)
- Custom data-fetching hook with loading/success/error states and cleanup (`AbortController`)
- Reusable composition component using `children` (`Card`)
- Controlled form with typed validation and visible inline errors
- Graceful invalid route handling in detail page

## Getting Started
```bash
npm install
npm run dev
```

## Testing
```bash
npm run test
```

## Build
```bash
npm run build
```

## Project Structure
```txt
src/
  components/
  contexts/
  hooks/
  pages/
  services/
  test/
  types/
  utils/
```

See [RATIONALE.md](RATIONALE.md) for architecture decisions.
