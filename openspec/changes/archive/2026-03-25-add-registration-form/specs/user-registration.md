# User Registration

## Description
New users should be able to create an account by providing an email address and a password. This capability handles the UI form, input validation, and communication with the backend registration API.

## Requirements

### Form Fields
- **Email**: Must be a valid email format. Required.
- **Password**: Minimum 6 characters. Required.
- **Password Confirmation**: Must exactly match the Password field. Required.

### API endpoint
- **URL**: `POST /api/v1/auth/register`
- **Body**: `{ email, password, password_confirmation }`

### Success Scenario
- Status: `201 Created`
- Action: Store the returned JWT token, update the `AuthContext` user state, and redirect to the dashboard (`/`).

### Error Scenarios
- **Conflict (409)**: "Email already taken". Show inline error.
- **Unprocessable Entity (422)**: Validation errors (e.g., "Password too short"). Show specific field errors.
- **Generic Error**: "An error occurred. Please try again later."
