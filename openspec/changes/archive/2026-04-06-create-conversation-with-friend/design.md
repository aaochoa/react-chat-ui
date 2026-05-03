## Context

Users can add friends but there is no direct channel from the friend view to opening a conversation. The current react-chat-ui allows viewing friends but needs an actionable "Message" step. We need to implement a mutation that bridges social interactions (friends) with communications (conversations). Since the Ruby Chat API handles the backend, we likely need to check if a conversation exists or create a new one between the current user and the friend.

## Goals / Non-Goals

**Goals:**
- Provide a "Message" button for each friend in the friend list/profile.
- Seamlessly transition from social list view to a direct message view.
- Ensure only one direct message conversation exists per pair of friends (or just reuse existing logic if backend handles it).

**Non-Goals:**
- Adding group messaging features.
- Changing how messages themselves are sent or displayed.
- Modifying offline sync behavior for new conversations.

## Decisions

- **UI Placement:** The "Start Conversation" / "Message" button will be placed on the individual friend card in the friend list, as well as on their detailed profile. This promotes discoverability.
- **API Integration:** We will use a POST request to the conversations endpoint (assuming standard REST or GraphQL) with the friend's user ID to construct/fetch a direct conversation.
- **Routing:** After successfully receiving a conversation ID from the backend, the app router will be instructed to navigate to `/conversations/:id` (or the equivalent chat route in the app).
- **Graceful Handling:** If the conversation creation fails, we'll display a toast notification indicating the issue and remain on the same page. 

## Risks / Trade-offs

- **Risk:** Existing conversations are duplicated if the creation API isn't idempotent.
  → **Mitigation:** Rely on backend constraints. If necessary, check if a conversation with this friend already exists on the frontend, but ideally, the API endpoint `POST /conversations` with `{ recipient_id: <id> }` returns the existing one if it exists.
- **Risk:** Navigation happens before the web socket is ready for the new conversation room.
  → **Mitigation:** Ensure the conversation component handles "connecting" states gracefully when mounted.
