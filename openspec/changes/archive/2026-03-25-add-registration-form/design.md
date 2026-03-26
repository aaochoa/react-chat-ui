## Context

The `chat-ui` application currently implements user authentication via a `Login` component and an `AuthContext`. However, it lacks the ability for new users to register. The backend API (`chat-api`) already provides a `POST /api/v1/auth/register` endpoint which accepts `email`, `password`, and `password_confirmation`.

## Goals / Non-Goals

**Goals:**
- Create a `Register` component that mirrors the structure and styling of the `Login` component.
- Update `AuthContext` to include a `register` function that interacts with the backend registration API.
- Ensure successful registration automatically logs the user in and redirects them to the main application area.
- Add a new route `/register` and link it from the login page.

**Non-Goals:**
- Modifying the backend API or schema.
- Implementing social login or other advanced authentication methods.

## Decisions

- **Sync Registration with Login Styling**: Using similar CSS and layout for both forms to maintain design consistency.
- **Form Handlers**: Each form field will be managed using React state, similar to the `Login` component pattern.
- **Context Extension**: Adding the `register` method to `AuthContext` allows other components (like potentially a multi-step signup) to easily access registration logic.
- **Route Handling**: The `/register` route will be added to the main router in `App.tsx`, and a navigation link will be added to the login form footer.

## Risks / Trade-offs

- **Code Duplication**: There might be some visual logic duplication between `Login.tsx` and `Register.tsx`. However, keeping them as separate components allows for distinct future evolutions (e.g., adding profile details to registration without affecting login).
- **Error Handling**: Form validation errors from the API need to be clearly communicated to the user. I'll pass through the backend error messages to the UI.
