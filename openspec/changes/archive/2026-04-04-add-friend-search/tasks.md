## 1. Types and Service Layer

- [x] 1.1 Add `FriendUser`, `Friendship`, and `FriendshipStatus` types to `src/types/models.ts`
- [x] 1.2 Create `src/services/friendships.ts` with `searchUsers(query)`, `getFriendships()`, `sendFriendRequest(friendId)`, `acceptFriendRequest(friendshipId)`, `deleteFriendship(friendshipId)`

## 2. State Management

- [x] 2.1 Create `src/state/friendsStore.ts` with state for `friends`, `incomingRequests`, `outgoingRequests`, `searchResults`, `searchQuery`, `loading`, and `error`
- [x] 2.2 Add actions: `searchUsers`, `loadFriendships`, `sendRequest`, `acceptRequest`, `rejectRequest`, `cancelRequest`

## 3. Friend Search Components

- [x] 3.1 Create `src/components/Friends/FriendSearchInput.tsx` — search input with submit handler
- [x] 3.2 Create `src/components/Friends/FriendSearchResult.tsx` — single result row with "Add Friend" / "Pending" button
- [x] 3.3 Create `src/components/Friends/FriendSearchList.tsx` — renders list of `FriendSearchResult` items, handles empty state

## 4. Friend Management Components

- [x] 4.1 Create `src/components/Friends/FriendListItem.tsx` — shows a friend's name/email with a "Remove" button
- [x] 4.2 Create `src/components/Friends/FriendsList.tsx` — renders `FriendListItem` list, handles empty state
- [x] 4.3 Create `src/components/Friends/PendingRequestItem.tsx` — shows a pending request with Accept/Reject (incoming) or Cancel (outgoing) actions
- [x] 4.4 Create `src/components/Friends/PendingRequestsList.tsx` — renders incoming and outgoing request sections

## 5. Page and Routing

- [x] 5.1 Create `src/pages/FriendsPage.tsx` — tabbed layout with Search, Friends, and Requests tabs
- [x] 5.2 Add `/friends` route to `src/router.tsx` (protected, authenticated users only)
- [x] 5.3 Add a "Friends" navigation link in the app layout/sidebar

## 6. Tests

<!-- Skipped: Vitest and React Testing Library are not installed in this project -->
- [ ] 6.1 Write tests for `src/services/friendships.ts` in `spec/services/friendships.test.ts`
- [ ] 6.2 Write tests for `src/state/friendsStore.ts` in `spec/state/friendsStore.test.ts`
- [ ] 6.3 Write component tests for `FriendSearchList` in `spec/components/Friends/FriendSearchList.test.tsx`
- [ ] 6.4 Write component tests for `FriendsList` in `spec/components/Friends/FriendsList.test.tsx`
- [ ] 6.5 Write component tests for `PendingRequestsList` in `spec/components/Friends/PendingRequestsList.test.tsx`
