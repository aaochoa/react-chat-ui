# friend-management Specification

## Purpose
TBD - created by archiving change add-friend-search. Update Purpose after archive.
## Requirements
### Requirement: User can view their friends list
The system SHALL display a list of accepted friends by calling `GET /api/v1/friendships`. Each friend SHALL show their name and email.

#### Scenario: Friends list loads
- **WHEN** user navigates to the Friends page
- **THEN** the system fetches and renders the accepted friends list

#### Scenario: No friends yet
- **WHEN** the friends list is empty
- **THEN** the system displays an empty state with a prompt to search for friends

### Requirement: User can remove a friend
The system SHALL allow a user to remove an existing friend via `DELETE /api/v1/friendships/:id`, which removes the friendship for both parties.

#### Scenario: Remove friend
- **WHEN** user clicks "Remove" on a friend entry and confirms
- **THEN** the system calls `DELETE /api/v1/friendships/:id` and removes the entry from the list

### Requirement: User can view and accept incoming friend requests
The system SHALL display incoming pending friend requests and allow the user to accept them via `POST /api/v1/friendships/:id/acceptance`.

#### Scenario: Accept friend request
- **WHEN** user clicks "Accept" on a pending incoming request
- **THEN** the system calls `POST /api/v1/friendships/:id/acceptance` and moves the user to the friends list

#### Scenario: Reject friend request
- **WHEN** user clicks "Reject" on a pending incoming request
- **THEN** the system calls `DELETE /api/v1/friendships/:id` and removes the request from the pending list

### Requirement: User can view outgoing pending requests
The system SHALL display a list of friend requests the current user has sent that have not yet been accepted.

#### Scenario: Outgoing requests visible
- **WHEN** user views the Requests tab
- **THEN** the system shows both incoming and outgoing pending requests in separate sections

#### Scenario: Cancel outgoing request
- **WHEN** user clicks "Cancel" on an outgoing pending request
- **THEN** the system calls `DELETE /api/v1/friendships/:id` and removes the entry from the outgoing list

