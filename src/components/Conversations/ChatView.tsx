import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import "./ChatView.css";

export const ChatView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const conversations = useAppSelector((state) => state.conversations.conversations);
    const conversation = conversations.find((c) => String(c.id) === id);

    if (!conversation) {
        return (
            <div className="chat-view-error">
                <p>Conversation not found.</p>
            </div>
        );
    }

    return (
        <div className="chat-view">
            <header className="chat-header">
                <div className="chat-header-info">
                    <div className="avatar">
                        {conversation.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="details">
                        <span className="name">{conversation.name}</span>
                        <span className="status">online</span>
                    </div>
                </div>
            </header>
            
            <div className="chat-messages">
                <div className="message incoming">
                    <p>Welcome to the chat! This is a placeholder for your messages.</p>
                    <span className="time">10:00 AM</span>
                </div>
                {conversation.lastMessage && (
                    <div className="message outgoing">
                        <p>{conversation.lastMessage.content}</p>
                        <span className="time">
                            {new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                )}
            </div>

            <footer className="chat-input-area">
                <input type="text" placeholder="Type a message..." />
                <button className="send-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                </button>
            </footer>
        </div>
    );
};
