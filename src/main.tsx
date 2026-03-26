import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { ConversationsProvider } from './contexts/ConversationsContext';
import { router } from './router';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <ConversationsProvider>
                <RouterProvider router={router} />
            </ConversationsProvider>
        </AuthProvider>
    </StrictMode>
);
