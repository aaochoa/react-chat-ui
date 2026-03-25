## Why

Integrated session management (login/logout) is required to identify users using the Chat UI and provide a personalized experience. This is the first step towards enabling users to view and manage their own chat history via the existing Rails chat API.

## What Changes

- Add a Login component allowing users to authenticate with email and password.
- Store the returned JWT token securely (e.g., in `localStorage`) for session persistence.
- Implement a global authentication state (authenticated/unauthenticated) using React context or state.
- Add a Logout capability that clears the local session.
- Intercept and update all API calls to include the Bearer token in the `Authorization` header.
- Create a Profile/User summary area in the UI to display the current logged-in user.

## Capabilities

### New Capabilities
- `session-system`: Authenticating users, storing JWT tokens, and managing session lifecycle (login, persistence, logout) with the Rails chat API.

### Modified Capabilities
- (none)

## Impact

- Frontend: Redesigning `src/App.tsx` to handle routing between login and main chat screens.
- API interaction: Updating API communication to use the JWT.
- Local storage: Session persistence between page reloads.
- Potential new dependency: `jwt-decode` (optional, for token inspection).
