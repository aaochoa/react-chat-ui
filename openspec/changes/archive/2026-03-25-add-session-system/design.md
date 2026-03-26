## Context

The Chat UI is a Vite-based React application that currently lacks authentication. The backend is a Rails API with Devise-JWT already implemented. We need to integrate the session lifecycle on the frontend.

## Goals / Non-Goals

**Goals:**
- Implement a secure login/logout flow.
- Persist the authentication token across refreshes.
- Ensure all API calls are authenticated.
- Provide a clear UI state for unauthenticated users.

**Non-Goals:**
- Social logins (Google, GitHub, etc.) at this stage.
- Password reset flow (to be handled in a separate change).
- Multi-factor authentication.

## Decisions

### 1. State Management: React Context + API Service
- **Decision:** Use a `AuthContext` to manage the authenticated user and token globally. Use a dedicated `api.ts` service with an interceptor or wrapper for `fetch`.
- **Rationale:** Context provides a simple way to access auth state anywhere. A central API service ensures consistent header management.
- **Alternatives:** Redux (too heavy for just auth), singleton service only (harder to trigger UI updates).

### 2. Token Storage: localStorage
- **Decision:** Store the JWT in `localStorage`.
- **Rationale:** Easy to implement and persists across refreshes. Given it's a chat app, the risk of XSS is mitigated by standard sanitization, and `localStorage` is standard for SPAs.
- **Alternatives:** Cookies (requires backend configuration for CSRF/Samesite, which might be complex for this initial step).

### 3. Routing: Conditional Rendering
- **Decision:** Use conditional rendering in `App.tsx` to switch between a `Login` screen and the `MainChat` screen.
- **Rationale:** Simplest approach before adding `react-router`.
- **Alternatives:** `react-router` (can be added later if needed, but for now conditional rendering is sufficient).

## Risks / Trade-offs

- **Risk**: Token expiration
- **Mitigation**: If an API call returns 401, clear the token and redirect to login.

- **Risk**: XSS stealing tokens from localStorage
- **Mitigation**: Ensure all user-generated content in messages is properly sanitized by React.
