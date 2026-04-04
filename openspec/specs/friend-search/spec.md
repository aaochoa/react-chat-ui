# friend-search Specification

## Purpose
TBD - created by archiving change add-friend-search. Update Purpose after archive.
## Requirements
### Requirement: User can search for other users
The system SHALL allow an authenticated user to search for other users by name or email using a text query. Search results SHALL exclude the current user and users who are already friends with the current user.

#### Scenario: Search returns results
- **WHEN** user enters a non-empty query and submits the search
- **THEN** the system calls `GET /api/v1/users/search?query=<value>` and displays the matching users

#### Scenario: Search with empty query
- **WHEN** user submits an empty query
- **THEN** the system does not make an API call and shows no results

#### Scenario: No matches found
- **WHEN** user submits a query that matches no users
- **THEN** the system displays an empty state message

### Requirement: User can send a friend request from search results
The system SHALL allow an authenticated user to send a friend request to any user shown in the search results by clicking an "Add Friend" button.

#### Scenario: Successful friend request
- **WHEN** user clicks "Add Friend" on a search result
- **THEN** the system calls `POST /api/v1/friendships` with body `{ friendship: { friend_id: <id> } }` and the button changes to a "Pending" disabled state

#### Scenario: Duplicate friend request
- **WHEN** the API returns a 422 error for an already-pending request
- **THEN** the system shows an inline error message on that result row

