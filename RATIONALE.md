# Architecture Rationale

The Daily Whisk uses a feature-oriented React architecture to keep responsibilities clear and prevent route components from becoming overly complex. Route-level behavior lives in `pages/`, while reusable UI primitives and display components live in `components/`. This allows the same building blocks (for example, `Card`, loading/error states, and list items) to be reused across pages without coupling them to routing logic.

Shared state is managed in `contexts/AppContext.tsx` because recipe data and filter selection are consumed by distant parts of the tree (home list, detail route, and add flow). Using Context removes prop drilling and keeps state transitions in one place. Local state still remains local where appropriate: form values and validation errors are held in `ItemForm`, and transient UI concerns stay close to the component that owns them.

Data fetching is split between a service and a custom hook. `services/api.ts` centralizes endpoint access, while `hooks/useFetchItems.ts` encapsulates side-effect behavior (`loading`, `error`, and `data`) and performs cleanup through `AbortController`. This keeps async behavior testable and avoids putting fetch details directly in page components.

Routing follows a nested structure with a shared `Layout` at the root and child routes for list, detail, and add pages. The detail page uses `useParams` and resolves the recipe from shared context state. Invalid IDs return a clear error message instead of crashing.

Composition is demonstrated via the `Card` component, which uses `children` to wrap arbitrary content. This pattern avoids prop-heavy wrappers and keeps a consistent visual shell for different pages.

Validation logic is isolated in `utils/validation.ts` so the form remains focused on control flow and rendering. The result is a small app that demonstrates React fundamentals, advanced hooks/routing patterns, and clean separation of concerns.