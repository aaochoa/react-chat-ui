const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api/v1";

export const getAuthToken = () => localStorage.getItem('chat_token');

export const setAuthToken = (token: string) => localStorage.setItem('chat_token', token);

export const clearAuthToken = () => localStorage.removeItem('chat_token');

// Registered by the Redux store so the API client can trigger a logout
// without creating a circular dependency.
let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void): void => {
    onUnauthorized = handler;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getAuthToken();
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        clearAuthToken();
        onUnauthorized?.();
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'An unknown error occurred' }));
        throw error;
    }

    if (response.status === 204) return null as T;

    return response.json();
}

export const api = {
    get: <T>(path: string, options?: RequestInit) => request<T>(path, { ...options, method: 'GET' }),
    post: <T>(path: string, body: unknown, options?: RequestInit) =>
        request<T>(path, { ...options, method: 'POST', body: JSON.stringify(body) }),
    put: <T>(path: string, body: unknown, options?: RequestInit) =>
        request<T>(path, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(path: string, options?: RequestInit) => request<T>(path, { ...options, method: 'DELETE' }),
};
