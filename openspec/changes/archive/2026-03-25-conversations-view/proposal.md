## Why

Users need a central place to view and manage their chat conversations. A WhatsApp Web-like interface provides a familiar and intuitive experience for navigating between different chats, making the application more user-friendly and efficient.

## What Changes

- Add a new "Conversations" view mimicking the WhatsApp Web layout (sidebar for conversation list, main area for active chat).
- Load all user conversations into the sidebar.
- Display an empty state image/graphic in the main area when no specific conversation is selected or if the user has no conversations.

## Capabilities

### New Capabilities
- `conversations-list`: Display and manage the list of conversations.
- `empty-conversation-state`: Display a placeholder image when no conversation is active.

### Modified Capabilities

## Impact

- Frontend application routing to include the new Conversations view.
- Main layout adjustments to support the two-pane (sidebar + main) design.
- Integration with the backend API to fetch the user's conversations.
