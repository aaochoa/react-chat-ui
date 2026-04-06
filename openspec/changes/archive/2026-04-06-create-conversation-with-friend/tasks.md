## 1. API Integration

- [x] 1.1 Implement conversation creation API call (`POST /api/v1/conversations` or equivalent) that accepts a friend's user ID.
- [x] 1.2 Implement error handling for conversation creation.

## 2. UI Updates

- [x] 2.1 Add a "Message" button to the friend list item component.
- [x] 2.2 Wire the "Message" button to the conversation creation API.
- [x] 2.3 Implement navigation to route the user to `/conversations/:id` upon successful creation or retrieval.
- [x] 2.4 Display a toast error notification and remain on the current page if API call fails.

## 3. Verification

- [x] 3.1 Verify from the UI that a valid conversation is created/retrieved when "Message" is clicked.
- [x] 3.2 Verify proper redirection to the conversation view.
- [x] 3.3 Verify error states are properly handled and shown as toast notifications.
