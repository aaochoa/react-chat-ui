import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useConversations } from '../../contexts/ConversationsContext';
import './ConversationsSidebar.css';

export const ConversationsSidebar: React.FC = () => {
    const { conversations, isLoading, error } = useConversations();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="sidebar-loading">
                <div className="shimmer-list">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="shimmer-item">
                            <div className="shimmer-avatar"></div>
                            <div className="shimmer-text">
                                <div className="shimmer-line"></div>
                                <div className="shimmer-line short"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="conversations-sidebar-content">
            <header className="sidebar-header">
                <h2>Chats</h2>
                <button className="new-chat-btn">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </header>

            {error && (
                <div className="sidebar-error-toast">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
            <div className="sidebar-search">
                <div className="search-input-wrapper">
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>
            <div className="conversations-list">
                {conversations.length === 0 ? (
                    <div className="empty-sidebar">No conversations yet</div>
                ) : (
                    conversations.map((conversation, index) => (
                        <div
                            key={conversation.id}
                            className={`conversation-item ${id === String(conversation.id) ? 'active' : ''}`}
                            onClick={() => navigate(`/conversations/${conversation.id}`)}
                            style={{ '--index': index } as React.CSSProperties}
                        >
                            <div className="conversation-avatar">
                                {conversation.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="conversation-info">
                                <div className="conversation-top">
                                    <span className="conversation-name">{conversation.name}</span>
                                    <span className="conversation-time">
                                        {conversation.lastMessage 
                                            ? new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                            : ''
                                        }
                                    </span>
                                </div>
                                <div className="conversation-bottom">
                                    <p className="conversation-preview">
                                        {conversation.lastMessage?.content || 'No messages yet'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
