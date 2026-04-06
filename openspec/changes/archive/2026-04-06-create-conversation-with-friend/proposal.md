## Why

Users currently can add friends and search for them, but they need a way to actually start interacting with them. Adding the ability to start conversations with friends from the UI bridges the gap between social discovery and communication.

## What Changes

- Add a UI element (e.g., a "Message" button or an option in a menu) on the friend list or friend profile to start a conversation.
- Integrate with the existing conversation creation API (or create one if it doesn't exist) to initialize a direct message thread.
- Navigate the user to the newly created (or existing, if one is already open) conversation view upon clicking the action.

## Capabilities

### New Capabilities
- `direct-messaging`: Ability to create and initiate direct message conversations with existing friends.

### Modified Capabilities
- `friend-management`: The friend list will be updated to include actions to start conversations.

## Impact

- **UI Components:** Updates to the friend list items or friend profile views to include the "Start Conversation" action.
- **Routing:** Navigational logic to transition from the friend list into the active chat view.
- **State Management:** Logic to optimistically create or load a conversation thread.
