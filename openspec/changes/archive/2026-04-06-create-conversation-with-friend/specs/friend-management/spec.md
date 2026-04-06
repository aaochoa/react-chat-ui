## MODIFIED Requirements

### Requirement: User can view their friends list
The system SHALL display a list of accepted friends by calling `GET /api/v1/friendships`. Each friend SHALL show their name, email, and actions to interact with them (e.g. "Message").

#### Scenario: Friends list loads
- **WHEN** user navigates to the Friends page
- **THEN** the system fetches and renders the accepted friends list along with a "Message" action for each friend

#### Scenario: No friends yet
- **WHEN** the friends list is empty
- **THEN** the system displays an empty state with a prompt to search for friends
