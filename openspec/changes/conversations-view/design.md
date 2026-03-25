## Context

The application currently lacks a unified view to see all ongoing conversations. To improve the user experience, we are introducing a WhatsApp Web-like interface. This will consist of a two-pane layout: a sidebar containing the list of all user conversations, and a main area displaying the active chat or an empty state if no chat is selected.

## Goals / Non-Goals

**Goals:**
- Implement a two-pane layout.
- Fetch and display the user's conversations in the sidebar.
- Show an empty state image when no conversation is actively selected.
- Ensure the layout is responsive (e.g., hiding the sidebar on small screens when a chat is open).

**Non-Goals:**
- Implementing individual chat messaging features (assuming these exist or are handled separately).
- Complex group chat management features in this initial view.

## Decisions

- **Layout Structure**: We will use a main flex container with two children: a `Sidebar` and a `ChatArea`. This is standard for such layouts and easy to make responsive.
- **State Management**: The currently selected conversation ID will be stored in the URL (e.g., `/conversations/:id`). This enables deep linking and standard browser navigation.

## Risks / Trade-offs

- **Risk**: Performance issues if the user has hundreds of conversations.
  - **Mitigation**: Implement virtualization or pagination for the conversations list in the sidebar if needed.
