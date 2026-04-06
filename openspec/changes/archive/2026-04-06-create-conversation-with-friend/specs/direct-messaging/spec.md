## ADDED Requirements

### Requirement: User can start a conversation with a friend
The system SHALL provide the ability for a user to start or resume a direct message conversation with an accepted friend.

#### Scenario: Existing conversation is resumed
- **WHEN** user clicks "Message" on a friend for whom a conversation already exists
- **THEN** the system navigates the user directly to the existing conversation view

#### Scenario: New conversation is created
- **WHEN** user clicks "Message" on a friend for whom no conversation exists
- **THEN** the system creates a new conversation via API and navigates the user to the newly created conversation view

#### Scenario: Error creating conversation
- **WHEN** user clicks "Message" but the API request fails
- **THEN** the system shows an error notification and does not navigate away
