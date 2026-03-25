import React from 'react';
import { Outlet } from 'react-router-dom';
import './ConversationsLayout.css';

interface ConversationsLayoutProps {
    sidebar: React.ReactNode;
}

export const ConversationsLayout: React.FC<ConversationsLayoutProps> = ({ sidebar }) => {
    return (
        <div className="conversations-layout">
            <aside className="conversations-sidebar">
                {sidebar}
            </aside>
            <main className="conversations-content">
                <Outlet />
            </main>
        </div>
    );
};
