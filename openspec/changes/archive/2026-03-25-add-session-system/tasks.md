## 1. API Service and Authentication Context

- [x] 1.1 Create `src/services/api.ts` to handle fetch requests with Bearer tokens.
- [x] 1.2 Implement `AuthContext` and `AuthProvider` in `src/contexts/AuthContext.tsx`.
- [x] 1.3 Add logic to `AuthContext` to load token from `localStorage` on initialization.

## 2. UI Components for Authentication

- [x] 2.1 Create a `Login` component with email and password fields.
- [x] 2.2 Add basic styling to the `Login` component.
- [x] 2.3 Integrate `Login` into `src/App.tsx` using conditional rendering based on auth state.

## 3. Session Management Features

- [x] 3.1 Implement a login function in `AuthContext` that calls `/api/v1/auth/login` and stores the JWT.
- [x] 3.2 Implement a logout function that clears the auth state and `localStorage`.
- [x] 3.3 Add a User Profile header with a Logout button to the main interface.

## 4. Verification and Polish

- [x] 4.1 Verify session persistence by refreshing the browser with a stored token.
- [x] 4.2 Verify that all outgoing API calls include the `Authorization: Bearer <token>` header.
- [x] 4.3 Add error message display for invalid credentials during login.
