## Why

Users have no way to find or connect with other users in the app. Adding friend search and friend request management enables the social graph that conversations rely on.

## What Changes

- Add a user search UI that lets users search by name/email and see results excluding existing friends
- Add the ability to send a friend request from a search result
- Add a friends list view showing accepted friends
- Add a pending requests view to accept or reject incoming friend requests

## Capabilities

### New Capabilities

- `friend-search`: Search for users by query and send friend requests from results
- `friend-management`: View friends list and manage pending incoming/outgoing requests (accept, reject, remove)

### Modified Capabilities

- None

## Impact

- New service file: `src/services/friendships.ts` (calls `/api/v1/users/search`, `/api/v1/friendships`, `/api/v1/friendships/:id/acceptance`)
- New components under `src/components/Friends/`
- New page: `src/pages/FriendsPage.tsx`
- New route in `src/router.tsx`
- New Zustand store: `src/state/friendsStore.ts`
- New types in `src/types/models.ts`
