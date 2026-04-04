# Ruby Chat UI

React 19 + TypeScript chat interface for the Ruby Chat API.

## Tech Stack

- **Framework**: React 19 with React Router 7
- **Language**: TypeScript (Strict Mode)
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS
- **State Management**: Zustand 5
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library

## Code Style

Follow the **Airbnb TypeScript Style Guide**:

- **Indentation**: 4 spaces (no tabs)
- **Quotes**: Double quotes (`"`) always
- **Semicolons**: Required
- **Trailing commas**: Always in multi-line structures
- **Spacing**: 2 blank lines between top-level definitions, 1 between methods
- **Variables**: `const` over `let`, never `var`
- **Arrow functions**: Always parenthesize parameters: `(arg) => { ... }`

## TypeScript

- No `any` types — use `unknown` with type narrowing if needed
- `"strict": true` compliance is mandatory
- Define a `Props` interface for every component
- Always annotate function/method return types
- Named exports for components, hooks, and utilities; `default export` only for page-level components in `src/pages/`

## Project Structure

```
src/
  components/   # Domain-based folders (Common/, Layout/, Conversation/)
  hooks/        # Custom hooks (use* prefix), exported from index.ts
  pages/        # Route-level components with Page suffix (e.g. LoginPage.tsx)
  services/api/ # Axios API calls using the shared client in client.ts
  state/        # Zustand stores (e.g. authStore.ts)
  types/        # Type definitions (models.ts, api.ts)
  utils/        # Pure helper functions
spec/           # Tests mirroring src/ structure (e.g. spec/components/Common/Button.test.tsx)
```

### Naming

- **Components/Pages**: `PascalCase`
- **Hooks/Services/Utils**: `camelCase`
- **Tests**: `[file].test.tsx` or `[file].test.ts`

## React Patterns

- Functional components with hooks only — no class components
- Extract reusable logic into custom hooks
- Use `React.memo`, `useMemo`, `useCallback` to optimize; avoid over-memoizing
- Use semantic HTML and ARIA labels for accessibility
- Early returns for complex conditions; ternaries for simple inline rendering

## State & API

- **Zustand**: Domain-separated stores; use selectors to prevent unnecessary re-renders; use `persist` middleware for reload-surviving state
- **Axios**: Always use the shared client at `src/services/api/client.ts`; define request/response types for every API function
- **Errors**: Transform API errors into meaningful app errors; always handle loading and error states in UI

## Testing

- All logic, components, and hooks must have tests in `spec/`
- Use Vitest for assertions, React Testing Library for components
- Mock API calls with `vi.mock()` — no real network requests in tests

## Development Commands

```bash
# Run all checks before submitting code
npm run lint && npm run format:check && npm run type-check && npm run test

npm run lint          # ESLint
npm run format        # Prettier (write)
npm run format:check  # Prettier (check only)
npm run type-check    # TypeScript
npm run test          # Vitest
npm run test:watch    # Vitest watch mode
```
