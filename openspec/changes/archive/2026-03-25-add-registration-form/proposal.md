## Why

A registration system is essential for any chat platform to allow new users to join and create their own accounts. While the API already supports user registration, the UI is currently limited to a login page, preventing new users from signing up directly through the application.

## What Changes

1. **New Registration Component**: A `Register` UI component with a form including `email`, `password`, and `password_confirmation`.
2. **AuthContext Update**: Addition of a `register` method in `AuthContext` to handle the registration API call.
3. **Routing Integration**: Updating `App.tsx` routes to include `/register`.
4. **Navigation Flow**: Linking the `Login` page to the `Register` page for easy access.

## Capabilities

### New Capabilities
- `user-registration`: Comprehensive user registration flow including UI, form handling, validation, and API integration.

### Modified Capabilities
- `session-management`: Update session handling to support immediate login after successful registration.

## Impact

- **UI Components**: New `Register.tsx` and `Register.css`, modifications to `Login.tsx` and `App.tsx`.
- **Contexts**: Update to `AuthContext.tsx`.
- **Services**: `api.ts` remains unchanged as it already supports generic POST requests, but will be used for the new endpoint.
