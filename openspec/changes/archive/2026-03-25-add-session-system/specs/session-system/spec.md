## ADDED Requirements

### Requirement: User Authentication
The system SHALL provide a login interface for users to authenticate using their email and password.

#### Scenario: Successful Login
- **WHEN** the user submits valid email and password credentials
- **THEN** the system SHALL call the `/api/v1/auth/login` endpoint
- **THEN** the system SHALL store the returned JWT token securely in localStorage
- **THEN** the system SHALL transition to the authenticated application state

#### Scenario: Failed Login
- **WHEN** the user submits invalid credentials
- **THEN** the system SHALL display an "Invalid credentials" error message
- **THEN** the system SHALL NOT transition to the authenticated state

### Requirement: Session Persistence
The system SHALL maintain the user session across browser refreshes using the stored JWT token.

#### Scenario: Page Refresh with Active Session
- **WHEN** the page is reloaded and a valid JWT token exists in localStorage
- **THEN** the system SHALL automatically transition to the authenticated state
- **THEN** the system SHALL verify the token by calling the `/api/v1/auth/profile` endpoint

### Requirement: User Logout
The system SHALL allow users to terminate their current session.

#### Scenario: Manual Logout
- **WHEN** the user clicks the "Logout" button
- **THEN** the system SHALL remove the JWT token from localStorage
- **THEN** the system SHALL transition to the unauthenticated (login) state

### Requirement: Authenticated API Requests
The system SHALL include the JWT token in all subsequent requests to protected API endpoints.

#### Scenario: Fetching Conversations
- **WHEN** a request is made to `/api/v1/conversations`
- **THEN** the system SHALL include the `Authorization: Bearer <token>` header in the request
