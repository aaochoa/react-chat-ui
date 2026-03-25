import React from 'react';
import './EmptyConversationState.css';

export const EmptyConversationState: React.FC = () => {
    return (
        <div className="empty-conversation-state">
            <div className="empty-content">
                <img 
                    src="/empty-state.png" 
                    alt="No conversation selected" 
                    className="empty-image"
                />
                <h2>Select a conversation</h2>
                <p>Choose a friend from the list to start chatting or see your previous messages.</p>
                <button className="start-chat-btn">
                    Start a new chat
                </button>
            </div>
        </div>
    );
};
