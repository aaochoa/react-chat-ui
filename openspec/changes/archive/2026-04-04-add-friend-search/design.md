## Context

The app currently has conversations but no social graph. The Ruby Chat API already provides all required endpoints: `GET /api/v1/users/search?query=`, `GET /api/v1/friendships`, `POST /api/v1/friendships`, `POST /api/v1/friendships/:id/acceptance`, and `DELETE /api/v1/friendships/:id`. The frontend just needs to expose these capabilities.

## Goals / Non-Goals

**Goals:**
- Let users search for other users by name or email
- Let users send, accept, reject, and remove friendships
- Show pending incoming/outgoing requests and the accepted friends list

**Non-Goals:**
- Real-time friend request notifications (no WebSocket subscription for this feature)
- Friend suggestions or recommendations
- Blocking users

## Decisions

**1. Dedicated FriendsPage with tabbed layout**
The friends feature is distinct from conversations. A dedicated route (`/friends`) with tabs (Search, Friends, Requests) keeps the surface clean and avoids cluttering the conversations sidebar.
Alternative: inline a friend picker inside conversations — rejected because it conflates two distinct concerns.

**2. Zustand store for friends state**
A `friendsStore` manages `friends`, `pendingIncoming`, `pendingOutgoing`, and `searchResults`. This matches the existing pattern (`conversationsContext`) and keeps API calls out of components.
Alternative: React Query or local state — rejected to stay consistent with the project's Zustand-only state pattern.

**3. Separate `friendships.ts` service**
All friendship and user-search API calls live in `src/services/friendships.ts`, mirroring the existing `conversations.ts`. This keeps the shared API client central.

**4. Search is query-param driven, not debounced via a store action**
The search input fires a service call on submit (or on a short debounce), writing results into the store. We do not implement real-time keystroke search to avoid hammering the API.

## Risks / Trade-offs

- **Stale search results** → User may send a request to someone who is now a friend (race condition). Mitigation: re-fetch friendships list on mount and after each action; the API returns 422 for duplicate requests.
- **No optimistic updates** → Actions (send/accept/remove) trigger a full re-fetch. This is simpler and correct; latency is acceptable for this MVP scope.
- **Friendship ID not returned by search results** → To remove or accept a friendship, we need the friendship `id`. The `GET /api/v1/friendships` endpoint returns user objects, not friendship records with IDs. If the API doesn't return friendship IDs in the list response, we may need to store them at request-send time.
  - Mitigation: Check the actual response shape at implementation time; if IDs are missing, track outgoing friendships in the store using the response from `POST /api/v1/friendships`.
